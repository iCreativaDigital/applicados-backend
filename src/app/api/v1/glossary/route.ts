import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateApiKey } from "@/lib/api-key-validator";

// GET /api/v1/glossary - Obtener información general del glosario
export async function GET(request: NextRequest) {
  try {
    // Validar la API Key
    const validation = await validateApiKey(request);
    
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: validation.status });
    }
    
    // Obtener estadísticas del glosario
    const categoriesCount = await prisma.glossaryCategory.count({
      where: { active: true }
    });
    
    const termsCount = await prisma.glossaryTerm.count({
      where: { active: true }
    });
    
    // Obtener las categorías principales con conteo de términos
    const categories = await prisma.glossaryCategory.findMany({
      where: { active: true },
      orderBy: { name: 'asc' },
      select: {
        id: true,
        name: true,
        _count: {
          select: {
            terms: {
              where: { active: true }
            }
          }
        }
      },
      take: 5
    });
    
    // Obtener los términos más recientes
    const recentTerms = await prisma.glossaryTerm.findMany({
      where: { active: true },
      orderBy: { created_at: 'desc' },
      select: {
        id: true,
        word: true,
        category: {
          select: {
            id: true,
            name: true
          }
        }
      },
      take: 5
    });
    
    return NextResponse.json({
      stats: {
        categories_count: categoriesCount,
        terms_count: termsCount
      },
      top_categories: categories.map(c => ({
        id: c.id,
        name: c.name,
        terms_count: c._count.terms
      })),
      recent_terms: recentTerms
    });
  } catch (error) {
    console.error("Error al obtener información del glosario:", error);
    return NextResponse.json(
      { error: "Error al obtener información del glosario" },
      { status: 500 }
    );
  }
}
