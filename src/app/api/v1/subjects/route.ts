import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateApiKey } from "@/lib/api-key-validator";

// GET /api/v1/subjects - Obtener todas las materias
export async function GET(request: NextRequest) {
  try {
    // Validar la API Key
    const validation = await validateApiKey(request);
    
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: validation.status });
    }
    
    // Obtener parámetros de consulta
    const url = new URL(request.url);
    const testTypeId = url.searchParams.get('test_type_id');
    
    // Construir la consulta base
    let whereClause: any = {
      api_key_id: validation.apiKeyRecord.id,
    };
    
    // Filtrar por tipo de prueba si se proporciona
    if (testTypeId) {
      whereClause.testSubjects = {
        some: {
          test_type_id: testTypeId,
        },
      };
    }
    
    // Obtener las materias
    const subjects = await prisma.subject.findMany({
      where: whereClause,
      select: {
        id: true,
        name: true,
        slug_materia: true,
        description: true,
        // icon_url y cover_image_url no están en Subject, podrían estar en SubjectDetail
        total_questions: true,
        approximate_total_minutes: true,
        order: true,
        created_at: true,
        updated_at: true,
        subject_detail: {
          select: {
            id: true,
            background_image_url: true, // Asumiendo que cover_image_url se refería a esto
            title: true, // Asumiendo que icon_url podría relacionarse con el título o ser un campo nuevo
            title_color: true,
            subtitle: true,
            primary_color_hex: true
          }
        },
        subject_levels: {
          select: {
            id: true,
            reference_title: true,
            title: true,
            order: true,
            number_of_questions: true,
            approximate_time_minutes: true,
          },
          orderBy: {
            order: "asc",
          },
        },
        testSubjects: {
          select: {
            test_type_id: true,
            test_type: {
              select: {
                name: true,
              }
            }
          }
        },
      },
      orderBy: {
        order: "asc",
      },
    });
    
    return NextResponse.json(subjects);
  } catch (error) {
    console.error("Error al obtener materias:", error);
    return NextResponse.json(
      { error: "Error al obtener las materias" },
      { status: 500 }
    );
  }
}
