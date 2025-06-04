import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateApiKey } from "@/lib/api-key-validator";

// GET /api/v1/level-stats - Obtener estadísticas de preguntas por nivel
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
    
    // Obtener todos los cuestionarios publicados del nivel
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
            questions: {
              where: {
                active: true
              }
            }
          }
        }
      },
      orderBy: {
        order: "asc"
      }
    });
    
    // Obtener estadísticas de preguntas por tipo
    const questionTypeStats = await prisma.question.groupBy({
      by: ['question_type'],
      where: {
        questionnaire: {
          subject_level_id: levelId,
          published: true
        },
        active: true
      },
      _count: {
        id: true
      }
    });
    
    // Obtener estadísticas de preguntas por dificultad
    const difficultyStats = await prisma.question.groupBy({
      by: ['difficulty'],
      where: {
        questionnaire: {
          subject_level_id: levelId,
          published: true
        },
        active: true
      },
      _count: {
        id: true
      },
      orderBy: {
        difficulty: 'asc'
      }
    });
    
    // Calcular el total de preguntas
    const totalQuestions = questionnaires.reduce((sum, q) => sum + q._count.questions, 0);
    
    // Preparar la respuesta
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
      total_questionnaires: questionnaires.length,
      total_questions: totalQuestions,
      questionnaires: questionnaires.map(q => ({
        id: q.id,
        name: q.name,
        description: q.description,
        order: q.order,
        question_count: q._count.questions
      })),
      question_types: questionTypeStats.map(stat => ({
        type: stat.question_type,
        count: stat._count.id,
        percentage: Math.round((stat._count.id / totalQuestions) * 100)
      })),
      difficulty_distribution: difficultyStats.map(stat => ({
        difficulty: stat.difficulty,
        count: stat._count.id,
        percentage: Math.round((stat._count.id / totalQuestions) * 100)
      }))
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error("Error al obtener estadísticas del nivel:", error);
    return NextResponse.json(
      { error: "Error al obtener las estadísticas del nivel" },
      { status: 500 }
    );
  }
}
