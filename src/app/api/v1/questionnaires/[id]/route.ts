import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateApiKey } from "@/lib/api-key-validator";

// GET /api/v1/questionnaires/[id] - Obtener un cuestionario específico con sus preguntas
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
    
    // Obtener el cuestionario con sus preguntas
    const questionnaire = await prisma.questionnaire.findUnique({
      where: { 
        id: params.id,
        published: true // Solo cuestionarios publicados
      },
      select: {
        id: true,
        name: true,
        description: true,
        order: true,
        subjectLevel: {
          select: {
            id: true,
            title: true,
            reference_title: true,
            subject: {
              select: {
                id: true,
                name: true,
                api_key_id: true,
              }
            }
          }
        },
        questions: {
          where: {
            active: true // Solo preguntas activas
          },
          select: {
            id: true,
            text: true,
            question_type: true,
            explanation: true,
            extra_info: true, // Incluimos el nuevo campo extra_info
            points: true,
            order: true,
            difficulty: true,
            tags: true,
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
          orderBy: {
            order: "asc"
          }
        }
      }
    });
    
    if (!questionnaire) {
      return NextResponse.json(
        { error: "Cuestionario no encontrado" },
        { status: 404 }
      );
    }
    
    // Verificar que el cuestionario pertenece a una materia asociada con esta API Key
    if (questionnaire.subjectLevel.subject.api_key_id !== validation.apiKeyRecord.id) {
      return NextResponse.json(
        { error: "No autorizado para acceder a este cuestionario" },
        { status: 403 }
      );
    }
    
    return NextResponse.json(questionnaire);
  } catch (error) {
    console.error("Error al obtener cuestionario:", error);
    return NextResponse.json(
      { error: "Error al obtener el cuestionario" },
      { status: 500 }
    );
  }
}
