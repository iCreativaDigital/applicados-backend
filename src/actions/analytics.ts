"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

/**
 * Obtiene estadísticas generales del sistema
 */
export async function getSystemStats() {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return { success: false, error: "No autorizado" };
    }
    
    // Total de API Keys
    const apiKeysCount = await prisma.apiKey.count({
      where: {
        app_user_id: session.user.id,
      },
    });
    
    // Total de usuarios
    const usersCount = await prisma.user.count({
      where: {
        api_key: {
          app_user_id: session.user.id,
        },
      },
    });
    
    // Total de sesiones activas
    const activeSessionsCount = await prisma.session.count({
      where: {
        revoked: false,
        expires_at: {
          gt: new Date(),
        },
        user: {
          api_key: {
            app_user_id: session.user.id,
          },
        },
      },
    });
    
    // Total de eventos de autenticación
    const authEventsCount = await prisma.authEvent.count({
      where: {
        app_user_id: session.user.id,
      },
    });
    
    return {
      success: true,
      data: {
        apiKeysCount,
        usersCount,
        activeSessionsCount,
        authEventsCount,
      },
    };
  } catch (error) {
    console.error("Error al obtener estadísticas del sistema:", error);
    return { success: false, error: "Error al obtener estadísticas del sistema" };
  }
}

/**
 * Obtiene los eventos de autenticación recientes
 */
export async function getRecentAuthEvents(limit = 10) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return { success: false, error: "No autorizado" };
    }
    
    const events = await prisma.authEvent.findMany({
      where: {
        app_user_id: session.user.id,
      },
      orderBy: {
        created_at: "desc",
      },
      take: limit,
    });
    
    return { success: true, data: events };
  } catch (error) {
    console.error("Error al obtener eventos recientes:", error);
    return { success: false, error: "Error al obtener eventos recientes" };
  }
}

/**
 * Obtiene datos para el gráfico de eventos por tipo
 */
export async function getAuthEventsByType() {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return { success: false, error: "No autorizado" };
    }
    
    // Obtener todos los eventos agrupados por tipo
    const events = await prisma.authEvent.groupBy({
      by: ["event_type"],
      where: {
        app_user_id: session.user.id,
      },
      _count: {
        id: true,
      },
    });
    
    // Formatear los datos para el gráfico
    const data = events.map(event => ({
      name: event.event_type,
      value: event._count.id,
    }));
    
    return { success: true, data };
  } catch (error) {
    console.error("Error al obtener eventos por tipo:", error);
    return { success: false, error: "Error al obtener eventos por tipo" };
  }
}

/**
 * Obtiene datos para el gráfico de eventos por día (últimos 7 días)
 */
export async function getAuthEventsByDay() {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return { success: false, error: "No autorizado" };
    }
    
    // Calcular fecha de hace 7 días
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    // Obtener todos los API Keys del usuario
    const apiKeys = await prisma.apiKey.findMany({
      where: {
        app_user_id: session.user.id,
      },
      select: {
        id: true,
      },
    });
    
    const apiKeyIds = apiKeys.map(key => key.id);
    
    // 1. Obtener eventos de autenticación (authEvent) de los últimos 7 días
    const authEvents = await prisma.authEvent.findMany({
      where: {
        app_user_id: session.user.id,
        created_at: {
          gte: sevenDaysAgo,
        },
      },
      select: {
        created_at: true,
        event_type: true,
      },
    });
    
    // 2. Obtener logs de autenticación (authLog) de los últimos 7 días
    const authLogs = await prisma.authLog.findMany({
      where: {
        user: {
          api_key_id: {
            in: apiKeyIds,
          },
        },
        created_at: {
          gte: sevenDaysAgo,
        },
      },
      select: {
        created_at: true,
        event_type: true,
      },
    });
    
    // Combinar ambos conjuntos de datos
    const allEvents = [...authEvents, ...authLogs];
    
    // Agrupar eventos por día
    const eventsByDay = allEvents.reduce((acc, event) => {
      const date = event.created_at.toISOString().split('T')[0];
      
      if (!acc[date]) {
        acc[date] = {};
      }
      
      if (!acc[date][event.event_type]) {
        acc[date][event.event_type] = 0;
      }
      
      acc[date][event.event_type]++;
      
      return acc;
    }, {} as Record<string, Record<string, number>>);
    
    // Crear array de los últimos 7 días
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    }).reverse();
    
    // Formatear datos para la tabla
    const data = last7Days.map(date => {
      const dayData = eventsByDay[date] || {};
      
      return {
        date,
        LOGIN: dayData.LOGIN || 0,
        LOGOUT: dayData.LOGOUT || 0,
        REGISTER: dayData.REGISTER || 0,
        PASSWORD_RESET: dayData.PASSWORD_RESET || 0,
        TOKEN_REFRESH: dayData.TOKEN_REFRESH || 0,
        EMAIL_VERIFICATION: dayData.EMAIL_VERIFICATION || 0,
        ACCOUNT_LOCK: dayData.ACCOUNT_LOCK || 0,
        ACCOUNT_UNLOCK: dayData.ACCOUNT_UNLOCK || 0,
      };
    });
    
    return { success: true, data };
  } catch (error) {
    console.error("Error al obtener eventos por día:", error);
    return { success: false, error: "Error al obtener eventos por día" };
  }
}

/**
 * Obtiene las sesiones activas
 */
export async function getActiveSessions() {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return { success: false, error: "No autorizado" };
    }
    
    const activeSessions = await prisma.session.findMany({
      where: {
        revoked: false,
        expires_at: {
          gt: new Date(),
        },
        user: {
          api_key: {
            app_user_id: session.user.id,
          },
        },
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
      take: 50,
    });
    
    return { success: true, data: activeSessions };
  } catch (error) {
    console.error("Error al obtener sesiones activas:", error);
    return { success: false, error: "Error al obtener sesiones activas" };
  }
}

/**
 * Obtiene estadísticas de usuarios por API Key
 */
export async function getUserStatsByApiKey() {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return { success: false, error: "No autorizado" };
    }
    
    const apiKeys = await prisma.apiKey.findMany({
      where: {
        app_user_id: session.user.id,
      },
      select: {
        id: true,
        name: true,
        _count: {
          select: {
            users: true,
          },
        },
      },
    });
    
    // Formatear datos para el gráfico
    const data = apiKeys.map(apiKey => ({
      name: apiKey.name,
      value: apiKey._count.users,
    }));
    
    return { success: true, data };
  } catch (error) {
    console.error("Error al obtener estadísticas de usuarios:", error);
    return { success: false, error: "Error al obtener estadísticas de usuarios" };
  }
}

/**
 * Obtiene los logs de autenticación de los usuarios creados con la API del cliente
 */
export async function getAuthLogs(limit = 50) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return { success: false, error: "No autorizado" };
    }
    
    // Obtener todos los usuarios asociados a las API Keys del cliente
    const apiKeys = await prisma.apiKey.findMany({
      where: {
        app_user_id: session.user.id,
      },
      select: {
        id: true,
      },
    });
    
    const apiKeyIds = apiKeys.map(key => key.id);
    
    // Obtener los logs de autenticación de esos usuarios
    const logs = await prisma.authLog.findMany({
      where: {
        user: {
          api_key_id: {
            in: apiKeyIds,
          },
        },
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
      take: limit,
    });
    
    return { success: true, data: logs };
  } catch (error) {
    console.error("Error al obtener logs de autenticación:", error);
    return { success: false, error: "Error al obtener logs de autenticación" };
  }
}
