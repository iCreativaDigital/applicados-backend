"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createQuestionnaire, updateQuestionnaire } from "@/actions/applicados/questionnaire-actions"
import { getAllSubjectLevels } from "@/actions/applicados/subject-level-actions"
import { toast } from "sonner"
import { z } from "zod"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Loader2 } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Definir el esquema de validación con Zod
const questionnaireSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  description: z.string().optional(),
  order: z.coerce.number().int().min(0, "El orden no puede ser negativo"),
  published: z.boolean().default(false),
  subject_level_id: z.string().uuid("El ID del nivel de materia debe ser un UUID válido"),
})

type QuestionnaireFormValues = z.infer<typeof questionnaireSchema>

interface QuestionnaireFormDialogProps {
  questionnaire: any | null
  open: boolean
  onClose: (refresh?: boolean) => void
}

export function QuestionnaireFormDialog({ questionnaire, open, onClose }: QuestionnaireFormDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [subjectLevels, setSubjectLevels] = useState<any[]>([])
  const [loadingSubjectLevels, setLoadingSubjectLevels] = useState(true)
  
  // Inicializar el formulario con react-hook-form y zod
  const form = useForm<QuestionnaireFormValues>({
    resolver: zodResolver(questionnaireSchema) as any,
    defaultValues: {
      name: "",
      description: "",
      order: 0,
      published: false,
      subject_level_id: "",
    },
  })
  
  // Cargar los niveles de materia disponibles
  useEffect(() => {
    const fetchSubjectLevels = async () => {
      try {
        setLoadingSubjectLevels(true)
        // Usamos la server action para obtener los niveles de materia
        const result = await getAllSubjectLevels()
        
        if (!result.success || !result.data) {
          throw new Error(result.errors?._form?.[0] || 'Error al obtener niveles de materia')
        }
        
        // Organizamos los niveles por materia para mostrarlos agrupados
        const levels = result.data.map((level: any) => ({
          ...level,
          // Añadimos un campo para mostrar en el select
          displayName: `${level.title} - ${level.subject?.name || 'Sin materia'}`
        }))
        
        setSubjectLevels(levels)
      } catch (error) {
        console.error("Error al cargar niveles de materia:", error)
        toast.error("Error", {
          description: "No se pudieron cargar los niveles de materia"
        })
      } finally {
        setLoadingSubjectLevels(false)
      }
    }
    
    fetchSubjectLevels()
  }, [])
  
  // Cargar datos del cuestionario si estamos editando
  useEffect(() => {
    if (questionnaire) {
      form.reset({
        name: questionnaire.name,
        description: questionnaire.description || "",
        order: questionnaire.order,
        published: questionnaire.published,
        subject_level_id: questionnaire.subject_level_id,
      })
    } else {
      form.reset({
        name: "",
        description: "",
        order: 0,
        published: false,
        subject_level_id: "",
      })
    }
  }, [questionnaire, form])
  
  // Manejar el envío del formulario
  const onSubmit = async (values: QuestionnaireFormValues) => {
    try {
      setIsSubmitting(true)
      
      let result;
      
      if (questionnaire) {
        // Actualizar cuestionario existente usando Server Action
        result = await updateQuestionnaire(questionnaire.id, values);
      } else {
        // Crear nuevo cuestionario usando Server Action
        result = await createQuestionnaire(values);
      }
      
      if (result.success) {
        toast.success(questionnaire ? "Cuestionario actualizado" : "Cuestionario creado", {
          description: questionnaire 
            ? "El cuestionario ha sido actualizado correctamente" 
            : "El cuestionario ha sido creado correctamente"
        })
        onClose(true) // Cerrar y refrescar
      } else {
        // Extraer mensaje de error, puede estar en diferentes formatos
        let errorMessage = "No se pudo guardar el cuestionario";
        
        if (result.errors) {
          // Si hay un error general
          if ('_form' in result.errors && result.errors._form?.[0]) {
            errorMessage = result.errors._form[0];
          } 
          // Si hay errores específicos de campo, tomamos el primero
          else if (result.errors && Object.values(result.errors).some(arr => arr && arr.length > 0)) {
            const firstErrorField = Object.entries(result.errors).find(([_, msgs]) => msgs && msgs.length > 0);
            if (firstErrorField && firstErrorField[1] && firstErrorField[1][0]) {
              errorMessage = firstErrorField[1][0];
              // Establecer el error en el campo específico
              const fieldName = firstErrorField[0];
              if (fieldName === 'name' || 
                  fieldName === 'description' || 
                  fieldName === 'order' || 
                  fieldName === 'published' || 
                  fieldName === 'subject_level_id') {
                form.setError(fieldName as keyof QuestionnaireFormValues, { 
                  type: "manual", 
                  message: firstErrorField[1][0] 
                });
              }
            }
          }
        }
        toast.error("Error", {
          description: errorMessage
        })
      }
    } catch (error) {
      console.error("Error al guardar cuestionario:", error)
      toast.error("Error", {
        description: "Ocurrió un error al guardar el cuestionario"
      })
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <Dialog open={open} onOpenChange={(open) => !isSubmitting && !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{questionnaire ? "Editar Cuestionario" : "Crear Cuestionario"}</DialogTitle>
          <DialogDescription>
            {questionnaire 
              ? "Actualiza la información del cuestionario existente." 
              : "Completa el formulario para crear un nuevo cuestionario."}
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit as any)} className="space-y-4">
            {/* Nombre del cuestionario */}
            <FormField
              control={form.control as any}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del cuestionario</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Cuestionario de Matemáticas Básicas" {...field} />
                  </FormControl>
                  <FormDescription>
                    Nombre descriptivo del cuestionario
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Descripción */}
            <FormField
              control={form.control as any}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción (opcional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe brevemente el contenido del cuestionario..." 
                      {...field} 
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormDescription>
                    Una breve descripción del contenido o propósito del cuestionario
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Nivel de materia */}
            <FormField
              control={form.control as any}
              name="subject_level_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nivel de materia</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un nivel de materia" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {loadingSubjectLevels ? (
                        <div className="flex items-center justify-center p-2">
                          <Loader2 className="h-5 w-5 animate-spin text-gray-500" />
                        </div>
                      ) : subjectLevels.length === 0 ? (
                        <SelectItem value="empty" disabled>
                          No hay niveles de materia disponibles
                        </SelectItem>
                      ) : (
                        subjectLevels.map((level) => (
                          <SelectItem key={level.id} value={level.id}>
                            {level.displayName}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    El nivel de materia al que pertenece este cuestionario
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Orden */}
            <FormField
              control={form.control as any}
              name="order"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Orden</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="0" 
                      {...field} 
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormDescription>
                    Posición del cuestionario en la lista (0 = primero)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Publicado */}
            <FormField
              control={form.control as any}
              name="published"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Publicado</FormLabel>
                    <FormDescription>
                      Determina si el cuestionario está visible para los usuarios
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
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
                {questionnaire ? "Actualizar" : "Crear"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
