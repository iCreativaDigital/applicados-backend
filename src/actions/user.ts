"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { revalidatePath } from "next/cache";

// Esquema de validación para actualizar el perfil
const updateProfileSchema = z.object({
  name: z.string().optional(),
  company_name: z.string().optional(),
  phone: z.string().optional(),
  website: z.string().url("La URL de la página web no es válida").optional(),
});

// Función para actualizar el perfil del usuario
export async function updateUserProfile(userId: string, data: {
  name?: string;
  company_name?: string;
  phone?: string;
  website?: string;
}) {
  try {
    // Validar los datos con Zod
    const validatedData = updateProfileSchema.safeParse(data);
    if (!validatedData.success) {
      return {
        error: validatedData.error.errors[0].message,
        success: false,
      };
    }

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

    // Ya no verificamos el username porque no se puede cambiar

    // Actualizar el usuario
    await prisma.appUser.update({
      where: { id: userId },
      data: {
        name: data.name,
        company_name: data.company_name,
        phone: data.phone,
        website: data.website,
      },
    });

    // Registrar el evento
    await prisma.authEvent.create({
      data: {
        app_user_id: userId,
        event_type: "PROFILE_UPDATED",
        ip_address: "0.0.0.0", // En un entorno real, se obtendría la IP del cliente
        user_agent: "Unknown", // En un entorno real, se obtendría el User-Agent
      },
    });

    // Revalidar la página del dashboard para mostrar los cambios
    revalidatePath("/dashboard");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error al actualizar el perfil:", error);
    return {
      error: "Error al actualizar el perfil",
      success: false,
    };
  }
}

// Función para cambiar la contraseña del usuario
export async function changePassword(userId: string, currentPassword: string, newPassword: string) {
  try {
    // Verificar si el usuario existe
    const user = await prisma.appUser.findUnique({
      where: { id: userId },
    });

    if (!user || !user.password_hash) {
      return {
        error: "Usuario no encontrado",
        success: false,
      };
    }

    // Verificar la contraseña actual
    const passwordMatch = await bcrypt.compare(
      currentPassword,
      user.password_hash
    );

    if (!passwordMatch) {
      return {
        error: "La contraseña actual es incorrecta",
        success: false,
      };
    }

    // Validar la nueva contraseña
    if (newPassword.length < 8) {
      return {
        error: "La nueva contraseña debe tener al menos 8 caracteres",
        success: false,
      };
    }

    // Hashear la nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Actualizar la contraseña
    await prisma.appUser.update({
      where: { id: userId },
      data: {
        password_hash: hashedPassword,
      },
    });

    // Registrar el evento
    await prisma.authEvent.create({
      data: {
        app_user_id: userId,
        event_type: "PASSWORD_CHANGED",
        ip_address: "0.0.0.0", // En un entorno real, se obtendría la IP del cliente
        user_agent: "Unknown", // En un entorno real, se obtendría el User-Agent
      },
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error al cambiar la contraseña:", error);
    return {
      error: "Error al cambiar la contraseña",
      success: false,
    };
  }
}
