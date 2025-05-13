import { NextRequest, NextResponse } from "next/server";
import { loginUser } from "@/actions/user-login";

// Función para validar la API Key
async function validateApiKey(apiKey: string | null) {
  if (!apiKey) {
    return false;
  }
  
  // La validación real se hace en la función loginUser
  // Aquí solo verificamos que se haya proporcionado
  return true;
}

// Endpoint para iniciar sesión
export async function POST(request: NextRequest) {
  try {
    // Verificar que se proporcione una API Key
    const apiKey = request.headers.get("X-API-Key");
    
    if (!await validateApiKey(apiKey)) {
      return NextResponse.json(
        { success: false, error: "API Key no proporcionada" },
        { status: 401 }
      );
    }
    
    // Obtener los datos del cuerpo de la solicitud
    const body = await request.json();
    
    // Obtener información del cliente
    const ip = request.headers.get("x-forwarded-for") || 
               request.headers.get("x-real-ip") || 
               "0.0.0.0";
    const userAgent = request.headers.get("user-agent") || "Unknown";
    
    // Llamar a la función de login con los datos y la API Key
    const result = await loginUser({
      ...body,
      api_key: apiKey as string,
      ip_address: ip,
      user_agent: userAgent
    });
    
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 401 }
      );
    }
    
    // Devolver respuesta exitosa
    return NextResponse.json({
      success: true,
      user: result.user,
      token: result.token,
      refresh_token: result.refreshToken,
      expires_in: result.expiresIn,
      token_type: result.tokenType
    }, { status: 200 });
    
  } catch (error) {
    console.error("Error en endpoint de login:", error);
    return NextResponse.json(
      { success: false, error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
