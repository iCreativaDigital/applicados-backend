import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateApiKey } from "@/lib/api-key-validator";

// GET /api/v1/test-types - Obtener todos los tipos de prueba
export async function GET(request: NextRequest) {
  try {
    // Validar la API Key
    const validation = await validateApiKey(request);
    
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: validation.status });
    }
    
    // Obtener los tipos de prueba asociados a esta API Key
    const testTypes = await prisma.testType.findMany({
      where: {
        api_key_id: validation.apiKeyRecord.id,
      },
      orderBy: {
        name: 'asc',
      },
      select: {
        id: true,
        name: true,
        description: true,
        created_at: true,
        updated_at: true,
      },
    });
    
    return NextResponse.json(testTypes);
  } catch (error) {
    console.error("Error al obtener tipos de prueba:", error);
    return NextResponse.json(
      { error: "Error al obtener los tipos de prueba" },
      { status: 500 }
    );
  }
}
