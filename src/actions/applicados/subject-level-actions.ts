"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"
import { revalidatePath } from "next/cache"

// Esquema de validación para crear/actualizar niveles de materias
const subjectLevelSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  description: z.string().optional(),
  level_number: z.coerce.number().int().min(1, "El número de nivel debe ser al menos 1"),
  difficulty: z.string().min(1, "Debe seleccionar una dificultad"),
  total_questions: z.coerce.number().int().min(0, "El número de preguntas no puede ser negativo"),
  approximate_minutes: z.coerce.number().int().min(0, "El tiempo aproximado no puede ser negativo"),
})

type SubjectLevelFormData = z.infer<typeof subjectLevelSchema>

/**
 * Obtener todos los niveles de una materia
 */
export async function getSubjectLevels(subjectId: string) {
  try {
    // Verificar autenticación
    const session = await auth()
    if (!session) {
      return {
        errors: { _form: ["No autorizado"] },
        success: false,
      }
    }

    // Obtener los niveles
    const levels = await prisma.subjectLevel.findMany({
      where: { subject_id: subjectId },
      orderBy: { order: "asc" },
    })

    return {
      data: levels,
      success: true,
    }
  } catch (error) {
    console.error("Error al obtener niveles de materia:", error)
    return {
      errors: { _form: ["Error al obtener los niveles de la materia"] },
      success: false,
    }
  }
}

/**
 * Obtener un nivel por ID
 */
export async function getSubjectLevelById(id: string) {
  try {
    // Verificar autenticación
    const session = await auth()
    if (!session) {
      return {
        errors: { _form: ["No autorizado"] },
        success: false,
      }
    }

    // Obtener el nivel
    const level = await prisma.subjectLevel.findUnique({
      where: { id },
    })

    if (!level) {
      return {
        errors: { _form: ["Nivel no encontrado"] },
        success: false,
      }
    }

    return {
      data: level,
      success: true,
    }
  } catch (error) {
    console.error("Error al obtener nivel:", error)
    return {
      errors: { _form: ["Error al obtener el nivel"] },
      success: false,
    }
  }
}

/**
 * Obtener el próximo número de nivel para una materia
 */
export async function getNextLevelNumber(subjectId: string) {
  try {
    // Verificar autenticación
    const session = await auth()
    if (!session) {
      return {
        errors: { _form: ["No autorizado"] },
        success: false,
      }
    }

    // Obtener el nivel más alto
    const highestLevel = await prisma.subjectLevel.findFirst({
      where: { subject_id: subjectId },
      orderBy: { order: "desc" },
      select: { order: true },
    })

    // Si no hay niveles, el próximo es 1, de lo contrario, incrementar en 1
    const nextLevelNumber = highestLevel ? highestLevel.order + 1 : 1

    return {
      data: { nextLevelNumber },
      success: true,
    }
  } catch (error) {
    console.error("Error al obtener próximo número de nivel:", error)
    return {
      errors: { _form: ["Error al obtener el próximo número de nivel"] },
      success: false,
    }
  }
}

/**
 * Crear un nuevo nivel para una materia
 */
export async function createSubjectLevel(subjectId: string, formData: SubjectLevelFormData) {
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
    const validationResult = subjectLevelSchema.safeParse(formData)
    if (!validationResult.success) {
      const errors = validationResult.error.flatten().fieldErrors
      return {
        errors,
        success: false,
      }
    }

    // Verificar si existe la materia
    const subject = await prisma.subject.findUnique({
      where: { id: subjectId },
    })

    if (!subject) {
      return {
        errors: { _form: ["Materia no encontrada"] },
        success: false,
      }
    }

    const {
      name,
      description,
      level_number,
      difficulty,
      total_questions,
      approximate_minutes,
    } = validationResult.data

    // Verificar si ya existe un nivel con el mismo número para esta materia
    const existingLevel = await prisma.subjectLevel.findFirst({
      where: {
        subject_id: subjectId,
        order: level_number,
      },
    })

    if (existingLevel) {
      return {
        errors: { level_number: ["Ya existe un nivel con este número para esta materia"] },
        success: false,
      }
    }

    // Crear el nivel
    const newLevel = await prisma.subjectLevel.create({
      data: {
        subject_id: subjectId,
        title: name,
        reference_title: description || "",
        order: level_number,
        number_of_questions: total_questions || 0,
        approximate_time_minutes: approximate_minutes || 0,
      },
    })

    // Revalidar la ruta para actualizar los datos
    revalidatePath(`/dashboard/applicados/subjects/${subjectId}/levels`)

    return {
      data: newLevel,
      success: true,
    }
  } catch (error) {
    console.error("Error al crear nivel:", error)
    return {
      errors: { _form: ["Error al crear el nivel"] },
      success: false,
    }
  }
}

