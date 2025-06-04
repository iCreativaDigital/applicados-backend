import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateApiKey } from "@/lib/api-key-validator";

// GET /api/v1/level-questions - Obtener todas las preguntas de un nivel específico
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
            id: true,
            name: true,
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
    
    // Obtener todos los cuestionarios publicados del nivel con sus preguntas activas
    const questionnairesWithQuestions = await prisma.questionnaire.findMany({
      where: {
        subject_level_id: levelId,
        published: true
      },
      select: {
        id: true,
        name: true,
        description: true,
        order: true,
        questions: {
          where: {
            active: true
          },
          select: {
            id: true,
            text: true,
            question_type: true,
            explanation: true,
            extra_info: true,
            points: true,
            order: true,
            difficulty: true,
            tags: true,
            answerOptions: {
              select: {
                id: true,
                text: true,
                is_correct: true,
                order: true
              },
              orderBy: {
                order: "asc"
              }
            }
          },
          orderBy: {
            order: "asc"
          }
        }
      },
      orderBy: {
        order: "asc"
      }
    });
    
    // Preparar la respuesta con la información del nivel y todas sus preguntas
    const response = {
      level: {
        id: level.id,
        title: level.title,
        reference_title: level.reference_title,
        subject: {
          id: level.subject.id,
          name: level.subject.name
        }
      },
      questionnaires: questionnairesWithQuestions
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error("Error al obtener preguntas del nivel:", error);
    return NextResponse.json(
      { error: "Error al obtener las preguntas del nivel" },
      { status: 500 }
    );
  }
}
