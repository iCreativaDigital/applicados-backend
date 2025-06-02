import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateApiKey } from "@/lib/api-key-validator";

// GET /api/v1/glossary/categories/[id] - Obtener una categoría del glosario por ID
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
    
    // Obtener la categoría por ID
    const category = await prisma.glossaryCategory.findUnique({
      where: {
        id,
        active: true,
      },
      include: {
        terms: {
          where: {
            active: true,
          },
          orderBy: {
            word: 'asc',
          },
          select: {
            id: true,
            word: true,
            description: true,
            created_at: true,
            updated_at: true,
          },
        },
      },
    });
    
    if (!category) {
      return NextResponse.json(
        { error: "Categoría no encontrada" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(category);
  } catch (error) {
    console.error("Error al obtener categoría del glosario:", error);
    return NextResponse.json(
      { error: "Error al obtener la categoría del glosario" },
      { status: 500 }
    );
  }
}
