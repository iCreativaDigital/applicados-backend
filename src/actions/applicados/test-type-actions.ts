"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Schema de validación para TestType
const testTypeSchema = z.object({
  name: z.string().min(1, "El nombre es requerido").max(100, "El nombre no puede tener más de 100 caracteres"),
  description: z.string().max(500, "La descripción no puede tener más de 500 caracteres").nullable().optional(),
  api_key_id: z.string().optional(),
});

// Tipo para los datos de TestType
type ZodTestTypeFormData = z.infer<typeof testTypeSchema>;

// Extender el tipo para asegurar que api_key_id pueda ser null
export type TestTypeFormData = {
  name: string;
  description: string | null;
  api_key_id: string | null;
};

// Tipo para los errores de validación
export type FormErrors = {
  name?: string[];
  description?: string[];
  _form?: string[];
};

// Tipo para la respuesta de las acciones
export type ActionResponse<T> = {
  data?: T;
  errors?: FormErrors;
  message?: string;
  success: boolean;
};

/**
 * Obtener todos los tipos de prueba
 */
export async function getTestTypes(): Promise<ActionResponse<any[]>> {
  try {
    // Verificar autenticación
    const session = await auth();
    if (!session) {
      return {
        errors: { _form: ["No autorizado"] },
        success: false,
      };
    }

    const testTypes = await prisma.testType.findMany({
      orderBy: {
        name: 'asc',
      },
      include: {
        api_key: {
          select: {
            name: true,
            app_user: {
              select: {
                company_name: true,
              },
            },
          },
        },
      },
    });

    return {
      data: testTypes,
      success: true,
    };
  } catch (error) {
    console.error("Error al obtener tipos de prueba:", error);
    return {
      errors: { _form: ["Error al obtener los tipos de prueba"] },
      success: false,
    };
  }
}

/**
 * Obtener todos los tipos de prueba por API Key
 */
export async function getTestTypesByApiKey(apiKeyId: string): Promise<ActionResponse<any[]>> {
  try {
    // Verificar si la API Key existe
    const apiKey = await prisma.apiKey.findUnique({
      where: { id: apiKeyId },
    });

    if (!apiKey) {
      return {
        errors: { _form: ["API Key no encontrada"] },
        success: false,
      };
    }

    const testTypes = await prisma.testType.findMany({
      where: {
        api_key_id: apiKeyId,
      },
      orderBy: {
        name: 'asc',
      },
      include: {
        api_key: {
          select: {
            name: true,
          },
        },
      },
    });

    return {
      data: testTypes,
      success: true,
    };
  } catch (error) {
    console.error("Error al obtener tipos de prueba por API Key:", error);
    return {
      errors: { _form: ["Error al obtener los tipos de prueba"] },
      success: false,
    };
  }
}

/**
 * Obtener un tipo de prueba por ID
 */
export async function getTestTypeById(id: string): Promise<ActionResponse<any>> {
  try {
    // Verificar autenticación
    const session = await auth();
    if (!session) {
      return {
        errors: { _form: ["No autorizado"] },
        success: false,
      };
    }

    const testType = await prisma.testType.findUnique({
      where: { id },
      include: {
        api_key: {
          select: {
            name: true,
            app_user: {
              select: {
                company_name: true,
              },
            },
          },
        },
      },
    });

    if (!testType) {
      return {
        errors: { _form: ["Tipo de prueba no encontrado"] },
        success: false,
      };
    }

    return {
      data: testType,
      success: true,
    };
  } catch (error) {
    console.error("Error al obtener tipo de prueba:", error);
    return {
      errors: { _form: ["Error al obtener el tipo de prueba"] },
      success: false,
    };
  }
}

/**
 * Crear un nuevo tipo de prueba
 */
