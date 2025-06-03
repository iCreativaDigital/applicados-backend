import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateApiKey } from "@/lib/api-key-validator";

// GET /api/v1/test-types/[id] - Obtener un tipo de prueba por ID
export async function GET(
  request: NextRequest,
  { params } : { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Validar la API Key
    const validation = await validateApiKey(request);
    
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: validation.status });
    }
    
    // Obtener el tipo de prueba por ID y verificar que pertenezca a esta API Key
    const testType = await prisma.testType.findFirst({
      where: {
        id,
        api_key_id: validation.apiKeyRecord.id,
      },
      select: {
        id: true,
        name: true,
        description: true,
        created_at: true,
        updated_at: true,
      },
    });
    
    if (!testType) {
      return NextResponse.json(
        { error: "Tipo de prueba no encontrado" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(testType);
  } catch (error) {
    console.error("Error al obtener tipo de prueba:", error);
    return NextResponse.json(
      { error: "Error al obtener el tipo de prueba" },
      { status: 500 }
    );
  }
}
