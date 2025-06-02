"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { randomBytes } from "crypto";

/**
 * Obtener todas las API Keys
 */
export async function getApiKeys() {
  try {
    // Verificar autenticación
    const session = await auth();
    if (!session) {
      return {
        errors: { _form: ["No autorizado"] },
        success: false,
      };
    }

    const apiKeys = await prisma.apiKey.findMany({
      where: {
        active: true,
      },
      select: {
        id: true,
        name: true,
        key: true,
        created_at: true,
        last_used_at: true,
        app_user: {
          select: {
            id: true,
            name: true,
            company_name: true,
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });

    return {
      data: apiKeys,
      success: true,
    };
  } catch (error) {
    console.error("Error al obtener API Keys:", error);
    return {
      errors: { _form: ["Error al obtener las API Keys"] },
      success: false,
    };
  }
}

/**
 * Generar una nueva API Key
 */
export async function generateApiKey() {
  // Generar una clave aleatoria con formato ak_xxxx
  const randomString = randomBytes(24).toString('hex');
  return `ak_${randomString}`;
}

/**
 * Crear una nueva API Key
 */
export async function createApiKey(data: { name: string }) {
  try {
    // Verificar autenticación
    const session = await auth();
    if (!session || !session.user?.id) {
      return {
        errors: { _form: ["No autorizado"] },
        success: false,
      };
    }

    // Generar una nueva clave API
    const apiKey = await generateApiKey();

    // Crear la API Key en la base de datos
    const newApiKey = await prisma.apiKey.create({
      data: {
        name: data.name,
        key: apiKey,
        app_user_id: session.user.id,
        active: true,
      },
      select: {
        id: true,
        name: true,
        key: true,
        created_at: true,
        app_user: {
          select: {
            id: true,
            name: true,
            company_name: true,
          },
        },
      },
    });

    return {
      data: newApiKey,
      success: true,
    };
  } catch (error) {
    console.error("Error al crear API Key:", error);
    return {
      errors: { _form: ["Error al crear la API Key"] },
      success: false,
    };
  }
}

/**
 * Actualizar una API Key existente
 */
export async function updateApiKey(id: string, data: { name: string }) {
  try {
    // Verificar autenticación
    const session = await auth();
    if (!session || !session.user?.id) {
      return {
        errors: { _form: ["No autorizado"] },
        success: false,
      };
    }

    // Verificar que la API Key pertenezca al usuario actual
    const existingApiKey = await prisma.apiKey.findFirst({
      where: {
        id,
        app_user_id: session.user.id,
      },
    });

    if (!existingApiKey) {
      return {
        errors: { _form: ["API Key no encontrada o no autorizada"] },
        success: false,
      };
    }

    // Actualizar la API Key
    const updatedApiKey = await prisma.apiKey.update({
      where: { id },
      data: {
        name: data.name,
      },
      select: {
        id: true,
        name: true,
        key: true,
        created_at: true,
        last_used_at: true,
        app_user: {
          select: {
            id: true,
            name: true,
            company_name: true,
          },
        },
      },
    });

    return {
      data: updatedApiKey,
      success: true,
    };
  } catch (error) {
    console.error("Error al actualizar API Key:", error);
    return {
      errors: { _form: ["Error al actualizar la API Key"] },
      success: false,
    };
  }
}

/**
 * Desactivar (eliminar lógicamente) una API Key
 */
export async function deactivateApiKey(id: string) {
  try {
    // Verificar autenticación
    const session = await auth();
    if (!session || !session.user?.id) {
      return {
        errors: { _form: ["No autorizado"] },
        success: false,
      };
    }

    // Verificar que la API Key pertenezca al usuario actual
    const existingApiKey = await prisma.apiKey.findFirst({
      where: {
        id,
        app_user_id: session.user.id,
      },
    });

    if (!existingApiKey) {
      return {
        errors: { _form: ["API Key no encontrada o no autorizada"] },
        success: false,
      };
    }

    // Desactivar la API Key (eliminación lógica)
    await prisma.apiKey.update({
      where: { id },
      data: {
        active: false,
      },
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error al desactivar API Key:", error);
    return {
      errors: { _form: ["Error al desactivar la API Key"] },
      success: false,
    };
  }
}

/**
 * Regenerar una API Key existente
 * Esto crea una nueva clave pero mantiene el mismo registro y todas sus asociaciones
 */
export async function regenerateApiKey(id: string) {
  try {
    // Verificar autenticación
    const session = await auth();
    if (!session || !session.user?.id) {
      return {
        errors: { _form: ["No autorizado"] },
        success: false,
      };
    }

    // Verificar que la API Key pertenezca al usuario actual
    const existingApiKey = await prisma.apiKey.findFirst({
      where: {
        id,
        app_user_id: session.user.id,
        active: true,
      },
    });

    if (!existingApiKey) {
      return {
        errors: { _form: ["API Key no encontrada o no autorizada"] },
        success: false,
      };
    }

    // Generar una nueva clave API
    const newApiKey = await generateApiKey();

    // Actualizar la API Key con la nueva clave
    const updatedApiKey = await prisma.apiKey.update({
      where: { id },
      data: {
        key: newApiKey,
      },
      select: {
        id: true,
        name: true,
        key: true,
        created_at: true,
        last_used_at: true,
        app_user: {
          select: {
            id: true,
            name: true,
            company_name: true,
          },
        },
      },
    });

    return {
      data: updatedApiKey,
      success: true,
    };
  } catch (error) {
    console.error("Error al regenerar API Key:", error);
    return {
      errors: { _form: ["Error al regenerar la API Key"] },
      success: false,
    };
  }
}
