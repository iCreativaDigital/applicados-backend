"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"
import { revalidatePath } from "next/cache"

// Esquema de validación para crear/actualizar materias
const subjectSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  slug_materia: z.string().min(2, "El slug debe tener al menos 2 caracteres")
    .regex(/^[a-z0-9-]+$/, "El slug solo puede contener letras minúsculas, números y guiones"),
  description: z.string().optional(),
  icon_url: z.string().optional(),
  cover_image_url: z.string().optional(),
  total_questions: z.coerce.number().int().min(0, "El número de preguntas no puede ser negativo"),
  approximate_total_minutes: z.coerce.number().int().min(0, "El tiempo aproximado no puede ser negativo"),
  order: z.coerce.number().int().min(0, "El orden no puede ser negativo"),
  test_type_ids: z.array(z.string()).optional(),
  api_key_id: z.string().optional(),
})

type SubjectFormData = z.infer<typeof subjectSchema>

/**
 * Obtener todas las materias
 */
export async function getSubjects(apiKeyId?: string, testTypeId?: string) {
  try {
    // Verificar autenticación
    const session = await auth()
    if (!session) {
      return {
        errors: { _form: ["No autorizado"] },
        success: false,
      }
    }

    // Construir la consulta base
    let whereClause: any = {}

    // Filtrar por API Key si se proporciona
    if (apiKeyId) {
      whereClause.api_key_id = apiKeyId
    }

    // Filtrar por tipo de prueba si se proporciona
    if (testTypeId) {
      whereClause.testSubjects = {
        some: {
          test_type_id: testTypeId,
        },
      }
    }

    // Ejecutar la consulta
    const subjects = await prisma.subject.findMany({
      where: whereClause,
      include: {
        subject_detail: true,
        subject_levels: {
          orderBy: {
            order: "asc",
          },
        },
        testSubjects: true,
      },
      orderBy: {
        order: "asc",
      },
    })

    return {
      data: subjects,
      success: true,
    }
  } catch (error) {
    console.error("Error al obtener materias:", error)
    return {
      errors: { _form: ["Error al obtener las materias"] },
      success: false,
    }
  }
}

/**
 * Obtener una materia por ID
 */
export async function getSubjectById(id: string) {
  try {
    // Verificar autenticación
    const session = await auth()
    if (!session) {
      return {
        errors: { _form: ["No autorizado"] },
        success: false,
      }
    }

    // Obtener la materia
    const subject = await prisma.subject.findUnique({
      where: { id },
      include: {
        subject_detail: true,
        subject_levels: {
          orderBy: {
            order: "asc",
          },
        },
        testSubjects: true,
      },
    })

    if (!subject) {
      return {
        errors: { _form: ["Materia no encontrada"] },
        success: false,
      }
    }

    return {
      data: subject,
      success: true,
    }
  } catch (error) {
    console.error("Error al obtener materia:", error)
    return {
      errors: { _form: ["Error al obtener la materia"] },
      success: false,
    }
  }
}

/**
 * Crear una nueva materia
 */
export async function createSubject(formData: SubjectFormData) {
  try {
    // Verificar autenticación
    const session = await auth()
    if (!session) {
      return {
        errors: { _form: ["No autorizado"] },
        success: false,
      }
    }

    // Validar datos
    const validationResult = subjectSchema.safeParse(formData)
    if (!validationResult.success) {
      const errors = validationResult.error.flatten().fieldErrors
      return {
        errors,
        success: false,
      }
    }

    const {
      name,
      slug_materia,
      description,
      icon_url,
      cover_image_url,
      total_questions,
      approximate_total_minutes,
      order,
      test_type_ids,
      api_key_id,
    } = validationResult.data

    // Verificar si ya existe una materia con el mismo slug
    const existingSubject = await prisma.subject.findFirst({
      where: {
        slug_materia,
        api_key_id: api_key_id || null,
      },
    })

    if (existingSubject) {
      return {
        errors: { slug_materia: ["Ya existe una materia con ese slug"] },
        success: false,
      }
    }

    // Crear la materia en una transacción para asegurar consistencia
    const newSubject = await prisma.$transaction(async (tx) => {
      // Crear la materia
      const subject = await tx.subject.create({
        data: {
          name,
          description: description || "", // Incluir el campo description obligatorio
          slug_materia,
          total_questions: total_questions || 0,
          approximate_total_minutes: approximate_total_minutes || 0,
          order: order || 0,
          api_key_id: api_key_id || null,
        },
      })

      // Crear los detalles de la materia
      await tx.subjectDetail.create({
        data: {
          subject_id: subject.id,
          title: subject.name, // Usar el nombre de la materia como título por defecto
          subtitle: description || null, // Usar la descripción como subtítulo
          background_image_url: cover_image_url || null, // Usar cover_image_url como background_image_url
          title_color: null,
          primary_color_hex: null,
        },
      })

      // Asociar con tipos de prueba si se proporcionan
      if (test_type_ids && test_type_ids.length > 0) {
        const testSubjectData = test_type_ids.map((testTypeId) => ({
          test_type_id: testTypeId,
          subject_id: subject.id,
        }))

        await tx.testSubject.createMany({
          data: testSubjectData,
        })
      }

      return subject
    })

    // Revalidar la ruta para actualizar los datos
    revalidatePath("/dashboard/applicados/subjects")

    return {
      data: newSubject,
      success: true,
    }
  } catch (error) {
    console.error("Error al crear materia:", error)
    return {
      errors: { _form: ["Error al crear la materia"] },
      success: false,
    }
  }
}

