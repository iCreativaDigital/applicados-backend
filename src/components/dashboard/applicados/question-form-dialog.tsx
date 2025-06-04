"use client"

import { useEffect, useState } from "react"
import { useForm, useFieldArray, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createQuestion, updateQuestion } from "@/actions/applicados/question-actions"
import { toast } from "sonner"
import { z } from "zod"

// Definimos el enum QuestionType ya que no podemos importarlo directamente
enum QuestionType {
  MULTIPLE_CHOICE_SINGLE = "MULTIPLE_CHOICE_SINGLE",
  MULTIPLE_CHOICE_MULTIPLE = "MULTIPLE_CHOICE_MULTIPLE",
  TRUE_FALSE = "TRUE_FALSE"
}

// UI Components
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Plus, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

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

type QuestionFormValues = z.infer<typeof questionSchema>

// Propiedades del componente
interface QuestionFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  questionnaireId: string
  questionToEdit?: any // La pregunta a editar (si es edición)
  onSuccess?: () => void // Callback opcional para ejecutar después de guardar exitosamente
}

export function QuestionFormDialog({
  open,
  onOpenChange,
  questionnaireId,
  questionToEdit,
  onSuccess,
}: QuestionFormDialogProps) {
  // Estado para controlar el envío del formulario
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Inicializar el formulario con react-hook-form y zod
  const form = useForm<QuestionFormValues>({
    resolver: zodResolver(questionSchema) as any, // Cast para evitar errores de tipo
    defaultValues: {
      text: "",
      question_type: QuestionType.MULTIPLE_CHOICE_SINGLE,
      explanation: "",
      extra_info: "",
      points: 1,
      order: undefined,
      difficulty: 1,
      tags: "",
      active: true,
      questionnaire_id: questionnaireId,
      answerOptions: [
        { text: "", is_correct: true, order: 0 },
        { text: "", is_correct: false, order: 1 },
      ],
    },
  })

  // Configurar el field array para manejar las opciones de respuesta dinámicamente
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "answerOptions",
  })

  // Cargar datos si estamos editando una pregunta existente
  useEffect(() => {
    if (questionToEdit) {
      // Formatear los datos para el formulario
      const formattedQuestion = {
        ...questionToEdit,
        answerOptions: questionToEdit.answerOptions.map((option: any) => ({
          id: option.id,
          text: option.text,
          is_correct: option.is_correct,
          order: option.order,
        })),
      }
      
      // Establecer los valores en el formulario
      form.reset(formattedQuestion)
    } else {
      // Resetear el formulario a valores por defecto si no hay pregunta para editar
      form.reset({
        text: "",
        question_type: QuestionType.MULTIPLE_CHOICE_SINGLE,
        explanation: "",
        points: 1,
        order: undefined,
        difficulty: 1,
        tags: "",
        active: true,
        questionnaire_id: questionnaireId,
        answerOptions: [
          { text: "", is_correct: true, order: 0 },
          { text: "", is_correct: false, order: 1 },
        ],
      })
    }
  }, [questionToEdit, form, questionnaireId])

  // Manejar el envío del formulario
  const onSubmit = async (values: QuestionFormValues) => {
    try {
      setIsSubmitting(true)
      
      // Verificar que al menos una opción esté marcada como correcta
      const hasCorrectOption = values.answerOptions.some(option => option.is_correct)
      if (!hasCorrectOption) {
        form.setError("answerOptions" as any, { 
          type: "manual", 
          message: "Al menos una opción debe ser marcada como correcta" 
        })
        setIsSubmitting(false)
        return
      }
      
      // Para preguntas de tipo MULTIPLE_CHOICE_SINGLE, verificar que solo una opción sea correcta
      if (values.question_type === QuestionType.MULTIPLE_CHOICE_SINGLE) {
        const correctOptionsCount = values.answerOptions.filter(option => option.is_correct).length
        if (correctOptionsCount > 1) {
          form.setError("answerOptions" as any, { 
            type: "manual", 
            message: "Solo una opción puede ser correcta para preguntas de opción múltiple con respuesta única" 
          })
          setIsSubmitting(false)
          return
        }
      }
      
      // Para preguntas de tipo TRUE_FALSE, verificar que solo hay 2 opciones
      if (values.question_type === QuestionType.TRUE_FALSE && values.answerOptions.length !== 2) {
        form.setError("answerOptions" as any, { 
          type: "manual", 
          message: "Las preguntas de verdadero/falso deben tener exactamente 2 opciones" 
        })
        setIsSubmitting(false)
        return
      }

      let result
      
      if (questionToEdit) {
        // Actualizar pregunta existente
        result = await updateQuestion(questionToEdit.id, values)
      } else {
        // Crear nueva pregunta
        result = await createQuestion(values)
      }

      if (!result.success) {
        // Manejar errores del servidor
        if (result.errors) {
          // Establecer errores en los campos correspondientes
          Object.entries(result.errors).forEach(([key, messages]) => {
            if (key === "_form") {
              // Mostrar error general
              toast.error("Error", {
                description: messages?.[0] || "Ha ocurrido un error al guardar la pregunta"
              })
            } else {
              // Establecer error en campo específico
              form.setError(key as keyof QuestionFormValues, {
                type: "manual",
                message: messages?.[0] || `Error en ${key}`
              })
            }
          })
        } else {
          toast.error("Error", {
            description: "Ha ocurrido un error al guardar la pregunta"
          })
        }
      } else {
        // Éxito
        toast.success(questionToEdit ? "Pregunta actualizada" : "Pregunta creada", {
          description: questionToEdit 
            ? "La pregunta ha sido actualizada correctamente" 
            : "La pregunta ha sido creada correctamente"
        })
        
        // Cerrar el diálogo y resetear el formulario
        onOpenChange(false)
        form.reset()
        
        // Ejecutar callback de éxito si existe
        if (onSuccess) {
          onSuccess()
        }
      }
    } catch (error) {
      console.error("Error al guardar la pregunta:", error)
      toast.error("Error", {
        description: "Ha ocurrido un error inesperado"
      })
    } finally {
      setIsSubmitting(false)
    }
  }
  
  // Función para agregar una nueva opción de respuesta
  const addAnswerOption = () => {
    append({ text: "", is_correct: false, order: fields.length })
  }
  
  // Función para manejar cambios en el tipo de pregunta
  const handleQuestionTypeChange = (type: QuestionType) => {
    // Si cambia a TRUE_FALSE, ajustar las opciones a exactamente 2
    if (type === QuestionType.TRUE_FALSE) {
      // Si hay más de 2 opciones, eliminar las extras
      if (fields.length > 2) {
        // Mantener solo las dos primeras opciones
        for (let i = fields.length - 1; i >= 2; i--) {
          remove(i)
        }
      } 
      // Si hay menos de 2 opciones, agregar las que faltan
      else if (fields.length < 2) {
        while (fields.length < 2) {
          addAnswerOption()
        }
      }
    }
  }
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[1200px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{questionToEdit ? "Editar Pregunta" : "Crear Nueva Pregunta"}</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Texto de la pregunta */}
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Texto de la pregunta</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Escribe el enunciado de la pregunta"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Tipo de pregunta */}
              <FormField
                control={form.control}
                name="question_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de pregunta</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value)
                        handleQuestionTypeChange(value as QuestionType)
                      }}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un tipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={QuestionType.MULTIPLE_CHOICE_SINGLE}>
                          Opción múltiple (respuesta única)
                        </SelectItem>
                        <SelectItem value={QuestionType.MULTIPLE_CHOICE_MULTIPLE}>
                          Opción múltiple (múltiples respuestas)
                        </SelectItem>
                        <SelectItem value={QuestionType.TRUE_FALSE}>
                          Verdadero / Falso
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Puntos */}
              <FormField
                control={form.control}
                name="points"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Puntos</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" {...field} />
                    </FormControl>
                    <FormDescription>Valor de la pregunta</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Dificultad */}
              <FormField
                control={form.control}
                name="difficulty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dificultad</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(parseInt(value))}
                      defaultValue={field.value.toString()}
                      value={field.value.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona la dificultad" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">1 - Muy fácil</SelectItem>
                        <SelectItem value="2">2 - Fácil</SelectItem>
                        <SelectItem value="3">3 - Media</SelectItem>
                        <SelectItem value="4">4 - Difícil</SelectItem>
                        <SelectItem value="5">5 - Muy difícil</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Orden */}
              <FormField
                control={form.control}
                name="order"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Orden</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="0" 
                        placeholder="Dejar vacío para asignar automáticamente"
                        {...field} 
                        value={field.value === undefined ? "" : field.value}
                        onChange={(e) => {
                          const value = e.target.value === "" ? undefined : parseInt(e.target.value)
                          field.onChange(value)
                        }}
                      />
                    </FormControl>
                    <FormDescription>Posición de la pregunta en el cuestionario</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {/* Etiquetas */}
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Etiquetas</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Etiquetas separadas por comas (ej: algebra,ecuaciones)"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>Opcional: para categorizar y filtrar preguntas</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Explicación */}
            <FormField
              control={form.control}
              name="explanation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Explicación</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Explicación que se mostrará después de responder (opcional)"
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Se muestra al usuario después de responder</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Información Extra */}
            <FormField
              control={form.control}
              name="extra_info"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Información Extra</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Información adicional para ayudar al estudiante (HTML, videos incrustados, etc.)"
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Contenido enriquecido que se mostrará como ayuda para el estudiante</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Activo */}
            <FormField
              control={form.control}
              name="active"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Activo</FormLabel>
                    <FormDescription>
                      Determina si la pregunta está disponible para los usuarios
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
            
            <Separator />
            
            {/* Opciones de respuesta */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Opciones de respuesta</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addAnswerOption}
                  disabled={form.watch("question_type") === QuestionType.TRUE_FALSE && fields.length >= 2}
                >
                  <Plus className="mr-2 h-4 w-4" /> Agregar opción
                </Button>
              </div>
              
              {form.formState.errors.answerOptions?.message && (
                <div className="text-red-500 text-sm mb-2">
                  {form.formState.errors.answerOptions.message}
                </div>
              )}
              
              <div className="space-y-4">
                {fields.map((field, index) => (
                  <Card key={field.id}>
                    <CardHeader className="py-2 px-4">
                      <CardTitle className="text-sm font-medium flex justify-between items-center">
                        <span>Opción {index + 1}</span>
                        {fields.length > 2 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => remove(index)}
                            disabled={form.watch("question_type") === QuestionType.TRUE_FALSE}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="py-2 px-4">
                      <div className="grid grid-cols-1 gap-4">
                        <FormField
                          control={form.control}
                          name={`answerOptions.${index}.text`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Texto de la opción</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name={`answerOptions.${index}.is_correct`}
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between space-x-2">
                              <FormLabel>¿Es la respuesta correcta?</FormLabel>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  disabled={
                                    form.watch("question_type") === QuestionType.MULTIPLE_CHOICE_SINGLE &&
                                    field.value === false &&
                                    form.getValues("answerOptions").filter(opt => opt.is_correct).length <= 1
                                  }
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
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
                {isSubmitting ? "Guardando..." : questionToEdit ? "Actualizar" : "Crear"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
  
