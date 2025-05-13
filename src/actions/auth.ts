"use server";

import { prisma } from "@/lib/prisma";
import { signIn, signOut } from "@/auth";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";

// Esquema de validación para el registro
const signupSchema = z.object({
  username: z.string().min(3, "El nombre de usuario debe tener al menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
  name: z.string().optional(),
  company_name: z.string().optional(),
  phone: z.string().optional(),
});

// Función para registrar un nuevo usuario
export async function signup(formData: FormData) {
  try {
    // Extraer y validar los datos del formulario
    const rawData = {
      username: formData.get("username") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      name: formData.get("name") as string || undefined,
      company_name: formData.get("company_name") as string || undefined,
      phone: formData.get("phone") as string || undefined,
    };

    // Validar los datos con Zod
    const validatedData = signupSchema.safeParse(rawData);
    if (!validatedData.success) {
      return {
        error: validatedData.error.errors[0].message,
        success: false,
      };
    }

    const data = validatedData.data;

    // Verificar si el email ya existe
    const existingUserByEmail = await prisma.appUser.findUnique({
      where: { email: data.email },
    });

    if (existingUserByEmail) {
      return {
        error: "El email ya está registrado",
        success: false,
      };
    }

    // Verificar si el username ya existe
    const existingUserByUsername = await prisma.appUser.findUnique({
      where: { username: data.username },
    });

    if (existingUserByUsername) {
      return {
        error: "El nombre de usuario ya está en uso",
        success: false,
      };
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Crear el usuario
    const user = await prisma.appUser.create({
      data: {
        username: data.username,
        email: data.email,
        password_hash: hashedPassword,
        name: data.name,
        company_name: data.company_name,
        phone: data.phone,
      },
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error en el registro:", error);
    return {
      error: "Error al registrar el usuario",
      success: false,
    };
  }
}

// Función para iniciar sesión
export async function login(emailOrUsername: string, password: string) {
  try {
    const result = await signIn("credentials", {
      email: emailOrUsername,
      password: password,
      redirect: false,
    });

    if (result?.error) {
      return {
        error: "Credenciales inválidas",
        success: false,
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error en el login:", error);
    return {
      error: "Error al iniciar sesión",
      success: false,
    };
  }
}

// Función para cerrar sesión
export async function logout() {
  await signOut({ redirectTo: "/auth/login" });
}

// Función para generar una API Key para un usuario
export async function generateApiKey(userId: string, name: string) {
  try {
    // Verificar si el usuario existe
    const user = await prisma.appUser.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return {
        error: "Usuario no encontrado",
        success: false,
      };
    }

    // Generar una API Key única
    const apiKey = uuidv4();

    // Guardar la API Key en la base de datos
    const createdApiKey = await prisma.apiKey.create({
      data: {
        app_user_id: userId,
        key: apiKey,
        name: name,
        active: true,
      },
    });

    return {
      success: true,
      apiKey: apiKey,
      id: createdApiKey.id,
    };
  } catch (error) {
    console.error("Error al generar API Key:", error);
    return {
      error: "Error al generar la API Key",
      success: false,
    };
  }
}

// Función para obtener las API Keys de un usuario
export async function getUserApiKeys(userId: string) {
  try {
    const apiKeys = await prisma.apiKey.findMany({
      where: { app_user_id: userId },
      orderBy: { created_at: "desc" },
    });

    return {
      success: true,
      apiKeys,
    };
  } catch (error) {
    console.error("Error al obtener API Keys:", error);
    return {
      error: "Error al obtener las API Keys",
      success: false,
      apiKeys: [],
    };
  }
}

// Función para desactivar una API Key
export async function deactivateApiKey(apiKeyId: string, userId: string) {
  try {
    // Verificar que la API Key pertenezca al usuario
    const apiKey = await prisma.apiKey.findFirst({
      where: {
        id: apiKeyId,
        app_user_id: userId,
      },
    });

    if (!apiKey) {
      return {
        error: "API Key no encontrada o no pertenece al usuario",
        success: false,
      };
    }

    // Desactivar la API Key
    await prisma.apiKey.update({
      where: { id: apiKeyId },
      data: { active: false },
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error al desactivar API Key:", error);
    return {
      error: "Error al desactivar la API Key",
      success: false,
    };
  }
}

// Función para solicitar restablecimiento de contraseña
export async function forgotPassword(email: string) {
  try {
    // Verificar si el usuario existe
    const user = await prisma.appUser.findUnique({
      where: { email },
    });

    // Aunque el usuario no exista, no lo revelamos por seguridad
    if (!user) {
      return {
        success: true,
        message: "Si tu email está registrado, recibirás instrucciones para restablecer tu contraseña.",
      };
    }

    // Generar token único
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');

    // Guardar el token en la base de datos con expiración de 1 hora
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1);

    await prisma.passwordReset.upsert({
      where: { app_user_id: user.id },
      update: {
        token: resetTokenHash,
        expires_at: expiresAt,
        used: false,
      },
      create: {
        app_user_id: user.id,
        token: resetTokenHash,
        expires_at: expiresAt,
      },
    });

    // Registrar el evento de solicitud de restablecimiento
    await prisma.authEvent.create({
      data: {
        app_user_id: user.id,
        event_type: 'PASSWORD_RESET_REQUESTED',
        ip_address: '0.0.0.0', // En un entorno real, se obtendría la IP del cliente
        user_agent: 'Unknown', // En un entorno real, se obtendría el User-Agent
      },
    });

    // En un entorno real, aquí se enviaría un email con el enlace de restablecimiento
    // que incluiría el token: /auth/reset-password?token=${resetToken}
    console.log(`Reset token for ${email}: ${resetToken}`);

    return {
      success: true,
      message: "Si tu email está registrado, recibirás instrucciones para restablecer tu contraseña.",
    };
  } catch (error) {
    console.error("Error al solicitar restablecimiento de contraseña:", error);
    return {
      error: "Error al procesar la solicitud. Por favor, inténtalo de nuevo más tarde.",
      success: false,
    };
  }
}

// Función para restablecer la contraseña
export async function resetPassword(token: string, newPassword: string) {
  try {
    // Convertir el token a hash para compararlo con el almacenado
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

    // Buscar el token en la base de datos
    const passwordReset = await prisma.passwordReset.findFirst({
      where: {
        token: tokenHash,
        used: false,
        expires_at: {
          gt: new Date(),
        },
      },
      include: {
        app_user: true,
      },
    });

    if (!passwordReset) {
      return {
        error: "El enlace de restablecimiento es inválido o ha expirado.",
        success: false,
      };
    }

    // Hashear la nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Actualizar la contraseña del usuario
    await prisma.appUser.update({
      where: { id: passwordReset.app_user_id },
      data: { password_hash: hashedPassword },
    });

    // Marcar el token como usado
    await prisma.passwordReset.update({
      where: { id: passwordReset.id },
      data: { used: true },
    });

    // Registrar el evento de restablecimiento exitoso
    await prisma.authEvent.create({
      data: {
        app_user_id: passwordReset.app_user_id,
        event_type: 'PASSWORD_RESET_COMPLETED',
        ip_address: '0.0.0.0', // En un entorno real, se obtendría la IP del cliente
        user_agent: 'Unknown', // En un entorno real, se obtendría el User-Agent
      },
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error al restablecer la contraseña:", error);
    return {
      error: "Error al restablecer la contraseña. Por favor, inténtalo de nuevo más tarde.",
      success: false,
    };
  }
}