export async function createTestType(formData: TestTypeFormData): Promise<ActionResponse<any>> {
  try {
    // Verificar autenticación
    const session = await auth();
    if (!session) {
      return {
        errors: { _form: ["No autorizado"] },
        success: false,
      };
    }

    // Validar datos
    const validationResult = testTypeSchema.safeParse(formData);
    if (!validationResult.success) {
      return {
        errors: validationResult.error.flatten().fieldErrors as FormErrors,
        success: false,
      };
    }

    const { name, description, api_key_id } = validationResult.data;

    // Si se proporciona api_key_id, verificar si existe
    if (api_key_id) {
      const apiKey = await prisma.apiKey.findUnique({
        where: { id: api_key_id },
      });

      if (!apiKey) {
        return {
          errors: { _form: ["La API Key seleccionada no existe"] },
          success: false,
        };
      }

      // Verificar si ya existe un tipo de prueba con el mismo nombre para esta API Key
      const existingTestType = await prisma.testType.findFirst({
        where: {
          name,
          api_key_id,
        },
      });

      if (existingTestType) {
        return {
          errors: { name: ["Ya existe un tipo de prueba con ese nombre para esta API Key"] },
          success: false,
        };
      }
    } else {
      // Si no se proporciona api_key_id, verificar si el nombre es único globalmente
      const existingTestType = await prisma.testType.findFirst({
        where: {
          name,
          api_key_id: null,
        },
      });

      if (existingTestType) {
        return {
          errors: { name: ["Ya existe un tipo de prueba con ese nombre"] },
          success: false,
        };
      }
    }

    // Crear el nuevo tipo de prueba
    const newTestType = await prisma.testType.create({
      data: {
        name,
        description: description || null,
        api_key_id: api_key_id || null,
      },
      include: {
        api_key: {
          select: {
            name: true,
          },
        },
      },
    });

    // Revalidar la ruta para actualizar la UI
    revalidatePath("/dashboard/applicados/test-types");

    return {
      data: newTestType,
      message: "Tipo de prueba creado correctamente",
      success: true,
    };
  } catch (error) {
    console.error("Error al crear tipo de prueba:", error);
    return {
      errors: { _form: ["Error al crear el tipo de prueba"] },
      success: false,
    };
  }
}

/**
 * Actualizar un tipo de prueba existente
 */
export async function updateTestType(id: string, formData: TestTypeFormData): Promise<ActionResponse<any>> {
  try {
    // Verificar autenticación
    const session = await auth();
    if (!session) {
      return {
        errors: { _form: ["No autorizado"] },
        success: false,
      };
    }

    // Validar datos
    const validationResult = testTypeSchema.safeParse(formData);
    if (!validationResult.success) {
      return {
        errors: validationResult.error.flatten().fieldErrors as FormErrors,
        success: false,
      };
    }

    const { name, description, api_key_id } = validationResult.data;

    // Verificar si existe el tipo de prueba
    const existingTestType = await prisma.testType.findUnique({
      where: { id },
    });

    if (!existingTestType) {
      return {
        errors: { _form: ["Tipo de prueba no encontrado"] },
        success: false,
      };
    }

    // Si se está cambiando la API Key, verificar si existe
    if (api_key_id && api_key_id !== existingTestType.api_key_id) {
      const apiKey = await prisma.apiKey.findUnique({
        where: { id: api_key_id },
      });

      if (!apiKey) {
        return {
          errors: { _form: ["La API Key seleccionada no existe"] },
          success: false,
        };
      }
    }

    // Verificar si ya existe otro tipo de prueba con el mismo nombre para la misma API Key
    const duplicateTestType = await prisma.testType.findFirst({
      where: {
        name,
        id: { not: id },
        api_key_id: api_key_id || null,
      },
    });

    if (duplicateTestType) {
      return {
        errors: { name: ["Ya existe otro tipo de prueba con ese nombre para esta API Key"] },
        success: false,
      };
    }

    // Actualizar el tipo de prueba
    const updatedTestType = await prisma.testType.update({
      where: { id },
      data: {
        name,
        description: description || null,
        api_key_id: api_key_id || null,
      },
      include: {
        api_key: {
          select: {
            name: true,
          },
        },
      },
    });

    // Revalidar la ruta para actualizar la UI
    revalidatePath("/dashboard/applicados/test-types");

    return {
      data: updatedTestType,
      message: "Tipo de prueba actualizado correctamente",
      success: true,
    };
  } catch (error) {
    console.error("Error al actualizar tipo de prueba:", error);
    return {
      errors: { _form: ["Error al actualizar el tipo de prueba"] },
      success: false,
    };
  }
}

/**
 * Eliminar un tipo de prueba
 */
export async function deleteTestType(id: string): Promise<ActionResponse<null>> {
  try {
    // Verificar autenticación
    const session = await auth();
    if (!session) {
      return {
        errors: { _form: ["No autorizado"] },
        success: false,
      };
    }

    // Verificar si existe el tipo de prueba
    const existingTestType = await prisma.testType.findUnique({
      where: { id },
    });

    if (!existingTestType) {
      return {
        errors: { _form: ["Tipo de prueba no encontrado"] },
        success: false,
      };
    }

    // Eliminar el tipo de prueba
    await prisma.testType.delete({
      where: { id },
    });

    // Revalidar la ruta para actualizar la UI
    revalidatePath("/dashboard/applicados/test-types");

    return {
      message: "Tipo de prueba eliminado correctamente",
      success: true,
    };
  } catch (error) {
    console.error("Error al eliminar tipo de prueba:", error);
    return {
      errors: { _form: ["Error al eliminar el tipo de prueba"] },
      success: false,
    };
  }
}
