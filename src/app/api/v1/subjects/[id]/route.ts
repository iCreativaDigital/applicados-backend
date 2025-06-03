import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateApiKey } from "@/lib/api-key-validator";

// GET /api/v1/subjects/[id] - Obtener una materia específica por ID
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
    
    // Obtener la materia
    const subject = await prisma.subject.findUnique({
      where: { 
        id: params.id,
        api_key_id: validation.apiKeyRecord.id, // Asegurar que pertenece a esta API Key
      },
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
    });
    
    if (!subject) {
      return NextResponse.json(
        { error: "Materia no encontrada" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(subject);
  } catch (error) {
    console.error("Error al obtener materia:", error);
    return NextResponse.json(
      { error: "Error al obtener la materia" },
      { status: 500 }
    );
  }
}
