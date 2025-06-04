import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateApiKey } from "@/lib/api-key-validator";

// GET /api/v1/random-questions - Obtener preguntas aleatorias de un nivel específico
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
    const countParam = url.searchParams.get('count') || '10';
    const difficultyParam = url.searchParams.get('difficulty');
    
    // Convertir y validar parámetros
    const count = parseInt(countParam);
    const difficulty = difficultyParam ? parseInt(difficultyParam) : undefined;
    
    if (isNaN(count) || count < 1 || count > 50) {
      return NextResponse.json(
        { error: "El parámetro 'count' debe ser un número entre 1 y 50" },
        { status: 400 }
      );
    }
    
    if (difficulty !== undefined && (isNaN(difficulty) || difficulty < 1 || difficulty > 5)) {
      return NextResponse.json(
        { error: "El parámetro 'difficulty' debe ser un número entre 1 y 5" },
        { status: 400 }
      );
    }
    
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
    
    // Construir la consulta para obtener IDs de cuestionarios publicados del nivel
    const questionnaires = await prisma.questionnaire.findMany({
      where: {
        subject_level_id: levelId,
        published: true
      },
      select: {
        id: true
      }
    });
    
    const questionnaireIds = questionnaires.map(q => q.id);
    
    if (questionnaireIds.length === 0) {
      return NextResponse.json(
        { error: "No hay cuestionarios publicados para este nivel" },
        { status: 404 }
      );
    }
    
    // Construir la consulta para obtener preguntas aleatorias
    let whereClause: any = {
      questionnaire_id: {
        in: questionnaireIds
      },
      active: true
    };
    
    // Filtrar por dificultad si se proporciona
    if (difficulty !== undefined) {
      whereClause.difficulty = difficulty;
    }
    
    // Obtener todas las preguntas que cumplen con los criterios
    const allQuestions = await prisma.question.findMany({
      where: whereClause,
      select: {
        id: true,
        text: true,
        question_type: true,
        explanation: true,
        extra_info: true,
        points: true,
        difficulty: true,
        tags: true,
        questionnaire_id: true,
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
      }
    });
    
    // Seleccionar aleatoriamente 'count' preguntas
    let randomQuestions = [];
    if (allQuestions.length <= count) {
      // Si hay menos preguntas que las solicitadas, devolver todas
      randomQuestions = allQuestions;
    } else {
      // Seleccionar aleatoriamente 'count' preguntas
      const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
      randomQuestions = shuffled.slice(0, count);
    }
    
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
      total_available: allQuestions.length,
      questions_returned: randomQuestions.length,
      questions: randomQuestions
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error("Error al obtener preguntas aleatorias:", error);
    return NextResponse.json(
      { error: "Error al obtener las preguntas aleatorias" },
      { status: 500 }
    );
  }
}
