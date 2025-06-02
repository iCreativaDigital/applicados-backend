import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateApiKey } from "@/lib/api-key-validator";

// GET /api/v1/glossary/terms - Obtener todos los términos del glosario
export async function GET(request: NextRequest) {
  try {
    // Validar la API Key
    const validation = await validateApiKey(request);
    
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: validation.status });
    }
    
    // Obtener parámetros de consulta
    const url = new URL(request.url);
    const categoryId = url.searchParams.get("category_id");
    const query = url.searchParams.get("q");
    
    // Construir condiciones de búsqueda
    const whereConditions: any = {
      active: true,
    };
    
    // Filtrar por categoría si se proporciona
    if (categoryId) {
      whereConditions.category_id = categoryId;
      
      // Verificar que la categoría exista y esté activa
      const category = await prisma.glossaryCategory.findUnique({
        where: {
          id: categoryId,
          active: true,
        },
      });
      
      if (!category) {
        return NextResponse.json(
          { error: "Categoría no encontrada o inactiva" },
          { status: 404 }
        );
      }
    }
    
    // Filtrar por término de búsqueda si se proporciona
    if (query) {
      whereConditions.OR = [
        { word: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
      ];
    }
    
    // Obtener los términos del glosario
    const terms = await prisma.glossaryTerm.findMany({
      where: whereConditions,
      orderBy: {
        word: 'asc',
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
          },
        },
      },
    });
    
    return NextResponse.json(terms);
  } catch (error) {
    console.error("Error al obtener términos del glosario:", error);
    return NextResponse.json(
      { error: "Error al obtener los términos del glosario" },
      { status: 500 }
    );
  }
}
