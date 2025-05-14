"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

// Esquema de validación para crear usuario
const createUserSchema = z.object({
  api_key_id: z.string().min(1, "API Key ID es requerido"),
  username: z.string().min(3, "Nombre de usuario debe tener al menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "Contraseña debe tener al menos 8 caracteres"),
  name: z.string().optional(),
});

// Esquema de validación para actualizar usuario
const updateUserSchema = z.object({
  id: z.string().min(1, "ID de usuario es requerido"),
  username: z.string().min(3, "Nombre de usuario debe tener al menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  name: z.string().optional(),
  active: z.boolean().default(true),
});

// Esquema de validación para cambiar contraseña
const changePasswordSchema = z.object({
  userId: z.string().min(1, "ID de usuario es requerido"),
  password: z.string().min(8, "Contraseña debe tener al menos 8 caracteres"),
});

/**
 * Obtener usuarios por API Key
 */
export async function getApiKeyUsers(apiKeyId: string) {
  try {
    // Verificar que la API Key exista
    const apiKey = await prisma.apiKey.findUnique({
      where: { id: apiKeyId },
    });

    if (!apiKey) {
      return { success: false, error: "API Key no encontrada" };
    }

    // Obtener usuarios asociados a esta API Key
    const users = await prisma.user.findMany({
      where: { api_key_id: apiKeyId },
      orderBy: { created_at: "desc" },
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
        active: true,
        created_at: true,
        updated_at: true,
        email_verified: true,
      },
    });

    return { success: true, users };
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return { success: false, error: "Error al obtener usuarios" };
  }
}

/**
 * Crear un nuevo usuario
 */
export async function createUser(data: z.infer<typeof createUserSchema>) {
  try {
    // Validar datos
    const validatedData = createUserSchema.parse(data);

    // Verificar que la API Key exista
    const apiKey = await prisma.apiKey.findUnique({
      where: { id: validatedData.api_key_id },
    });

    if (!apiKey) {
      return { success: false, error: "API Key no encontrada" };
    }

    // Verificar que el username sea único para esta API Key
    const existingUsername = await prisma.user.findFirst({
      where: {
        username: validatedData.username,
        api_key_id: validatedData.api_key_id,
      },
    });

    if (existingUsername) {
      return { success: false, error: "El nombre de usuario ya está en uso" };
    }

    // Verificar que el email sea único para esta API Key
    const existingEmail = await prisma.user.findFirst({
      where: {
        email: validatedData.email,
        api_key_id: validatedData.api_key_id,
      },
    });

    if (existingEmail) {
      return { success: false, error: "El email ya está en uso" };
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    // Crear el usuario
    const user = await prisma.user.create({
      data: {
        api_key_id: validatedData.api_key_id,
        username: validatedData.username,
        email: validatedData.email,
        password_hash: hashedPassword,
        name: validatedData.name,
      },
    });

    // Actualizar la fecha de último uso de la API Key
    await prisma.apiKey.update({
      where: { id: validatedData.api_key_id },
      data: { last_used_at: new Date() },
    });

    return { success: true, user: { id: user.id, username: user.username, email: user.email } };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0].message };
    }
    console.error("Error al crear usuario:", error);
    return { success: false, error: "Error al crear el usuario" };
  }
}

/**
 * Actualizar un usuario existente
 */
export async function updateUser(data: z.infer<typeof updateUserSchema>) {
  try {
    // Validar datos
    const validatedData = updateUserSchema.parse(data);

    // Verificar que el usuario exista
    const existingUser = await prisma.user.findUnique({
      where: { id: validatedData.id },
    });

    if (!existingUser) {
      return { success: false, error: "Usuario no encontrado" };
    }

    // Verificar que el username sea único para esta API Key
    const existingUsername = await prisma.user.findFirst({
      where: {
        username: validatedData.username,
        api_key_id: existingUser.api_key_id,
        id: { not: validatedData.id }, // Excluir el usuario actual
      },
    });

    if (existingUsername) {
      return { success: false, error: "El nombre de usuario ya está en uso" };
    }

    // Verificar que el email sea único para esta API Key
    const existingEmail = await prisma.user.findFirst({
      where: {
        email: validatedData.email,
        api_key_id: existingUser.api_key_id,
        id: { not: validatedData.id }, // Excluir el usuario actual
      },
    });

    if (existingEmail) {
      return { success: false, error: "El email ya está en uso" };
    }

    // Actualizar el usuario
    const user = await prisma.user.update({
      where: { id: validatedData.id },
      data: {
        username: validatedData.username,
        email: validatedData.email,
        name: validatedData.name,
        active: validatedData.active,
        updated_at: new Date(),
      },
    });

    return { success: true, user };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0].message };
    }
    console.error("Error al actualizar usuario:", error);
    return { success: false, error: "Error al actualizar el usuario" };
  }
}

/**
 * Cambiar la contraseña de un usuario
 */
export async function changeUserPassword(data: z.infer<typeof changePasswordSchema>) {
  try {
    // Validar datos
    const validatedData = changePasswordSchema.parse(data);

    // Verificar que el usuario exista
    const existingUser = await prisma.user.findUnique({
      where: { id: validatedData.userId },
    });

    if (!existingUser) {
      return { success: false, error: "Usuario no encontrado" };
    }

    // Hashear la nueva contraseña
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    // Actualizar la contraseña
    await prisma.user.update({
      where: { id: validatedData.userId },
      data: {
        password_hash: hashedPassword,
        updated_at: new Date(),
      },
    });

    return { success: true, message: "Contraseña actualizada correctamente" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0].message };
    }
    console.error("Error al cambiar contraseña:", error);
    return { success: false, error: "Error al cambiar la contraseña" };
  }
}

/**
 * Eliminar un usuario
 */
export async function deleteUser(userId: string) {
  try {
    // Verificar que el usuario exista
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return { success: false, error: "Usuario no encontrado" };
    }

    // Eliminar el usuario
    await prisma.user.delete({
      where: { id: userId },
    });

    return { success: true, message: "Usuario eliminado correctamente" };
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    return { success: false, error: "Error al eliminar el usuario" };
  }
}

/**
 * Activar o desactivar un usuario
 */
export async function toggleUserStatus(userId: string, active: boolean) {
  try {
    // Verificar que el usuario exista
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return { success: false, error: "Usuario no encontrado" };
    }

    // Actualizar el estado del usuario
    await prisma.user.update({
      where: { id: userId },
      data: {
        active,
        updated_at: new Date(),
      },
    });

    return { 
      success: true, 
      message: active ? "Usuario activado correctamente" : "Usuario desactivado correctamente" 
    };
  } catch (error) {
    console.error("Error al cambiar estado del usuario:", error);
    return { success: false, error: "Error al cambiar el estado del usuario" };
  }
}
