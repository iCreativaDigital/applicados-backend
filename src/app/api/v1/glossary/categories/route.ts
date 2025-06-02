import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateApiKey } from "@/lib/api-key-validator";

// GET /api/v1/glossary/categories - Obtener todas las categorías del glosario
export async function GET(request: NextRequest) {
  try {
    // Validar la API Key
    const validation = await validateApiKey(request);
    
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: validation.status });
    }
    
    // Obtener las categorías activas del glosario
    const categories = await prisma.glossaryCategory.findMany({
      where: {
        active: true,
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
        _count: {
          select: {
            terms: {
              where: {
                active: true
              }
            }
          }
        }
      },
    });
    
    // Transformar la respuesta para un formato más limpio
    const formattedCategories = categories.map(category => ({
      id: category.id,
      name: category.name,
      description: category.description,
      created_at: category.created_at,
      updated_at: category.updated_at,
      terms_count: category._count.terms
    }));
    
    return NextResponse.json(formattedCategories);
  } catch (error) {
    console.error("Error al obtener categorías del glosario:", error);
    return NextResponse.json(
      { error: "Error al obtener las categorías del glosario" },
      { status: 500 }
    );
  }
}
