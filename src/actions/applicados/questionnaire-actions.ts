"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"
import { revalidatePath } from "next/cache"

// Esquema de validación para crear un cuestionario
const questionnaireSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  description: z.string().optional(),
  order: z.coerce.number().int().min(0, "El orden no puede ser negativo").optional(),
  published: z.boolean().optional().default(false),
  subject_level_id: z.string().uuid("El ID del nivel de materia debe ser un UUID válido"),
  // api_key_id se podría añadir aquí si se pasa explícitamente,
  // o se valida a través del subject_level_id
});

type QuestionnaireFormData = z.infer<typeof questionnaireSchema>;

export interface CreateQuestionnaireState {
  errors?: {
    name?: string[];
    description?: string[];
    order?: string[];
    published?: string[];
    subject_level_id?: string[];
    _form?: string[]; // Errores generales del formulario
  };
  success: boolean;
  data?: {
    id: string;
    name: string;
  } | null;
}

/**
 * Crear un nuevo Cuestionario
 */
export interface QuestionnaireState {
  errors?: {
    _form?: string[];
    [key: string]: string[] | undefined;
  };
  success: boolean;
  data?: any;
}

export async function createQuestionnaire(
  formData: QuestionnaireFormData
): Promise<CreateQuestionnaireState> {
  try {
    // 1. Verificar autenticación (asumiendo que esto es para un panel de admin)
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      return {
        errors: { _form: ["No autorizado. Se requiere iniciar sesión."] },
        success: false,
      };
    }
    
    // TODO: Si aplica, verificar que el usuario tenga el rol/permiso adecuado.

    // 2. Validar datos del formulario
    const validationResult = questionnaireSchema.safeParse(formData);
    if (!validationResult.success) {
      return {
        errors: validationResult.error.flatten().fieldErrors,
        success: false,
      };
    }

    const { name, description, order, published, subject_level_id } = validationResult.data;

    // 3. Verificar que el SubjectLevel exista y pertenezca a la ApiKey del usuario (si aplica)
    // Esta lógica depende de cómo gestiones las ApiKeys y los permisos.
    // Por ahora, solo verificaremos que el SubjectLevel exista.
    const subjectLevel = await prisma.subjectLevel.findUnique({
      where: { id: subject_level_id },
      include: { subject: true } // Incluir Subject para acceder a su api_key_id si es necesario
    });

    if (!subjectLevel) {
      return {
        errors: { subject_level_id: ["El nivel de materia seleccionado no existe."] },
        success: false,
      };
    }
    
    // TODO: Aquí iría la validación de la ApiKey si subjectLevel.subject.api_key_id 
    // debe coincidir con alguna ApiKey gestionada por session.user.
    // Ejemplo: if (subjectLevel.subject.api_key_id !== session.user.managedApiKeyId) { ... error ... }

    // 4. Crear el cuestionario en la base de datos
    const newQuestionnaire = await prisma.questionnaire.create({
      data: {
        name,
        description,
        order,
        published,
        subject_level_id,
        // created_at y updated_at se manejan automáticamente por Prisma
      },
      select: { // Seleccionar solo los campos necesarios para la respuesta
        id: true,
        name: true,
      }
    });

    // 5. Revalidar la ruta (si tienes una página que lista cuestionarios)
    // Ajusta la ruta según sea necesario
    revalidatePath("/dashboard/subject-levels/" + subject_level_id); // O una ruta más general de cuestionarios
    revalidatePath("/dashboard/questionnaires"); // Si tienes una lista general

    return {
      success: true,
      data: newQuestionnaire,
    };

  } catch (error: unknown) {
    console.error("Error al crear el cuestionario:", error);
    // Manejo de errores específicos de Prisma (ej. unique constraint)
    if (error && typeof error === 'object' && 'code' in error) {
      // Verificamos si es un error de Prisma con código P2002 (unique constraint)
      if (error.code === 'P2002') {
        return {
          errors: { name: ["Ya existe un cuestionario con este nombre para el nivel seleccionado."] },
          success: false,
        };
      }
    }
    return {
      errors: { _form: ["Ocurrió un error inesperado al crear el cuestionario."] },
      success: false,
    };
  }
}

/**
 * Obtener un cuestionario por ID
 */
export async function getQuestionnaireById(id: string): Promise<QuestionnaireState> {
  try {
    // Verificar autenticación
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      return {
        errors: { _form: ["No autorizado. Se requiere iniciar sesión."] },
        success: false,
      };
    }

    // Obtener el cuestionario
    const questionnaire = await prisma.questionnaire.findUnique({
      where: { id },
      include: {
        subjectLevel: {
          include: {
            subject: true,
          },
        },
        questions: {
          include: {
            answerOptions: true,
          },
          orderBy: {
            order: "asc",
          },
        },
        _count: {
          select: {
            questions: true,
            userAttempts: true,
          },
        },
      },
    });

    if (!questionnaire) {
      return {
        errors: { _form: ["Cuestionario no encontrado"] },
        success: false,
      };
    }

    // TODO: Verificar permisos de API Key si es necesario
    // if (questionnaire.subjectLevel.subject.api_key_id !== session.user.managedApiKeyId) { ... }

    return {
      data: questionnaire,
      success: true,
    };
  } catch (error: unknown) {
    console.error("Error al obtener cuestionario:", error);
    return {
      errors: { _form: ["Error al obtener el cuestionario"] },
      success: false,
    };
  }
}

/**
 * Obtener todos los cuestionarios con filtros opcionales
 */
