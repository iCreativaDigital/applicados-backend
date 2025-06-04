import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateApiKey } from "@/lib/api-key-validator";

// GET /api/v1/search-questions - Buscar preguntas por texto o etiquetas
export async function GET(request: NextRequest) {
  try {
    // Validar la API Key
    const validation = await validateApiKey(request);
    
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: validation.status });
    }
    
    // Obtener parámetros de consulta
    const url = new URL(request.url);
    const query = url.searchParams.get('query');
    const subjectId = url.searchParams.get('subject_id');
    const levelId = url.searchParams.get('level_id');
    const tags = url.searchParams.get('tags');
    const limitParam = url.searchParams.get('limit') || '20';
    
    // Convertir y validar parámetros
    const limit = parseInt(limitParam);
    
    if (isNaN(limit) || limit < 1 || limit > 100) {
      return NextResponse.json(
        { error: "El parámetro 'limit' debe ser un número entre 1 y 100" },
        { status: 400 }
      );
    }
    
    // Verificar que al menos se proporciona un criterio de búsqueda
    if (!query && !tags && !subjectId && !levelId) {
      return NextResponse.json(
        { error: "Se requiere al menos un criterio de búsqueda (query, tags, subject_id o level_id)" },
        { status: 400 }
      );
    }
    
    // Construir la consulta base
    let whereClause: any = {
      active: true,
    };
    
    // Filtrar por texto de la pregunta si se proporciona
    if (query) {
      whereClause.OR = [
        {
          text: {
            contains: query,
            mode: 'insensitive'
          }
        },
        {
          explanation: {
            contains: query,
            mode: 'insensitive'
          }
        },
        {
          extra_info: {
            contains: query,
            mode: 'insensitive'
          }
        }
      ];
    }
    
    // Filtrar por etiquetas si se proporcionan
    if (tags) {
      const tagArray = tags.split(',').map(tag => tag.trim());
      
      // Añadir condición para cada etiqueta
      const tagConditions = tagArray.map(tag => ({
        tags: {
          contains: tag,
          mode: 'insensitive'
        }
      }));
      
      // Si ya existe una condición OR, combinarla con las condiciones de etiquetas
      if (whereClause.OR) {
        whereClause.OR = [...whereClause.OR, ...tagConditions];
      } else {
        whereClause.OR = tagConditions;
      }
    }
    
    // Filtrar por nivel si se proporciona
    if (levelId) {
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
      
      // Obtener IDs de cuestionarios del nivel
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
      
      whereClause.questionnaire_id = {
        in: questionnaireIds
      };
    }
    // Filtrar por materia si se proporciona
    else if (subjectId) {
      // Verificar que la materia existe y está asociada con esta API Key
      const subject = await prisma.subject.findFirst({
        where: {
          id: subjectId,
          api_key_id: validation.apiKeyRecord.id
        }
      });
      
      if (!subject) {
        return NextResponse.json(
          { error: "Materia no encontrada o no autorizada" },
          { status: 404 }
        );
      }
      
      // Obtener IDs de niveles de la materia
      const levels = await prisma.subjectLevel.findMany({
        where: {
          subject_id: subjectId
        },
        select: {
          id: true
        }
      });
      
      const levelIds = levels.map(l => l.id);
      
      if (levelIds.length === 0) {
        return NextResponse.json(
          { error: "No hay niveles para esta materia" },
          { status: 404 }
        );
      }
      
      // Obtener IDs de cuestionarios de los niveles
      const questionnaires = await prisma.questionnaire.findMany({
        where: {
          subject_level_id: {
            in: levelIds
          },
          published: true
        },
        select: {
          id: true
        }
      });
      
      const questionnaireIds = questionnaires.map(q => q.id);
      
      if (questionnaireIds.length === 0) {
        return NextResponse.json(
          { error: "No hay cuestionarios publicados para esta materia" },
          { status: 404 }
        );
      }
      
      whereClause.questionnaire_id = {
        in: questionnaireIds
      };
    }
    // Si no se proporciona ni materia ni nivel, verificar que las preguntas pertenecen a materias asociadas con esta API Key
    else {
      // Obtener todas las materias asociadas con esta API Key
      const subjects = await prisma.subject.findMany({
        where: {
          api_key_id: validation.apiKeyRecord.id
        },
        select: {
          id: true
        }
      });
      
      const subjectIds = subjects.map(s => s.id);
      
      if (subjectIds.length === 0) {
        return NextResponse.json(
          { error: "No hay materias asociadas con esta API Key" },
          { status: 404 }
        );
      }
      
      // Obtener IDs de niveles de las materias
      const levels = await prisma.subjectLevel.findMany({
        where: {
          subject_id: {
            in: subjectIds
          }
        },
        select: {
          id: true
        }
      });
      
      const levelIds = levels.map(l => l.id);
      
      if (levelIds.length === 0) {
        return NextResponse.json(
          { error: "No hay niveles para las materias asociadas con esta API Key" },
          { status: 404 }
        );
      }
      
      // Obtener IDs de cuestionarios de los niveles
      const questionnaires = await prisma.questionnaire.findMany({
        where: {
          subject_level_id: {
            in: levelIds
          },
          published: true
        },
        select: {
          id: true
        }
      });
      
      const questionnaireIds = questionnaires.map(q => q.id);
      
      if (questionnaireIds.length === 0) {
        return NextResponse.json(
          { error: "No hay cuestionarios publicados para las materias asociadas con esta API Key" },
          { status: 404 }
        );
      }
      
      whereClause.questionnaire_id = {
        in: questionnaireIds
      };
    }
    
    // Realizar la búsqueda de preguntas
    const questions = await prisma.question.findMany({
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
        questionnaire: {
          select: {
            id: true,
            name: true,
            subjectLevel: {
              select: {
                id: true,
                title: true,
                subject: {
                  select: {
                    id: true,
                    name: true
                  }
                }
              }
            }
          }
        },
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
      orderBy: [
        { difficulty: "asc" },
        { order: "asc" }
      ],
      take: limit
    });
    
    // Preparar la respuesta
    const response = {
      total_results: questions.length,
      questions: questions
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error("Error al buscar preguntas:", error);
    return NextResponse.json(
      { error: "Error al buscar preguntas" },
      { status: 500 }
    );
  }
}