/**
 * Actualizar una materia existente
 */
export async function updateSubject(id: string, formData: SubjectFormData) {
  try {
    // Verificar autenticación
    const session = await auth()
    if (!session) {
      return {
        errors: { _form: ["No autorizado"] },
        success: false,
      }
    }

    // Validar datos
    const validationResult = subjectSchema.safeParse(formData)
    if (!validationResult.success) {
      const errors = validationResult.error.flatten().fieldErrors
      return {
        errors,
        success: false,
      }
    }

    // Verificar si existe la materia
    const existingSubject = await prisma.subject.findUnique({
      where: { id },
    })

    if (!existingSubject) {
      return {
        errors: { _form: ["Materia no encontrada"] },
        success: false,
      }
    }

    const {
      name,
      slug_materia,
      description,
      icon_url,
      cover_image_url,
      total_questions,
      approximate_total_minutes,
      order,
      test_type_ids,
      api_key_id,
    } = validationResult.data

    // Verificar si ya existe otra materia con el mismo slug
    const duplicateSlug = await prisma.subject.findFirst({
      where: {
        slug_materia,
        api_key_id: api_key_id || null,
        id: { not: id },
      },
    })

    if (duplicateSlug) {
      return {
        errors: { slug_materia: ["Ya existe otra materia con ese slug"] },
        success: false,
      }
    }

    // Actualizar la materia en una transacción para asegurar consistencia
    await prisma.$transaction(async (tx) => {
      // Actualizar la materia
      await tx.subject.update({
        where: { id },
        data: {
          name,
          description: description || "", // Incluir el campo description obligatorio
          slug_materia,
          total_questions: total_questions || 0,
          approximate_total_minutes: approximate_total_minutes || 0,
          order: order || 0,
          api_key_id: api_key_id || null,
        },
      })

      // Actualizar o crear los detalles de la materia
      const subjectDetail = await tx.subjectDetail.findUnique({
        where: { subject_id: id },
      })

      // Obtener el nombre actualizado de la materia
      const updatedSubject = await tx.subject.findUnique({
        where: { id },
        select: { name: true }
      })

      if (subjectDetail) {
        await tx.subjectDetail.update({
          where: { subject_id: id },
          data: {
            title: updatedSubject?.name || name, // Usar el nombre de la materia como título
            subtitle: description || null, // Usar la descripción como subtítulo
            background_image_url: cover_image_url || null, // Usar cover_image_url como background_image_url
          },
        })
      } else {
        await tx.subjectDetail.create({
          data: {
            subject_id: id,
            title: updatedSubject?.name || name, // Usar el nombre de la materia como título
            subtitle: description || null, // Usar la descripción como subtítulo
            background_image_url: cover_image_url || null, // Usar cover_image_url como background_image_url
            title_color: null,
            primary_color_hex: null,
          },
        })
      }

      // Actualizar asociaciones con tipos de prueba
      if (test_type_ids) {
        // Eliminar asociaciones existentes
        await tx.testSubject.deleteMany({
          where: { subject_id: id },
        })

        // Crear nuevas asociaciones
        if (test_type_ids.length > 0) {
          const testSubjectData = test_type_ids.map((testTypeId) => ({
            test_type_id: testTypeId,
            subject_id: id,
          }))

          await tx.testSubject.createMany({
            data: testSubjectData,
          })
        }
      }
    })

    // Revalidar la ruta para actualizar los datos
    revalidatePath("/dashboard/applicados/subjects")
    revalidatePath(`/dashboard/applicados/subjects/${id}`)

    return {
      success: true,
    }
  } catch (error) {
    console.error("Error al actualizar materia:", error)
    return {
      errors: { _form: ["Error al actualizar la materia"] },
      success: false,
    }
  }
}

/**
 * Eliminar una materia
 */
export async function deleteSubject(id: string) {
  try {
    // Verificar autenticación
    const session = await auth()
    if (!session) {
      return {
        errors: { _form: ["No autorizado"] },
        success: false,
      }
    }

    // Verificar si existe la materia
    const existingSubject = await prisma.subject.findUnique({
      where: { id },
    })

    if (!existingSubject) {
      return {
        errors: { _form: ["Materia no encontrada"] },
        success: false,
      }
    }

    // Eliminar la materia (las relaciones se eliminarán automáticamente por las restricciones de clave foránea)
    await prisma.subject.delete({
      where: { id },
    })

    // Revalidar la ruta para actualizar los datos
    revalidatePath("/dashboard/applicados/subjects")

    return {
      success: true,
    }
  } catch (error) {
    console.error("Error al eliminar materia:", error)
    return {
      errors: { _form: ["Error al eliminar la materia"] },
      success: false,
    }
  }
}

/**
 * Obtener el detalle de una materia
 */
export async function getSubjectDetail(subjectId: string) {
  try {
    // Verificar autenticación
    const session = await auth()
    if (!session) {
      return {
        errors: { _form: ["No autorizado"] },
        success: false,
      }
    }

    // Obtener el detalle de la materia
    const subjectDetail = await prisma.subjectDetail.findUnique({
      where: { subject_id: subjectId },
    })

    return {
      data: subjectDetail,
      success: true,
    }
  } catch (error) {
    console.error("Error al obtener detalle de materia:", error)
    return {
      errors: { _form: ["Error al obtener el detalle de la materia"] },
      success: false,
    }
  }
}
