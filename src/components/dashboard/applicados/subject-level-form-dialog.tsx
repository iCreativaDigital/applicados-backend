"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2 } from "lucide-react"
import { createSubjectLevel, updateSubjectLevel, getNextLevelNumber } from "@/actions/applicados/subject-level-actions"

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
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Definir el esquema de validación con zod
const subjectLevelFormSchema = z.object({
  title: z.string().min(1, { message: "El título es requerido" }),
  reference_title: z.string().optional(),
  order: z.coerce.number().min(1, { message: "El orden debe ser al menos 1" }),
  number_of_questions: z.coerce.number().min(1, { message: "Debe haber al menos 1 pregunta" }),
  approximate_time_minutes: z.coerce.number().min(1, { message: "El tiempo debe ser al menos 1 minuto" }),
})

type SubjectLevelFormValues = z.infer<typeof subjectLevelFormSchema>

interface SubjectLevel {
  id: string
  title: string
  reference_title?: string
  order: number
  number_of_questions: number
  approximate_time_minutes: number
  subject_id: string
  created_at: Date
  updated_at: Date
}

interface SubjectLevelFormDialogProps {
  level?: SubjectLevel | null
  subjectId: string
  open: boolean
  onClose: (refresh?: boolean) => void
}

export function SubjectLevelFormDialog({ 
  level, 
  subjectId, 
  open, 
  onClose 
}: SubjectLevelFormDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  // Usando toast de sonner directamente
  
  // Inicializar el formulario con react-hook-form y zod
  const form = useForm<SubjectLevelFormValues>({
    resolver: zodResolver(subjectLevelFormSchema),
    defaultValues: {
      title: "",
      reference_title: undefined,
      order: 1,
      number_of_questions: 10,
      approximate_time_minutes: 15,
    },
  })
  
  // Cargar datos del nivel si estamos editando
  useEffect(() => {
    // Resetear el formulario cuando cambia el nivel
    form.reset({
      title: "",
      reference_title: undefined,
      order: 1,
      number_of_questions: 10,
      approximate_time_minutes: 15,
    })
    
    if (level) {
      form.setValue("title", level.title)
      // Solo establecer reference_title si existe
      if (level.reference_title) {
        form.setValue("reference_title", level.reference_title)
      }
      form.setValue("order", level.order)
      form.setValue("number_of_questions", level.number_of_questions)
      form.setValue("approximate_time_minutes", level.approximate_time_minutes)
    } else {
      // Si es un nuevo nivel, obtener el próximo número de orden usando Server Action
      const fetchNextOrder = async () => {
        try {
          // Usar la Server Action en lugar de fetch
          const result = await getNextLevelNumber(subjectId)
          
          if (result.success && result.data) {
            // La estructura de respuesta es ligeramente diferente
            form.setValue("order", result.data.nextLevelNumber)
          }
        } catch (error) {
          console.error("Error al obtener el próximo orden de nivel:", error)
        }
      }
      
      fetchNextOrder()
    }
  }, [level, subjectId, form])
  
  // Manejar el envío del formulario
  const onSubmit = async (data: SubjectLevelFormValues) => {
    setIsSubmitting(true)
    
    try {
      // Preparar los datos para la Server Action
      // Adaptamos los nombres de los campos al esquema esperado por la Server Action
      const formData = {
        name: data.title,
        description: data.reference_title || "",
        level_number: data.order,
        difficulty: "normal", // Valor por defecto ya que no está en el formulario
        total_questions: data.number_of_questions,
        approximate_minutes: data.approximate_time_minutes
      }

      let result;
      
      if (level) {
        // Actualizar nivel existente usando Server Action
        result = await updateSubjectLevel(level.id, formData);
      } else {
        // Crear nuevo nivel usando Server Action
        result = await createSubjectLevel(subjectId, formData);
      }
      
      if (result.success) {
        toast.success(level ? "Nivel actualizado" : "Nivel creado", {
          description: level
            ? `El nivel "${data.title}" ha sido actualizado correctamente.`
            : `El nivel "${data.title}" ha sido creado correctamente.`
        })
        
        onClose(true) // Cerrar el diálogo y refrescar la lista
      } else {
        // Extraer mensaje de error, puede estar en diferentes formatos
        let errorMessage = "Ha ocurrido un error al procesar la solicitud.";
        
        if (result.errors) {
          // Si hay un error general
          if ('_form' in result.errors && result.errors._form?.[0]) {
            errorMessage = result.errors._form[0];
          } 
          // Si hay errores específicos de campo, tomamos el primero
          else if (Object.values(result.errors).some(arr => arr && arr.length > 0)) {
            const firstErrorField = Object.entries(result.errors).find(([_, msgs]) => msgs && msgs.length > 0);
            if (firstErrorField) {
              errorMessage = firstErrorField[1][0];
            }
          }
        }
        toast.error("Error", {
          description: errorMessage
        })
      }
    } catch (error) {
      console.error("Error al guardar el nivel:", error)
      
      toast.error("Error", {
        description: "Ha ocurrido un error al guardar el nivel."
      })
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {level ? "Editar Nivel" : "Crear Nuevo Nivel"}
          </DialogTitle>
          <DialogDescription>
            {level 
              ? "Modifica los detalles del nivel existente" 
              : "Completa el formulario para crear un nuevo nivel"}
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input placeholder="Nivel Básico" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="reference_title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título de Referencia (Opcional)</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Título descriptivo de referencia" 
                        value={field.value || ""} 
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        ref={field.ref}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="order"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Orden</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="number_of_questions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número de Preguntas</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="approximate_time_minutes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tiempo Aproximado (min)</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onClose()}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {level ? "Actualizar" : "Crear"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
