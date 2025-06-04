"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"
import { revalidatePath } from "next/cache"

// Definimos el enum QuestionType localmente para usarlo con Zod
enum QuestionType {
  MULTIPLE_CHOICE_SINGLE = "MULTIPLE_CHOICE_SINGLE",
  MULTIPLE_CHOICE_MULTIPLE = "MULTIPLE_CHOICE_MULTIPLE",
  TRUE_FALSE = "TRUE_FALSE"
}

// Esquema de validación para opciones de respuesta
const answerOptionSchema = z.object({
  id: z.string().optional(), // ID opcional para edición
  text: z.string().min(1, "El texto de la opción no puede estar vacío"),
  is_correct: z.boolean().default(false),
  order: z.number().int().min(0).optional(),
})

// Esquema de validación para crear/actualizar preguntas
const questionSchema = z.object({
  text: z.string().min(3, "El texto de la pregunta debe tener al menos 3 caracteres"),
  question_type: z.nativeEnum(QuestionType, {
    errorMap: () => ({ message: "Tipo de pregunta inválido" }),
  }),
  explanation: z.string().optional(),
  extra_info: z.string().optional(),
  points: z.coerce.number().int().min(1, "Los puntos deben ser al menos 1").default(1),
  order: z.coerce.number().int().min(0, "El orden no puede ser negativo").optional(),
  difficulty: z.coerce.number().int().min(1, "La dificultad debe ser al menos 1").max(5, "La dificultad no puede ser mayor a 5").default(1),
  tags: z.string().optional(),
  active: z.boolean().default(true),
  questionnaire_id: z.string().uuid("El ID del cuestionario debe ser un UUID válido"),
  answerOptions: z.array(answerOptionSchema).min(2, "Debe proporcionar al menos 2 opciones de respuesta"),
})

type QuestionFormData = z.infer<typeof questionSchema>

export interface QuestionState {
  errors?: {
    _form?: string[];
    [key: string]: string[] | undefined;
  };
  success: boolean;
  data?: any;
}

/**
 * Crear una nueva pregunta con sus opciones de respuesta
 */
export async function createQuestion(formData: QuestionFormData): Promise<QuestionState> {
  try {
    // Verificar autenticación
    const session = await auth()
    if (!session || !session.user || !session.user.id) {
      return {
        errors: { _form: ["No autorizado. Se requiere iniciar sesión."] },
        success: false,
      }
    }

    // Validar datos del formulario
    const validationResult = questionSchema.safeParse(formData)
    if (!validationResult.success) {
      return {
        errors: validationResult.error.flatten().fieldErrors,
        success: false,
      }
    }

    const {
      text,
      question_type,
      explanation,
      extra_info,
      points,
      order,
      difficulty,
      tags,
      active,
      questionnaire_id,
      answerOptions,
    } = validationResult.data

    // Verificar que el cuestionario existe
    const questionnaire = await prisma.questionnaire.findUnique({
      where: { id: questionnaire_id },
    })

    if (!questionnaire) {
      return {
        errors: { questionnaire_id: ["El cuestionario seleccionado no existe."] },
        success: false,
      }
    }

    // Validar que al menos una opción esté marcada como correcta
    const hasCorrectOption = answerOptions.some(option => option.is_correct)
    if (!hasCorrectOption) {
      return {
        errors: { answerOptions: ["Al menos una opción debe ser marcada como correcta."] },
        success: false,
      }
    }

    // Para preguntas de tipo MULTIPLE_CHOICE_SINGLE, verificar que solo una opción sea correcta
    if (question_type === "MULTIPLE_CHOICE_SINGLE") {
      const correctOptionsCount = answerOptions.filter(option => option.is_correct).length
      if (correctOptionsCount > 1) {
        return {
          errors: { answerOptions: ["Solo una opción puede ser correcta para preguntas de opción múltiple con respuesta única."] },
          success: false,
        }
      }
    }

    // Para preguntas de tipo TRUE_FALSE, verificar que solo hay 2 opciones
    if (question_type === "TRUE_FALSE" && answerOptions.length !== 2) {
      return {
        errors: { answerOptions: ["Las preguntas de verdadero/falso deben tener exactamente 2 opciones."] },
        success: false,
      }
    }

    // Determinar el próximo orden si no se proporciona
    let nextOrder = order
    if (nextOrder === undefined) {
      const highestOrder = await prisma.question.findFirst({
        where: { questionnaire_id },
        orderBy: { order: "desc" },
        select: { order: true },
      })
      nextOrder = highestOrder && highestOrder.order !== null ? highestOrder.order + 1 : 0
    }

    // Crear la pregunta con sus opciones de respuesta en una transacción
    const newQuestion = await prisma.$transaction(async (tx) => {
      // Crear la pregunta
      const question = await tx.question.create({
        data: {
          text,
          question_type,
          explanation,
          extra_info,
          points,
          order: nextOrder,
          difficulty,
          tags,
          active,
          questionnaire_id,
        },
      })

      // Crear las opciones de respuesta
      const answerOptionsData = answerOptions.map((option, index) => ({
        text: option.text,
        is_correct: option.is_correct,
        order: option.order !== undefined ? option.order : index,
        question_id: question.id,
      }))

      await tx.answerOption.createMany({
        data: answerOptionsData,
      })

      // Devolver la pregunta con sus opciones
      return await tx.question.findUnique({
        where: { id: question.id },
        include: {
          answerOptions: {
            orderBy: { order: "asc" },
          },
        },
      })
    })

    // Revalidar la ruta para actualizar la lista de preguntas
    revalidatePath(`/dashboard/applicados/questionnaires/${questionnaire_id}/questions`)

    return {
      success: true,
      data: newQuestion,
    }
  } catch (error) {
    console.error("Error al crear la pregunta:", error)
    return {
      errors: { _form: ["Ocurrió un error inesperado al crear la pregunta."] },
      success: false,
    }
  }
}

