"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

// Esquema de validación para crear/actualizar términos
const glossaryTermSchema = z.object({
  word: z.string().min(1, "La palabra es requerida"),
  description: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
  category_id: z.string().min(1, "La categoría es requerida"),
})

/**
 * Obtener todos los términos del glosario
 */
export async function getGlossaryTerms(includeInactive = false) {
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

    // Obtener los términos
    const terms = await prisma.glossaryTerm.findMany({
      where: whereClause,
      orderBy: { word: "asc" },
      include: {
        category: true
      }
    })

    return {
      data: terms,
      success: true,
    }
  } catch (error) {
    console.error("Error al obtener términos del glosario:", error)
    return {
      errors: { _form: ["Error al obtener los términos del glosario"] },
      success: false,
    }
  }
}

/**
 * Obtener un término del glosario por su ID
 */
export async function getGlossaryTermById(id: string) {
  try {
    // Verificar autenticación
    const session = await auth()
    if (!session) {
      return {
        errors: { _form: ["No autorizado"] },
        success: false,
      }
    }

    // Obtener el término
    const term = await prisma.glossaryTerm.findUnique({
      where: { id },
      include: {
        category: true
      }
    })

    if (!term) {
      return {
        errors: { _form: ["Término no encontrado"] },
        success: false,
      }
    }

    return {
      data: term,
      success: true,
    }
  } catch (error) {
    console.error("Error al obtener término del glosario:", error)
    return {
      errors: { _form: ["Error al obtener el término del glosario"] },
      success: false,
    }
  }
}

/**
 * Crear un nuevo término del glosario
 */
export async function createGlossaryTerm(formData: FormData) {
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
    const word = formData.get("word") as string
    const description = formData.get("description") as string
    const category_id = formData.get("category_id") as string

    const validatedFields = glossaryTermSchema.safeParse({
      word,
      description,
      category_id,
    })

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        success: false,
      }
    }

    // Verificar si ya existe un término con la misma palabra
    const existingTerm = await prisma.glossaryTerm.findFirst({
      where: { word: validatedFields.data.word }
    })

    if (existingTerm) {
      return {
        errors: { word: ["Ya existe un término con esta palabra"] },
        success: false,
      }
    }

    // Verificar si existe la categoría
    const category = await prisma.glossaryCategory.findUnique({
      where: { id: validatedFields.data.category_id }
    })

    if (!category) {
      return {
        errors: { category_id: ["Categoría no encontrada"] },
        success: false,
      }
    }

    if (!category.active) {
      return {
        errors: { category_id: ["La categoría seleccionada está inactiva"] },
        success: false,
      }
    }

    // Crear el término
    const term = await prisma.glossaryTerm.create({
      data: {
        word: validatedFields.data.word,
        description: validatedFields.data.description,
        category_id: validatedFields.data.category_id,
      },
      include: {
        category: true
      }
    })

    return {
      data: term,
      success: true,
    }
  } catch (error) {
    console.error("Error al crear término del glosario:", error)
    return {
      errors: { _form: ["Error al crear el término del glosario"] },
      success: false,
    }
  }
}

/**
 * Actualizar un término del glosario
 */
export async function updateGlossaryTerm(id: string, formData: FormData) {
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
    const word = formData.get("word") as string
    const description = formData.get("description") as string
    const category_id = formData.get("category_id") as string

    const validatedFields = glossaryTermSchema.safeParse({
      word,
      description,
      category_id,
    })

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        success: false,
      }
    }

    // Verificar si existe el término
    const existingTerm = await prisma.glossaryTerm.findUnique({
      where: { id }
    })

    if (!existingTerm) {
      return {
        errors: { _form: ["Término no encontrado"] },
        success: false,
      }
    }

    // Verificar si ya existe otro término con la misma palabra
    const duplicateTerm = await prisma.glossaryTerm.findFirst({
      where: { 
        word: validatedFields.data.word,
        id: { not: id }
      }
    })

    if (duplicateTerm) {
      return {
        errors: { word: ["Ya existe otro término con esta palabra"] },
        success: false,
      }
    }

    // Verificar si existe la categoría
    const category = await prisma.glossaryCategory.findUnique({
      where: { id: validatedFields.data.category_id }
    })

    if (!category) {
      return {
        errors: { category_id: ["Categoría no encontrada"] },
        success: false,
      }
    }

    if (!category.active) {
      return {
        errors: { category_id: ["La categoría seleccionada está inactiva"] },
        success: false,
      }
    }

    // Actualizar el término
    const term = await prisma.glossaryTerm.update({
      where: { id },
      data: {
        word: validatedFields.data.word,
        description: validatedFields.data.description,
        category_id: validatedFields.data.category_id,
      },
      include: {
        category: true
      }
    })

    return {
      data: term,
      success: true,
    }
  } catch (error) {
    console.error("Error al actualizar término del glosario:", error)
    return {
      errors: { _form: ["Error al actualizar el término del glosario"] },
      success: false,
    }
  }
}

/**
 * Desactivar un término del glosario
 */
export async function deactivateGlossaryTerm(id: string) {
  try {
    // Verificar autenticación
    const session = await auth()
    if (!session) {
      return {
        errors: { _form: ["No autorizado"] },
        success: false,
      }
    }

    // Verificar si existe el término
    const existingTerm = await prisma.glossaryTerm.findUnique({
      where: { id }
    })

    if (!existingTerm) {
      return {
        errors: { _form: ["Término no encontrado"] },
        success: false,
      }
    }

    // Desactivar el término
    await prisma.glossaryTerm.update({
      where: { id },
      data: { active: false }
    })

    return {
      success: true,
    }
  } catch (error) {
    console.error("Error al desactivar término del glosario:", error)
    return {
      errors: { _form: ["Error al desactivar el término del glosario"] },
      success: false,
    }
  }
}

/**
 * Activar un término del glosario
 */
export async function activateGlossaryTerm(id: string) {
  try {
    // Verificar autenticación
    const session = await auth()
    if (!session) {
      return {
        errors: { _form: ["No autorizado"] },
        success: false,
      }
    }

    // Verificar si existe el término
    const existingTerm = await prisma.glossaryTerm.findUnique({
      where: { id },
      include: {
        category: true
      }
    })

    if (!existingTerm) {
      return {
        errors: { _form: ["Término no encontrado"] },
        success: false,
      }
    }

    // Verificar si la categoría está activa
    if (!existingTerm.category.active) {
      return {
        errors: { _form: ["No se puede activar un término cuya categoría está inactiva"] },
        success: false,
      }
    }

    // Activar el término
    await prisma.glossaryTerm.update({
      where: { id },
      data: { active: true }
    })

    return {
      success: true,
    }
  } catch (error) {
    console.error("Error al activar término del glosario:", error)
    return {
      errors: { _form: ["Error al activar el término del glosario"] },
      success: false,
    }
  }
}
