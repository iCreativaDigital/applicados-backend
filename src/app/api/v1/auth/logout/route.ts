import { NextRequest, NextResponse } from "next/server";
import { logoutUser } from "@/actions/user-logout";

/**
 * Endpoint para cerrar sesión de un usuario
 * POST /api/v1/auth/logout
 */
export async function POST(request: NextRequest) {
  // Verificar que se proporcione una API Key
  const apiKey = request.headers.get("X-API-Key");
  
  if (!apiKey) {
    return NextResponse.json(
      { success: false, error: "API Key requerida" },
      { status: 401 }
    );
  }
  
  // Obtener el token de autorización
  const authHeader = request.headers.get("Authorization");
  let token = "";
  
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.substring(7); // Extraer el token después de "Bearer "
  }
  
  // Obtener los datos del cuerpo de la solicitud
  let body = {};
  try {
    body = await request.json();
  } catch (error) {
    // Si no hay cuerpo JSON o está malformado, usar un objeto vacío
    console.log("No se pudo analizar el cuerpo de la solicitud como JSON, usando objeto vacío");
  }
  
  // Obtener información del cliente
  const ip = request.headers.get("x-forwarded-for") || 
             request.headers.get("x-real-ip") || 
             "0.0.0.0";
  const userAgent = request.headers.get("user-agent") || "Unknown";
  
  // Usar el token del cuerpo de la solicitud o el token de autorización
  const tokenToUse = (body as { token?: string }).token || token;
  
  if (!tokenToUse) {
    return NextResponse.json(
      { success: false, error: "Se requiere un token para cerrar sesión" },
      { status: 400 }
    );
  }
  
  // Llamar a la función de logout con los datos y la API Key
  const result = await logoutUser({
    api_key: apiKey as string,
    token: tokenToUse,
    ip_address: ip,
    user_agent: userAgent
  });
  
  if (!result.success) {
    return NextResponse.json(
      { success: false, error: result.error },
      { status: 400 }
    );
  }
  
  // Devolver respuesta exitosa
  return NextResponse.json({
    success: true,
    message: "Sesión cerrada correctamente",
    timestamp: new Date().toISOString()
  }, { status: 200 });
}