/**
 * Actualizar un nivel existente
 */
export async function updateSubjectLevel(id: string, formData: SubjectLevelFormData) {
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
    const validationResult = subjectLevelSchema.safeParse(formData)
    if (!validationResult.success) {
      const errors = validationResult.error.flatten().fieldErrors
      return {
        errors,
        success: false,
      }
    }

    // Verificar si existe el nivel
    const existingLevel = await prisma.subjectLevel.findUnique({
      where: { id },
    })

    if (!existingLevel) {
      return {
        errors: { _form: ["Nivel no encontrado"] },
        success: false,
      }
    }

    const {
      name,
      description,
      level_number,
      difficulty,
      total_questions,
      approximate_minutes,
    } = validationResult.data

    // Verificar si ya existe otro nivel con el mismo número para esta materia
    const duplicateLevel = await prisma.subjectLevel.findFirst({
      where: {
        subject_id: existingLevel.subject_id,
        order: level_number,
        id: { not: id },
      },
    })

    if (duplicateLevel) {
      return {
        errors: { level_number: ["Ya existe otro nivel con este número para esta materia"] },
        success: false,
      }
    }

    // Actualizar el nivel
    await prisma.subjectLevel.update({
      where: { id },
      data: {
        title: name,
        reference_title: description || "",
        order: level_number,
        number_of_questions: total_questions || 0,
        approximate_time_minutes: approximate_minutes || 0,
      },
    })

    // Revalidar la ruta para actualizar los datos
    revalidatePath(`/dashboard/applicados/subjects/${existingLevel.subject_id}/levels`)

    return {
      success: true,
    }
  } catch (error) {
    console.error("Error al actualizar nivel:", error)
    return {
      errors: { _form: ["Error al actualizar el nivel"] },
      success: false,
    }
  }
}

/**
 * Eliminar un nivel
 */
export async function deleteSubjectLevel(id: string) {
  try {
    // Verificar autenticación
    const session = await auth()
    if (!session) {
      return {
        errors: { _form: ["No autorizado"] },
        success: false,
      }
    }

    // Verificar si existe el nivel
    const existingLevel = await prisma.subjectLevel.findUnique({
      where: { id },
    })

    if (!existingLevel) {
      return {
        errors: { _form: ["Nivel no encontrado"] },
        success: false,
      }
    }

    // Guardar el subject_id para revalidar la ruta después
    const subjectId = existingLevel.subject_id

    // Eliminar el nivel
    await prisma.subjectLevel.delete({
      where: { id },
    })

    // Revalidar la ruta para actualizar los datos
    revalidatePath(`/dashboard/applicados/subjects/${subjectId}/levels`)

    return {
      success: true,
    }
  } catch (error) {
    console.error("Error al eliminar nivel:", error)
    return {
      errors: { _form: ["Error al eliminar el nivel"] },
      success: false,
    }
  }
}

/**
 * Obtener todos los niveles de materia con sus materias relacionadas
 */
export async function getAllSubjectLevels() {
  try {
    // Verificar autenticación
    const session = await auth()
    if (!session) {
      return {
        errors: { _form: ["No autorizado"] },
        success: false,
      }
    }

    // Obtener todos los niveles con sus materias relacionadas
    const levels = await prisma.subjectLevel.findMany({
      include: {
        subject: true,
      },
      orderBy: [
        { subject_id: "asc" },
        { order: "asc" },
      ],
    })

    return {
      data: levels,
      success: true,
    }
  } catch (error) {
    console.error("Error al obtener niveles de materia:", error)
    return {
      errors: { _form: ["Error al obtener los niveles de materia"] },
      success: false,
    }
  }
}
