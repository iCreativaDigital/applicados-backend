import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateApiKey } from "@/lib/api-key-validator";

// GET /api/v1/subject-levels - Obtener todos los niveles de materia
export async function GET(request: NextRequest) {
  try {
    // Validar la API Key
    const validation = await validateApiKey(request);
    
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: validation.status });
    }
    
    // Obtener parámetros de consulta
    const url = new URL(request.url);
    const subjectId = url.searchParams.get('subject_id');
    
    // Verificar si se proporcionó un ID de materia
    if (!subjectId) {
      return NextResponse.json(
        { error: "Se requiere el parámetro subject_id" },
        { status: 400 }
      );
    }
    
    // Verificar que la materia existe y pertenece a esta API Key
    const subject = await prisma.subject.findFirst({
      where: {
        id: subjectId,
        api_key_id: validation.apiKeyRecord.id,
      },
      select: { id: true }
    });
    
    if (!subject) {
      return NextResponse.json(
        { error: "Materia no encontrada o no autorizada" },
        { status: 404 }
      );
    }
    
    // Obtener los niveles de la materia
    const levels = await prisma.subjectLevel.findMany({
      where: {
        subject_id: subjectId,
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
            }
          },
          orderBy: {
            order: "asc"
          }
        }
      },
      orderBy: {
        order: "asc",
      },
    });
    
    return NextResponse.json(levels);
  } catch (error) {
    console.error("Error al obtener niveles de materia:", error);
    return NextResponse.json(
      { error: "Error al obtener los niveles de materia" },
      { status: 500 }
    );
  }
}