/**
 * Obtener una pregunta por su ID
 */
export async function getQuestionById(id: string): Promise<QuestionState> {
  try {
    // Verificar autenticación
    const session = await auth()
    if (!session || !session.user || !session.user.id) {
      return {
        errors: { _form: ["No autorizado. Se requiere iniciar sesión."] },
        success: false,
      }
    }

    // Obtener la pregunta con sus opciones de respuesta
    const question = await prisma.question.findUnique({
      where: { id },
      include: {
        answerOptions: {
          orderBy: { order: "asc" },
        },
        questionnaire: true,
      },
    })

    if (!question) {
      return {
        errors: { _form: ["Pregunta no encontrada"] },
        success: false,
      }
    }

    return {
      success: true,
      data: question,
    }
  } catch (error) {
    console.error("Error al obtener la pregunta:", error)
    return {
      errors: { _form: ["Error al obtener la pregunta"] },
      success: false,
    }
  }
}

/**
 * Obtener todas las preguntas de un cuestionario
 */
export async function getQuestionsByQuestionnaire(questionnaireId: string): Promise<QuestionState> {
  try {
    // Verificar autenticación
    const session = await auth()
    if (!session || !session.user || !session.user.id) {
      return {
        errors: { _form: ["No autorizado. Se requiere iniciar sesión."] },
        success: false,
      }
    }

    // Verificar que el cuestionario existe
    const questionnaire = await prisma.questionnaire.findUnique({
      where: { id: questionnaireId },
    })

    if (!questionnaire) {
      return {
        errors: { _form: ["Cuestionario no encontrado"] },
        success: false,
      }
    }

    // Obtener todas las preguntas del cuestionario con sus opciones de respuesta
    const questions = await prisma.question.findMany({
      where: { questionnaire_id: questionnaireId },
      include: {
        answerOptions: {
          orderBy: { order: "asc" },
        },
      },
      orderBy: { order: "asc" },
    })

    return {
      success: true,
      data: questions,
    }
  } catch (error) {
    console.error("Error al obtener las preguntas:", error)
    return {
      errors: { _form: ["Error al obtener las preguntas"] },
      success: false,
    }
  }
}

/**
 * Actualizar una pregunta existente
 */
