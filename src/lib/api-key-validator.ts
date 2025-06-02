import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

// Definir el tipo de retorno para la validación de API Key
export type ApiKeyValidationResult = 
  | { valid: false; error: string; status: number; apiKeyRecord?: undefined }
  | { valid: true; error?: undefined; status?: undefined; apiKeyRecord: any };

/**
 * Valida una API Key desde el encabezado de una solicitud
 * @param request La solicitud NextRequest que contiene el encabezado x-api-key
 * @returns Un objeto con el resultado de la validación
 */
export async function validateApiKey(request: NextRequest): Promise<ApiKeyValidationResult> {
  // Obtener la API Key del encabezado
  const apiKey = request.headers.get("x-api-key");
  
  if (!apiKey) {
    return { valid: false, error: "API Key no proporcionada", status: 401 };
  }
  
  // Verificar si la API Key existe y está activa
  const apiKeyRecord = await prisma.apiKey.findFirst({
    where: {
      key: apiKey,
      active: true,
    },
    include: {
      app_user: {
        select: {
          id: true,
          name: true,
          company_name: true,
        },
      },
    },
  });
  
  if (!apiKeyRecord) {
    return { valid: false, error: "API Key inválida o inactiva", status: 401 };
  }
  
  // Actualizar la fecha de último uso
  await prisma.apiKey.update({
    where: { id: apiKeyRecord.id },
    data: { last_used_at: new Date() },
  });
  
  return { valid: true, apiKeyRecord };
}

/**
 * Verifica simplemente la presencia de una API Key
 * @param apiKey La API Key a validar
 * @returns true si la API Key está presente, false en caso contrario
 */
export async function validateApiKeyPresence(apiKey: string | null): Promise<boolean> {
  return !!apiKey;
}

/**
 * Obtiene la API Key del encabezado de una solicitud
 * @param request La solicitud NextRequest
 * @returns La API Key o null si no está presente
 */
export function getApiKeyFromRequest(request: NextRequest): string | null {
  // Intentar obtener la API Key de diferentes variantes de encabezado
  return request.headers.get("x-api-key") || 
         request.headers.get("X-API-Key") || 
         null;
}
