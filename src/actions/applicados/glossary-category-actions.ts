"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

// Esquema de validación para crear/actualizar categorías
const glossaryCategorySchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  description: z.string().optional(),
})

/**
 * Obtener todas las categorías del glosario
 */
export async function getGlossaryCategories(includeInactive = false) {
  try {
    // Verificar autenticación
    const session = await auth()
    if (!session) {
      return {
        errors: { _form: ["No autorizado"] },
        success: false,
      }
    }

    // Construir la consulta
    const whereClause = includeInactive ? {} : { active: true }

    // Obtener las categorías
    const categories = await prisma.glossaryCategory.findMany({
      where: whereClause,
      orderBy: { name: "asc" },
      include: {
        _count: {
          select: { terms: true }
        }
      }
    })

    return {
      data: categories,
      success: true,
    }
  } catch (error) {
    console.error("Error al obtener categorías del glosario:", error)
    return {
      errors: { _form: ["Error al obtener las categorías del glosario"] },
      success: false,
    }
  }
}

/**
 * Obtener una categoría del glosario por su ID
 */
export async function getGlossaryCategoryById(id: string) {
  try {
    // Verificar autenticación
    const session = await auth()
    if (!session) {
      return {
        errors: { _form: ["No autorizado"] },
        success: false,
      }
    }

    // Obtener la categoría
    const category = await prisma.glossaryCategory.findUnique({
      where: { id },
      include: {
        terms: {
          where: { active: true },
          orderBy: { word: "asc" }
        },
        _count: {
          select: { terms: true }
        }
      }
    })

    if (!category) {
      return {
        errors: { _form: ["Categoría no encontrada"] },
        success: false,
      }
    }

    return {
      data: category,
      success: true,
    }
  } catch (error) {
    console.error("Error al obtener categoría del glosario:", error)
    return {
      errors: { _form: ["Error al obtener la categoría del glosario"] },
      success: false,
    }
  }
}

/**
 * Crear una nueva categoría del glosario
 */
export async function createGlossaryCategory(formData: FormData) {
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
    const name = formData.get("name") as string
    const description = formData.get("description") as string

    const validatedFields = glossaryCategorySchema.safeParse({
      name,
      description,
    })

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        success: false,
      }
    }

    // Verificar si ya existe una categoría con el mismo nombre
    const existingCategory = await prisma.glossaryCategory.findFirst({
      where: { name: validatedFields.data.name }
    })

    if (existingCategory) {
      return {
        errors: { name: ["Ya existe una categoría con este nombre"] },
        success: false,
      }
    }

    // Crear la categoría
    const category = await prisma.glossaryCategory.create({
      data: {
        name: validatedFields.data.name,
        description: validatedFields.data.description,
      }
    })

    return {
      data: category,
      success: true,
    }
  } catch (error) {
    console.error("Error al crear categoría del glosario:", error)
    return {
      errors: { _form: ["Error al crear la categoría del glosario"] },
      success: false,
    }
  }
}

/**
 * Actualizar una categoría del glosario
 */
export async function updateGlossaryCategory(id: string, formData: FormData) {
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
    const name = formData.get("name") as string
    const description = formData.get("description") as string

    const validatedFields = glossaryCategorySchema.safeParse({
      name,
      description,
    })

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        success: false,
      }
    }

    // Verificar si existe la categoría
    const existingCategory = await prisma.glossaryCategory.findUnique({
      where: { id }
    })

    if (!existingCategory) {
      return {
        errors: { _form: ["Categoría no encontrada"] },
        success: false,
      }
    }

    // Verificar si ya existe otra categoría con el mismo nombre
    const duplicateCategory = await prisma.glossaryCategory.findFirst({
      where: { 
        name: validatedFields.data.name,
        id: { not: id }
      }
    })

    if (duplicateCategory) {
      return {
        errors: { name: ["Ya existe otra categoría con este nombre"] },
        success: false,
      }
    }

    // Actualizar la categoría
    const category = await prisma.glossaryCategory.update({
      where: { id },
      data: {
        name: validatedFields.data.name,
        description: validatedFields.data.description,
      }
    })

    return {
      data: category,
      success: true,
    }
  } catch (error) {
    console.error("Error al actualizar categoría del glosario:", error)
    return {
      errors: { _form: ["Error al actualizar la categoría del glosario"] },
      success: false,
    }
  }
}

/**
 * Desactivar una categoría del glosario
 */
export async function deactivateGlossaryCategory(id: string) {
  try {
    // Verificar autenticación
    const session = await auth()
    if (!session) {
      return {
        errors: { _form: ["No autorizado"] },
        success: false,
      }
    }

    // Verificar si existe la categoría
    const existingCategory = await prisma.glossaryCategory.findUnique({
      where: { id },
      include: {
        _count: {
          select: { terms: true }
        }
      }
    })

    if (!existingCategory) {
      return {
        errors: { _form: ["Categoría no encontrada"] },
        success: false,
      }
    }

    // Verificar si tiene términos asociados
    if (existingCategory._count.terms > 0) {
      return {
        errors: { _form: ["No se puede desactivar una categoría con términos asociados"] },
        success: false,
      }
    }

    // Desactivar la categoría
    await prisma.glossaryCategory.update({
      where: { id },
      data: { active: false }
    })

    return {
      success: true,
    }
  } catch (error) {
    console.error("Error al desactivar categoría del glosario:", error)
    return {
      errors: { _form: ["Error al desactivar la categoría del glosario"] },
      success: false,
    }
  }
}

/**
 * Activar una categoría del glosario
 */
export async function activateGlossaryCategory(id: string) {
  try {
    // Verificar autenticación
    const session = await auth()
    if (!session) {
      return {
        errors: { _form: ["No autorizado"] },
        success: false,
      }
    }

    // Verificar si existe la categoría
    const existingCategory = await prisma.glossaryCategory.findUnique({
      where: { id }
    })

    if (!existingCategory) {
      return {
        errors: { _form: ["Categoría no encontrada"] },
        success: false,
      }
    }

    // Activar la categoría
    await prisma.glossaryCategory.update({
      where: { id },
      data: { active: true }
    })

    return {
      success: true,
    }
  } catch (error) {
    console.error("Error al activar categoría del glosario:", error)
    return {
      errors: { _form: ["Error al activar la categoría del glosario"] },
      success: false,
    }
  }
}