export async function updateQuestion(id: string, formData: QuestionFormData): Promise<QuestionState> {
  try {
    // Verificar autenticación
    const session = await auth()
    if (!session || !session.user || !session.user.id) {
      return {
        errors: { _form: ["No autorizado. Se requiere iniciar sesión."] },
        success: false,
      }
    }

    // Validar datos del formulario
    const validationResult = questionSchema.safeParse(formData)
    if (!validationResult.success) {
      return {
        errors: validationResult.error.flatten().fieldErrors,
        success: false,
      }
    }

    const {
      text,
      question_type,
      explanation,
      extra_info,
      points,
      order,
      difficulty,
      tags,
      active,
      questionnaire_id,
      answerOptions,
    } = validationResult.data

    // Verificar que la pregunta existe
    const existingQuestion = await prisma.question.findUnique({
      where: { id },
      include: {
        answerOptions: true,
      },
    })

    if (!existingQuestion) {
      return {
        errors: { _form: ["Pregunta no encontrada"] },
        success: false,
      }
    }

    // Verificar que el cuestionario existe
    const questionnaire = await prisma.questionnaire.findUnique({
      where: { id: questionnaire_id },
    })

    if (!questionnaire) {
      return {
        errors: { questionnaire_id: ["El cuestionario seleccionado no existe."] },
        success: false,
      }
    }

    // Validar que al menos una opción esté marcada como correcta
    const hasCorrectOption = answerOptions.some(option => option.is_correct)
    if (!hasCorrectOption) {
      return {
        errors: { answerOptions: ["Al menos una opción debe ser marcada como correcta."] },
        success: false,
      }
    }

    // Para preguntas de tipo MULTIPLE_CHOICE_SINGLE, verificar que solo una opción sea correcta
    if (question_type === "MULTIPLE_CHOICE_SINGLE") {
      const correctOptionsCount = answerOptions.filter(option => option.is_correct).length
      if (correctOptionsCount > 1) {
        return {
          errors: { answerOptions: ["Solo una opción puede ser correcta para preguntas de opción múltiple con respuesta única."] },
          success: false,
        }
      }
    }

    // Para preguntas de tipo TRUE_FALSE, verificar que solo hay 2 opciones
    if (question_type === "TRUE_FALSE" && answerOptions.length !== 2) {
      return {
        errors: { answerOptions: ["Las preguntas de verdadero/falso deben tener exactamente 2 opciones."] },
        success: false,
      }
    }

    // Actualizar la pregunta y sus opciones de respuesta en una transacción
    const updatedQuestion = await prisma.$transaction(async (tx) => {
      // Actualizar la pregunta
      const question = await tx.question.update({
        where: { id },
        data: {
          text,
          question_type,
          explanation,
          extra_info,
          points,
          order,
          difficulty,
          tags,
          active,
          questionnaire_id,
        },
      })

      // Mapear las opciones existentes por ID
      const existingOptionsMap = new Map(existingQuestion.answerOptions.map(opt => [opt.id, opt]))
      
      // Identificar opciones a crear, actualizar y eliminar
      const optionsToCreate: any[] = []
      const optionsToUpdate: any[] = []
      
      answerOptions.forEach((option, index) => {
        if (option.id) {
          // Opción existente a actualizar
          optionsToUpdate.push({
            id: option.id,
            text: option.text,
            is_correct: option.is_correct,
            order: option.order !== undefined ? option.order : index,
          })
          existingOptionsMap.delete(option.id)
        } else {
          // Nueva opción a crear
          optionsToCreate.push({
            text: option.text,
            is_correct: option.is_correct,
            order: option.order !== undefined ? option.order : index,
            question_id: id,
          })
        }
      })
      
      // IDs de opciones a eliminar (las que quedaron en el mapa)
      const optionsToDeleteIds = Array.from(existingOptionsMap.keys())
      
      // Eliminar opciones que ya no existen
      if (optionsToDeleteIds.length > 0) {
        await tx.answerOption.deleteMany({
          where: {
            id: { in: optionsToDeleteIds },
          },
        })
      }
      
      // Crear nuevas opciones
      if (optionsToCreate.length > 0) {
        await tx.answerOption.createMany({
          data: optionsToCreate,
        })
      }
      
      // Actualizar opciones existentes
      for (const option of optionsToUpdate) {
        await tx.answerOption.update({
          where: { id: option.id },
          data: {
            text: option.text,
            is_correct: option.is_correct,
            order: option.order,
          },
        })
      }
      
      // Devolver la pregunta actualizada con sus opciones
      return await tx.question.findUnique({
        where: { id },
        include: {
          answerOptions: {
            orderBy: { order: "asc" },
          },
        },
      })
    })

    // Revalidar la ruta para actualizar la lista de preguntas
    revalidatePath(`/dashboard/applicados/questionnaires/${questionnaire_id}/questions`)

    return {
      success: true,
      data: updatedQuestion,
    }
  } catch (error) {
    console.error("Error al actualizar la pregunta:", error)
    return {
      errors: { _form: ["Ocurrió un error inesperado al actualizar la pregunta."] },
      success: false,
    }
  }
}

/**
 * Eliminar una pregunta
 */
export async function deleteQuestion(id: string): Promise<QuestionState> {
  try {
    // Verificar autenticación
    const session = await auth()
    if (!session || !session.user || !session.user.id) {
      return {
        errors: { _form: ["No autorizado. Se requiere iniciar sesión."] },
        success: false,
      }
    }

    // Verificar que la pregunta existe
    const question = await prisma.question.findUnique({
      where: { id },
      include: {
        questionnaire: true,
        userAnswers: {
          take: 1, // Solo necesitamos saber si hay alguna respuesta
        },
      },
    })

    if (!question) {
      return {
        errors: { _form: ["Pregunta no encontrada"] },
        success: false,
      }
    }

    // Verificar si la pregunta tiene respuestas de usuarios
    if (question.userAnswers.length > 0) {
      return {
        errors: { _form: ["No se puede eliminar la pregunta porque tiene respuestas de usuarios."] },
        success: false,
      }
    }

    // Eliminar la pregunta (las opciones de respuesta se eliminarán en cascada)
    await prisma.question.delete({
      where: { id },
    })

    // Revalidar la ruta para actualizar la lista de preguntas
    revalidatePath(`/dashboard/applicados/questionnaires/${question.questionnaire_id}/questions`)

    return {
      success: true,
    }
  } catch (error) {
    console.error("Error al eliminar la pregunta:", error)
    return {
      errors: { _form: ["Ocurrió un error inesperado al eliminar la pregunta."] },
      success: false,
    }
  }
}
