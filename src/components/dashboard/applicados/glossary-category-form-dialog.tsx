"use client"

import { useState } from "react"
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
import { createGlossaryCategory, updateGlossaryCategory } from "@/actions/applicados/glossary-category-actions"

// Esquema de validación
const formSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  description: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

interface GlossaryCategoryFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
  initialData?: {
    id: string
    name: string
    description?: string | null
  } | null
}

export function GlossaryCategoryFormDialog({
  open,
  onOpenChange,
  onSuccess,
  initialData = null,
}: GlossaryCategoryFormDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isEditing = !!initialData

  // Configurar el formulario
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
    },
  })

  // Manejar el envío del formulario
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)
    
    try {
      const formData = new FormData()
      formData.append("name", data.name)
      if (data.description) {
        formData.append("description", data.description)
      }

      let result
      
      if (isEditing && initialData) {
        // Actualizar categoría existente
        result = await updateGlossaryCategory(initialData.id, formData)
      } else {
        // Crear nueva categoría
        result = await createGlossaryCategory(formData)
      }

      if (result.success) {
        toast.success(
          isEditing
            ? "Categoría actualizada correctamente"
            : "Categoría creada correctamente"
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
              ? "Error al actualizar la categoría"
              : "Error al crear la categoría"
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar categoría" : "Crear nueva categoría"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Actualiza los detalles de la categoría del glosario"
              : "Añade una nueva categoría al glosario"}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Ciencias" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción (opcional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe brevemente esta categoría"
                      {...field}
                      value={field.value || ""}
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
