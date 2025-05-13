"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { randomBytes } from "crypto";
import { request } from "http";

// Esquema de validación para el registro de usuarios
const registerSchema = z.object({
  username: z.string().min(3, "El nombre de usuario debe tener al menos 3 caracteres"),
  email: z.string().email("El email no es válido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
  name: z.string().optional(),
  company_name: z.string().optional(),
  phone: z.string().optional(),
  website: z.string().url('URL inválida').optional().nullable().or(z.literal('')),
  api_key: z.string().min(32, "API Key inválida") // La API Key del cliente que está registrando al usuario
});

// Función para registrar un usuario a través de la API
export async function registerUser(data: {
  username: string;
  email: string;
  password: string;
  name?: string;
  company_name?: string;
  phone?: string;
  website?: string;
  api_key: string; // API Key del cliente
  ip_address?: string;
  user_agent?: string;
}) {
  try {
    // Validar los datos con Zod
    const validatedData = registerSchema.safeParse(data);
    if (!validatedData.success) {
      return {
        success: false,
        error: validatedData.error.errors[0].message,
      };
    }

    // Verificar que la API Key sea válida
    const apiKey = await prisma.apiKey.findUnique({
      where: { key: data.api_key },
      include: { app_user: true }
    });

    if (!apiKey || !apiKey.active) {
      return {
        success: false,
        error: "API Key inválida o inactiva",
      };
    }

    // Verificar si el email ya está en uso para esta API Key
    // Nota: El email debe ser único por API Key, como se define en el modelo de Prisma con @@unique([email, api_key_id])
    const existingUserByEmail = await prisma.user.findFirst({
      where: {
        email: data.email,
        api_key_id: apiKey.id
      }
    });

    if (existingUserByEmail) {
      return {
        success: false,
        error: "El email ya está registrado para esta API",
      };
    }

    // Verificar si el username ya está en uso para esta API Key
    // Nota: El username debe ser único por API Key, como se define en el modelo de Prisma con @@unique([username, api_key_id])
    // Esto permite que diferentes empresas (API Keys) puedan tener usuarios con el mismo nombre de usuario
    const existingUserByUsername = await prisma.user.findFirst({
      where: {
        username: data.username,
        api_key_id: apiKey.id
      }
    });

    if (existingUserByUsername) {
      return {
        success: false,
        error: "El nombre de usuario ya está en uso para esta API",
      };
    }

    // Generar hash de la contraseña
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Generar token de verificación de email
    const verificationToken = randomBytes(32).toString('hex');
    const tokenExpiration = new Date();
    tokenExpiration.setHours(tokenExpiration.getHours() + 24); // Token válido por 24 horas

    // Crear el usuario
    const newUser = await prisma.user.create({
      data: {
        api_key_id: apiKey.id,
        ip_address: data.ip_address,
        user_agent: data.user_agent,
        email: data.email,
        username: data.username,
        password_hash: hashedPassword,
        name: data.name,
        active: true,
        email_verified: false // El email aún no está verificado
      }
    });

    // Crear token de verificación
    await prisma.emailVerification.create({
      data: {
        email: data.email,
        token: verificationToken,
        expires_at: tokenExpiration
      }
    });

    // Registrar el evento de autenticación
    await prisma.authLog.create({
      data: {
        user_id: newUser.id,
        event_type: "REGISTER",
        status: "SUCCESS",
        ip_address: data.ip_address,
        user_agent: data.user_agent,
        details: JSON.stringify({
          api_key_id: apiKey.id,
          app_user_id: apiKey.app_user_id
        })
      }
    });

    // Actualizar la fecha de último uso de la API Key
    await prisma.apiKey.update({
      where: { id: apiKey.id },
      data: { last_used_at: new Date() }
    });

    // En un entorno real, aquí se enviaría un email con el token de verificación
    // sendVerificationEmail(data.email, verificationToken);

    return {
      success: true,
      message: "Usuario registrado correctamente. Se ha enviado un email de verificación.",
      user_id: newUser.id,
      verification_token: verificationToken // En producción, no se devolvería este token
    };
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    return {
      success: false,
      error: "Error al registrar el usuario"
    };
  }
}
