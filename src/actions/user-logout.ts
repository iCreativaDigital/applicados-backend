"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { cookies } from "next/headers";

// Esquema de validación para el logout
const logoutSchema = z.object({
  api_key: z.string().min(1, "API Key es requerida"),
  token: z.string().optional(),
  ip_address: z.string().optional(),
  user_agent: z.string().optional(),
});

/**
 * Función para cerrar sesión de un usuario
 * Cierra la sesión asociada al token JWT o refresh token proporcionado
 */
export async function logoutUser(data: {
  api_key: string;
  token?: string;
  ip_address?: string;
  user_agent?: string;
}) {
  try {
    // Validar los datos con Zod
    const validatedData = logoutSchema.safeParse(data);
    if (!validatedData.success) {
      return { success: false, error: validatedData.error.errors[0].message };
    }

    // Verificar que la API Key sea válida
    const apiKey = await prisma.apiKey.findFirst({
      where: {
        key: data.api_key,
        active: true,
      },
    });

    if (!apiKey) {
      return { success: false, error: "API Key inválida o inactiva" };
    }

    // Actualizar la fecha de último uso de la API Key
    await prisma.apiKey.update({
      where: { id: apiKey.id },
      data: { last_used_at: new Date() },
    });

    // Si se proporciona un token, buscar la sesión asociada
    if (data.token) {
      // Intentar encontrar la sesión por token (podría ser un access token o refresh token)
      const session = await prisma.session.findFirst({
        where: {
          OR: [
            { token: data.token },
            { refresh_token: data.token }
          ]
        },
        include: { user: true },
      });

      if (!session) {
        return { success: false, error: "Sesión no encontrada" };
      }

      // Verificar que la sesión pertenezca a un usuario de esta API Key
      if (session.user.api_key_id !== apiKey.id) {
        return { success: false, error: "Sesión no autorizada para esta API Key" };
      }

      // Invalidar la sesión
      await prisma.session.update({
        where: { id: session.id },
        data: { revoked: true, revoked_at: new Date(), expires_at: new Date() },
      });

      try {
        // Registrar el evento de logout
        await prisma.authEvent.create({
          data: {
            app_user_id: session.user_id,
            event_type: "LOGOUT",
            ip_address: data.ip_address || "0.0.0.0",
            user_agent: data.user_agent || "Unknown",
            additional_info: JSON.stringify({
              session_id: session.id,
              api_key_id: apiKey.id,
            }),
          },
        });
      } catch (error) {
        // Si hay un error al crear el evento, solo lo registramos pero no interrumpimos el logout
        console.error("Error al registrar evento de logout:", error);
        // Continuamos con el proceso de logout a pesar del error
      }

      return { 
        success: true,
        message: "Sesión cerrada correctamente" 
      };
    }

    return { success: false, error: "Se requiere un token para cerrar sesión" };
  } catch (error) {
    console.error("Error en logout:", error);
    return { success: false, error: "Error al procesar el cierre de sesión" };
  }
}