export async function getQuestionnaires(
  subjectLevelId?: string,
  apiKeyId?: string
): Promise<QuestionnaireState> {
  try {
    // Verificar autenticación
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      return {
        errors: { _form: ["No autorizado. Se requiere iniciar sesión."] },
        success: false,
      };
    }

    // Construir la consulta base
    let whereClause: any = {};

    // Filtrar por nivel de materia si se proporciona
    if (subjectLevelId) {
      whereClause.subject_level_id = subjectLevelId;
    }

    // Filtrar por API Key si se proporciona (requiere incluir la relación con Subject)
    if (apiKeyId) {
      whereClause.subjectLevel = {
        subject: {
          api_key_id: apiKeyId,
        },
      };
    }

    // Obtener los cuestionarios
    const questionnaires = await prisma.questionnaire.findMany({
      where: whereClause,
      include: {
        subjectLevel: {
          include: {
            subject: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        _count: {
          select: {
            questions: true,
          },
        },
      },
      orderBy: [
        { subject_level_id: "asc" },
        { order: "asc" },
      ],
    });

    return {
      data: questionnaires,
      success: true,
    };
  } catch (error: unknown) {
    console.error("Error al obtener cuestionarios:", error);
    return {
      errors: { _form: ["Error al obtener los cuestionarios"] },
      success: false,
    };
  }
}

/**
 * Actualizar un cuestionario existente
 */
export async function updateQuestionnaire(
  id: string,
  formData: QuestionnaireFormData
): Promise<QuestionnaireState> {
  try {
    // Verificar autenticación
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      return {
        errors: { _form: ["No autorizado. Se requiere iniciar sesión."] },
        success: false,
      };
    }

    // Validar datos del formulario
    const validationResult = questionnaireSchema.safeParse(formData);
    if (!validationResult.success) {
      return {
        errors: validationResult.error.flatten().fieldErrors,
        success: false,
      };
    }

    const { name, description, order, published, subject_level_id } = validationResult.data;

    // Verificar que el cuestionario existe
    const existingQuestionnaire = await prisma.questionnaire.findUnique({
      where: { id },
      include: {
        subjectLevel: {
          include: {
            subject: true,
          },
        },
      },
    });

    if (!existingQuestionnaire) {
      return {
        errors: { _form: ["Cuestionario no encontrado"] },
        success: false,
      };
    }

    // Verificar que el SubjectLevel existe si se está cambiando
    if (subject_level_id !== existingQuestionnaire.subject_level_id) {
      const subjectLevel = await prisma.subjectLevel.findUnique({
        where: { id: subject_level_id },
        include: { subject: true },
      });

      if (!subjectLevel) {
        return {
          errors: { subject_level_id: ["El nivel de materia seleccionado no existe."] },
          success: false,
        };
      }

      // TODO: Verificar permisos de API Key si es necesario
      // if (subjectLevel.subject.api_key_id !== session.user.managedApiKeyId) { ... }
    }

    // Actualizar el cuestionario
    const updatedQuestionnaire = await prisma.questionnaire.update({
      where: { id },
      data: {
        name,
        description,
        order,
        published,
        subject_level_id,
      },
      select: {
        id: true,
        name: true,
      },
    });

    // Revalidar rutas
    revalidatePath("/dashboard/subject-levels/" + subject_level_id);
    revalidatePath("/dashboard/questionnaires");
    revalidatePath("/dashboard/questionnaires/" + id);

    return {
      success: true,
      data: updatedQuestionnaire,
    };
  } catch (error: unknown) {
    console.error("Error al actualizar el cuestionario:", error);
    // Manejo de errores específicos de Prisma
    if (error && typeof error === 'object' && 'code' in error) {
      // Verificamos si es un error de Prisma con código P2002 (unique constraint)
      if (error.code === 'P2002') {
        return {
          errors: { name: ["Ya existe un cuestionario con este nombre para el nivel seleccionado."] },
          success: false,
        };
      }
    }
    return {
      errors: { _form: ["Ocurrió un error inesperado al actualizar el cuestionario."] },
      success: false,
    };
  }
}

/**
 * Eliminar un cuestionario
 */
export async function deleteQuestionnaire(id: string): Promise<QuestionnaireState> {
  try {
    // Verificar autenticación
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      return {
        errors: { _form: ["No autorizado. Se requiere iniciar sesión."] },
        success: false,
      };
    }

    // Verificar que el cuestionario existe
    const existingQuestionnaire = await prisma.questionnaire.findUnique({
      where: { id },
      include: {
        subjectLevel: {
          include: {
            subject: true,
          },
        },
      },
    });

    if (!existingQuestionnaire) {
      return {
        errors: { _form: ["Cuestionario no encontrado"] },
        success: false,
      };
    }

    // TODO: Verificar permisos de API Key si es necesario
    // if (existingQuestionnaire.subjectLevel.subject.api_key_id !== session.user.managedApiKeyId) { ... }

    // Verificar si hay intentos de usuarios asociados a este cuestionario
    const userAttemptsCount = await prisma.userQuestionnaireAttempt.count({
      where: { questionnaire_id: id },
    });

    if (userAttemptsCount > 0) {
      return {
        errors: { _form: ["No se puede eliminar un cuestionario que ya tiene intentos de usuarios."] },
        success: false,
      };
    }

    // Eliminar el cuestionario (esto también eliminará las preguntas y opciones de respuesta en cascada)
    await prisma.questionnaire.delete({
      where: { id },
    });

    // Revalidar rutas
    revalidatePath("/dashboard/subject-levels/" + existingQuestionnaire.subject_level_id);
    revalidatePath("/dashboard/questionnaires");

    return {
      success: true,
      data: { id, deleted: true },
    };
  } catch (error: unknown) {
    console.error("Error al eliminar el cuestionario:", error);
    return {
      errors: { _form: ["Ocurrió un error inesperado al eliminar el cuestionario."] },
      success: false,
    };
  }
}
