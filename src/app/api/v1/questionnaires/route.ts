import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateApiKey } from "@/lib/api-key-validator";

// GET /api/v1/questionnaires - Obtener cuestionarios por nivel
export async function GET(request: NextRequest) {
  try {
    // Validar la API Key
    const validation = await validateApiKey(request);
    
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: validation.status });
    }
    
    // Obtener parámetros de consulta
    const url = new URL(request.url);
    const levelId = url.searchParams.get('level_id');
    
    // Verificar si se proporcionó un ID de nivel
    if (!levelId) {
      return NextResponse.json(
        { error: "Se requiere el parámetro level_id" },
        { status: 400 }
      );
    }
    
    // Verificar que el nivel existe y pertenece a una materia asociada con esta API Key
    const level = await prisma.subjectLevel.findUnique({
      where: { id: levelId },
      include: {
        subject: {
          select: {
            api_key_id: true
          }
        }
      }
    });
    
    if (!level) {
      return NextResponse.json(
        { error: "Nivel no encontrado" },
        { status: 404 }
      );
    }
    
    if (level.subject.api_key_id !== validation.apiKeyRecord.id) {
      return NextResponse.json(
        { error: "No autorizado para acceder a este nivel" },
        { status: 403 }
      );
    }
    
    // Obtener los cuestionarios del nivel
    const questionnaires = await prisma.questionnaire.findMany({
      where: {
        subject_level_id: levelId,
        published: true
      },
      select: {
        id: true,
        name: true,
        description: true,
        order: true,
        _count: {
          select: {
            questions: true
          }
        }
      },
      orderBy: {
        order: "asc"
      }
    });
    
    return NextResponse.json(questionnaires);
  } catch (error) {
    console.error("Error al obtener cuestionarios:", error);
    return NextResponse.json(
      { error: "Error al obtener los cuestionarios" },
      { status: 500 }
    );
  }
}
