import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateApiKey } from "@/lib/api-key-validator";

// GET /api/v1/subject-levels/[id] - Obtener un nivel específico de materia por ID
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
    
    // Obtener el nivel de materia
    const level = await prisma.subjectLevel.findUnique({
      where: { 
        id: params.id 
      },
      select: {
        id: true,
        reference_title: true,
        title: true,
        order: true,
        number_of_questions: true,
        approximate_time_minutes: true,
        created_at: true,
        updated_at: true,
        subject: {
          select: {
            id: true,
            name: true,
            api_key_id: true,
          }
        },
        questionnaires: {
          where: {
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
            },
            questions: {
              select: {
                id: true,
                text: true,
                question_type: true,
                explanation: true,
                points: true,
                order: true,
                difficulty: true,
                tags: true,
                active: true,
                answerOptions: {
                  select: {
                    id: true,
                    text: true,
                    is_correct: true,
                    order: true,
                  },
                  orderBy: {
                    order: "asc"
                  }
                }
              },
              where: {
                active: true
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
    });
    
    if (!level) {
      return NextResponse.json(
        { error: "Nivel de materia no encontrado" },
        { status: 404 }
      );
    }
    
    // Verificar que el nivel pertenece a una materia asociada con esta API Key
    if (level.subject.api_key_id !== validation.apiKeyRecord.id) {
      return NextResponse.json(
        { error: "No autorizado para acceder a este nivel de materia" },
        { status: 403 }
      );
    }
    
    return NextResponse.json(level);
  } catch (error) {
    console.error("Error al obtener nivel de materia:", error);
    return NextResponse.json(
      { error: "Error al obtener el nivel de materia" },
      { status: 500 }
    );
  }
}
