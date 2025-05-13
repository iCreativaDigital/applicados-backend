"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { randomBytes } from "crypto";

// Esquema de validación para el login
const loginSchema = z.object({
  emailOrUsername: z.string().min(1, "Email o nombre de usuario es requerido"),
  password: z.string().min(1, "Contraseña es requerida"),
  api_key: z.string().min(32, "API Key inválida") // La API Key del cliente
});

// Función para generar tokens JWT
function generateTokens(userId: string, apiKeyId: string) {
  // Obtener la clave secreta desde las variables de entorno
  const jwtSecret = process.env.JWT_SECRET || "default_jwt_secret_key";
  
  // Crear payload para el token
  const payload = {
    sub: userId,
    api_key_id: apiKeyId,
    type: "access_token"
  };
  
  // Generar token de acceso (válido por 1 hora)
  const token = jwt.sign(payload, jwtSecret, { expiresIn: "1h" });
  
  // Generar refresh token (válido por 7 días)
  const refreshPayload = {
    sub: userId,
    api_key_id: apiKeyId,
    type: "refresh_token",
    jti: randomBytes(16).toString("hex") // ID único para el token
  };
  
  const refreshToken = jwt.sign(refreshPayload, jwtSecret, { expiresIn: "7d" });
  
  return { token, refreshToken };
}

// Función para autenticar un usuario
export async function loginUser(data: {
  emailOrUsername: string;
  password: string;
  api_key: string;
  ip_address?: string;
  user_agent?: string;
}) {
  try {
    // Validar los datos con Zod
    const validatedData = loginSchema.safeParse(data);
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

    // Buscar usuario por email o username dentro del contexto de esta API Key
    const user = await prisma.user.findFirst({
      where: {
        api_key_id: apiKey.id,
        OR: [
          { email: data.emailOrUsername },
          { username: data.emailOrUsername }
        ]
      }
    });

    if (!user) {
      // Registrar intento fallido de login
      await prisma.authLog.create({
        data: {
          event_type: "LOGIN",
          status: "FAILURE",
          ip_address: data.ip_address || "0.0.0.0",
          user_agent: data.user_agent || "Unknown",
          details: JSON.stringify({
            reason: "Usuario no encontrado",
            emailOrUsername: data.emailOrUsername,
            api_key_id: apiKey.id
          })
        }
      });
      
      return {
        success: false,
        error: "Credenciales inválidas",
      };
    }

    // Verificar si el usuario está activo
    if (!user.active) {
      // Registrar intento fallido de login
      await prisma.authLog.create({
        data: {
          user_id: user.id,
          event_type: "LOGIN",
          status: "FAILURE",
          ip_address: data.ip_address || "0.0.0.0",
          user_agent: data.user_agent || "Unknown",
          details: JSON.stringify({
            reason: "Usuario inactivo",
            api_key_id: apiKey.id
          })
        }
      });
      
      return {
        success: false,
        error: "Usuario inactivo",
      };
    }

    // Verificar la contraseña
    const passwordMatch = await bcrypt.compare(data.password, user.password_hash);
    if (!passwordMatch) {
      // Registrar intento fallido de login
      await prisma.authLog.create({
        data: {
          user_id: user.id,
          event_type: "LOGIN",
          status: "FAILURE",
          ip_address: data.ip_address || "0.0.0.0",
          user_agent: data.user_agent || "Unknown",
          details: JSON.stringify({
            reason: "Contraseña incorrecta",
            api_key_id: apiKey.id
          })
        }
      });
      
      return {
        success: false,
        error: "Credenciales inválidas",
      };
    }

    // Generar tokens JWT
    const { token, refreshToken } = generateTokens(user.id, apiKey.id);

    // Calcular fechas de expiración
    const tokenExpires = new Date();
    tokenExpires.setHours(tokenExpires.getHours() + 1); // 1 hora

    const refreshExpires = new Date();
    refreshExpires.setDate(refreshExpires.getDate() + 7); // 7 días

    // Crear sesión en la base de datos
    const session = await prisma.session.create({
      data: {
        user_id: user.id,
        token: token,
        refresh_token: refreshToken,
        ip_address: data.ip_address || "0.0.0.0",
        user_agent: data.user_agent || "Unknown",
        expires_at: refreshExpires
      }
    });

    // Registrar login exitoso
    await prisma.authLog.create({
      data: {
        user_id: user.id,
        event_type: "LOGIN",
        status: "SUCCESS",
        ip_address: data.ip_address || "0.0.0.0",
        user_agent: data.user_agent || "Unknown",
        details: JSON.stringify({
          session_id: session.id,
          api_key_id: apiKey.id
        })
      }
    });

    // Actualizar la fecha de último uso de la API Key
    await prisma.apiKey.update({
      where: { id: apiKey.id },
      data: { last_used_at: new Date() }
    });

    // Devolver tokens y datos básicos del usuario
    return {
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name
      },
      token,
      refreshToken,
      expiresIn: 3600, // 1 hora en segundos
      tokenType: "Bearer"
    };
  } catch (error) {
    console.error("Error al autenticar usuario:", error);
    return {
      success: false,
      error: "Error al autenticar el usuario"
    };
  }
}
