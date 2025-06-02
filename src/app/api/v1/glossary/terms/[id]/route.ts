import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateApiKey } from "@/lib/api-key-validator";

// GET /api/v1/glossary/terms/[id] - Obtener un término del glosario por ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Validar la API Key
    const validation = await validateApiKey(request);
    
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: validation.status });
    }
    
    const { id } = params;
    
    // Obtener el término por ID
    const term = await prisma.glossaryTerm.findUnique({
      where: {
        id,
        active: true,
      },
      select: {
        id: true,
        word: true,
        description: true,
        created_at: true,
        updated_at: true,
        category: {
          select: {
            id: true,
            name: true,
            description: true,
            active: true,
          },
        },
      },
    });
    
    if (!term) {
      return NextResponse.json(
        { error: "Término no encontrado" },
        { status: 404 }
      );
    }
    
    // Verificar que la categoría esté activa
    if (!term.category.active) {
      return NextResponse.json(
        { error: "Este término pertenece a una categoría inactiva" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(term);
  } catch (error) {
    console.error("Error al obtener término del glosario:", error);
    return NextResponse.json(
      { error: "Error al obtener el término del glosario" },
      { status: 500 }
    );
  }
}
