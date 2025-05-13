import { NextRequest, NextResponse } from "next/server";
import { registerUser } from "@/actions/user-register";

// Función para validar la API Key
async function validateApiKey(apiKey: string | null) {
  if (!apiKey) {
    return false;
  }
  
  // La validación real se hace en la función registerUser
  // Aquí solo verificamos que se haya proporcionado
  return true;
}

// Endpoint para registrar un usuario
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
    
    // Llamar a la función de registro con los datos y la API Key
    const result = await registerUser({
      ...body,
      api_key: apiKey as string,
      ip_address: request.headers.get("x-forwarded-for") || 
                  request.headers.get("x-real-ip") || 
                  "0.0.0.0",
      user_agent: request.headers.get("user-agent") || "Unknown"
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
      message: result.message,
      user_id: result.user_id,
      // En producción, no devolver el token de verificación
      ...(process.env.NODE_ENV === "development" && { verification_token: result.verification_token })
    }, { status: 201 });
    
  } catch (error) {
    console.error("Error en endpoint de registro:", error);
    return NextResponse.json(
      { success: false, error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
