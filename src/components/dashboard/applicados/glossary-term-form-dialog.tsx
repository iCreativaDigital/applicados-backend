"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { createGlossaryTerm, updateGlossaryTerm } from "@/actions/applicados/glossary-term-actions"
import { getGlossaryCategories } from "@/actions/applicados/glossary-category-actions"

// Esquema de validación
const formSchema = z.object({
  word: z.string().min(1, "La palabra es requerida"),
  description: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
  category_id: z.string().min(1, "La categoría es requerida"),
})

type FormValues = z.infer<typeof formSchema>

interface GlossaryTermFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
  initialData?: {
    id: string
    word: string
    description: string
    category_id: string
  } | null
}

export function GlossaryTermFormDialog({
  open,
  onOpenChange,
  onSuccess,
  initialData = null,
}: GlossaryTermFormDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [categories, setCategories] = useState<any[]>([])
  const [isLoadingCategories, setIsLoadingCategories] = useState(false)
  const isEditing = !!initialData

  // Configurar el formulario
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      word: initialData?.word || "",
      description: initialData?.description || "",
      category_id: initialData?.category_id || "",
    },
  })

  // Cargar categorías
  const loadCategories = async () => {
    setIsLoadingCategories(true)
    try {
      const result = await getGlossaryCategories(false) // Solo categorías activas
      if (result.success) {
        // Asegurarnos de que result.data sea un arreglo, si es undefined usamos un arreglo vacío
        const categoriesData = result.data || []
        setCategories(categoriesData)
      } else {
        toast.error("Error al cargar las categorías")
      }
    } catch (error) {
      console.error("Error al cargar categorías:", error)
      toast.error("Ha ocurrido un error inesperado")
    } finally {
      setIsLoadingCategories(false)
    }
  }

  // Cargar categorías al abrir el diálogo
  useEffect(() => {
    if (open) {
      loadCategories()
    }
  }, [open])

  // Manejar el envío del formulario
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)
    
    try {
      const formData = new FormData()
      formData.append("word", data.word)
      formData.append("description", data.description)
      formData.append("category_id", data.category_id)

      let result
      
      if (isEditing && initialData) {
        // Actualizar término existente
        result = await updateGlossaryTerm(initialData.id, formData)
      } else {
        // Crear nuevo término
        result = await createGlossaryTerm(formData)
      }

      if (result.success) {
        toast.success(
          isEditing
            ? "Término actualizado correctamente"
            : "Término creado correctamente"
        )
        form.reset()
        onOpenChange(false)
        onSuccess()
      } else {
        // Manejar errores de validación
        if (result.errors) {
          // Errores específicos de campos
          Object.entries(result.errors).forEach(([key, value]) => {
            if (key === "_form") {
              toast.error(value[0])
            } else {
              form.setError(key as any, {
                type: "manual",
                message: value[0],
              })
            }
          })
        } else {
          toast.error(
            isEditing
              ? "Error al actualizar el término"
              : "Error al crear el término"
          )
        }
      }
    } catch (error) {
      console.error("Error en el formulario:", error)
      toast.error("Ha ocurrido un error inesperado")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar término" : "Crear nuevo término"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Actualiza los detalles del término del glosario"
              : "Añade un nuevo término al glosario"}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="word"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Palabra</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Abisal" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoría</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isLoadingCategories}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una categoría" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe el término detalladamente"
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? "Guardando..."
                  : isEditing
                  ? "Actualizar"
                  : "Crear"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
