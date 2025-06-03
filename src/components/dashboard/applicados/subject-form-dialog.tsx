"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createSubject, updateSubject, getSubjectDetail, getSubjectById } from "@/actions/applicados/subject-actions"
import { getTestTypes } from "@/actions/applicados/test-type-actions"
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
import { Checkbox } from "@/components/ui/checkbox"
import { ImageUpload } from "./image-upload"
import { RichTextEditor } from "@/components/dashboard/applicados/rich-text-editor"
import { Loader2 } from "lucide-react"

// Definir el esquema de validación con Zod
const subjectFormSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  slug_materia: z.string().min(2, "El slug debe tener al menos 2 caracteres")
    .regex(/^[a-z0-9-]+$/, "El slug solo puede contener letras minúsculas, números y guiones"),
  description: z.string().optional(),
  // Permitir que background_image_url sea string, null o undefined
  background_image_url: z.union([
    z.string(),
    z.null(),
    z.undefined()
  ]),
  total_questions: z.coerce.number().int().min(0, "El número de preguntas no puede ser negativo"),
  approximate_total_minutes: z.coerce.number().int().min(0, "El tiempo aproximado no puede ser negativo"),
  order: z.coerce.number().int().min(0, "El orden no puede ser negativo"),
  test_type_ids: z.array(z.string()).min(1, "Debes seleccionar al menos un tipo de prueba"),
})

type SubjectFormValues = z.infer<typeof subjectFormSchema>

interface SubjectFormDialogProps {
  subject: any | null
  open: boolean
  onClose: (refresh?: boolean) => void
}

export function SubjectFormDialog({ subject, open, onClose }: SubjectFormDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  // const { toast } = useToast()
  
  // Estado para los tipos de prueba
  const [testTypes, setTestTypes] = useState<any[]>([])
  const [loadingTestTypes, setLoadingTestTypes] = useState(true)
  
  // Inicializar el formulario con react-hook-form y zod
  const form = useForm<SubjectFormValues>({
    resolver: zodResolver(subjectFormSchema),
    defaultValues: {
      name: "",
      slug_materia: "",
      description: "",
      background_image_url: null,
      total_questions: 0,
      approximate_total_minutes: 0,
      order: 0,
      test_type_ids: [],
    },
  })
  
  // Cargar los tipos de prueba disponibles
  useEffect(() => {
    const fetchTestTypes = async () => {
      try {
        setLoadingTestTypes(true)
        const result = await getTestTypes()
        
        if (result.success && result.data) {
          setTestTypes(result.data)
        } else {
          toast.error("Error", {
            description: "No se pudieron cargar los tipos de prueba"
          })
        }
      } catch (error) {
        console.error("Error al cargar tipos de prueba:", error)
        toast.error("Error", {
          description: "Ocurrió un error al cargar los tipos de prueba"
        })
      } finally {
        setLoadingTestTypes(false)
      }
    }
    
    fetchTestTypes()
  }, [])
  
  // Cargar datos del subject si estamos editando
  useEffect(() => {
    if (subject) {
      // Obtener los detalles de la materia usando Server Action
      const fetchSubjectDetail = async () => {
        try {
          // getSubjectDetail solo devuelve el objeto SubjectDetail, no la materia completa
          const result = await getSubjectDetail(subject.id)
          
          if (result.success && result.data) {
            // El resultado es directamente el objeto SubjectDetail
            const subjectDetail = result.data
            
            // Establecer los valores del detalle de la materia
            form.setValue("description", subjectDetail.subtitle || "")
            form.setValue("background_image_url", subjectDetail.background_image_url || null)
            
            // Mostrar en consola los valores para depuración
            console.log("Detalles cargados:", {
              subtitle: subjectDetail.subtitle,
              background_image_url: subjectDetail.background_image_url
            })
          }
          
          // Necesitamos obtener los tipos de prueba asociados a esta materia
          // Para ello, usamos getSubjectById que incluye la relación testSubjects
          const subjectResult = await getSubjectById(subject.id)
          
          if (subjectResult.success && subjectResult.data && subjectResult.data.testSubjects) {
            const selectedTestTypeIds = subjectResult.data.testSubjects.map(
              (ts: { test_type_id: string }) => ts.test_type_id
            )
            form.setValue("test_type_ids", selectedTestTypeIds)
          }
        } catch (error) {
          console.error("Error al cargar detalles de la materia:", error)
        }
      }
      
      // Establecer valores básicos del formulario
      form.setValue("name", subject.name || "")
      form.setValue("slug_materia", subject.slug_materia || "")
      form.setValue("total_questions", subject.total_questions || 0)
      form.setValue("approximate_total_minutes", subject.approximate_total_minutes || 0)
      form.setValue("order", subject.order || 0)
      
      // Cargar detalles adicionales
      fetchSubjectDetail()
    }
  }, [subject, form])
  
  // Manejar el envío del formulario
  const onSubmit = async (values: SubjectFormValues) => {
    try {
      setIsSubmitting(true)
      
      // Validar que al menos un tipo de prueba esté seleccionado
      if (!values.test_type_ids || values.test_type_ids.length === 0) {
        toast.error("Error", {
          description: "Debes seleccionar al menos un tipo de prueba"
        })
        setIsSubmitting(false)
        return
      }
      
      // Preparar los datos para enviar al servidor
      // Convertir background_image_url a cover_image_url para compatibilidad con la API
      // Asegurarnos de que cover_image_url sea string o undefined, no null
      const dataToSubmit = {
        ...values,
        // Eliminar background_image_url para que no se envíe al servidor
        background_image_url: undefined,
        // Convertir null a undefined para compatibilidad con la API
        cover_image_url: values.background_image_url === null ? undefined : values.background_image_url,
      }
      
      let result;
      
      if (subject) {
        // Actualizar materia existente usando Server Action
        result = await updateSubject(subject.id, dataToSubmit);
      } else {
        // Crear nueva materia usando Server Action
        result = await createSubject(dataToSubmit);
      }
      
      if (result.success) {
        toast.success(subject ? "Materia actualizada" : "Materia creada", {
          description: subject 
            ? "La materia ha sido actualizada correctamente" 
            : "La materia ha sido creada correctamente"
        })
        onClose(true) // Cerrar y refrescar
      } else {
        // Extraer mensaje de error, puede estar en diferentes formatos
        let errorMessage = "No se pudo guardar la materia";
        
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
      console.error("Error al guardar materia:", error)
      toast.error("Error", {
        description: "Ocurrió un error al guardar la materia"
      })
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {subject ? "Editar Materia" : "Crear Nueva Materia"}
          </DialogTitle>
          <DialogDescription>
            {subject 
              ? "Modifica los detalles de la materia existente" 
              : "Completa el formulario para crear una nueva materia"}
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Primera fila: Nombre y Slug */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input placeholder="Matemáticas" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="slug_materia"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input placeholder="matematicas" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {/* Segunda fila: Números */}
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="total_questions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Preguntas</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="approximate_total_minutes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tiempo (min)</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="order"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Orden</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {/* Tercera fila: Imagen y Descripción */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="background_image_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Imagen de Fondo</FormLabel>
                    <FormControl>
                      <ImageUpload
                        currentImageUrl={field.value || undefined}
                        onImageChange={(url) => field.onChange(url)}
                        label=""
                      />
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
                    <FormLabel>Descripción</FormLabel>
                    <FormControl>
                      <RichTextEditor
                        value={field.value || ""}
                        onChange={field.onChange}
                        className="min-h-[120px] max-h-[200px] overflow-y-auto"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {/* Cuarta fila: Tipos de Prueba */}
            <FormField
              control={form.control}
              name="test_type_ids"
              render={() => (
                <FormItem>
                  <div className="mb-2">
                    <FormLabel className="text-base">Tipos de Prueba</FormLabel>
                    <FormDescription className="text-xs">
                      Selecciona los tipos de prueba a los que pertenece esta materia
                    </FormDescription>
                  </div>
                  {loadingTestTypes ? (
                    <div className="flex items-center justify-center p-2">
                      <Loader2 className="h-5 w-5 animate-spin text-gray-500" />
                    </div>
                  ) : testTypes.length === 0 ? (
                    <p className="text-sm text-gray-500">No hay tipos de prueba disponibles</p>
                  ) : (
                    <div className="grid grid-cols-2 gap-2 max-h-[150px] overflow-y-auto p-1">
                      {testTypes.map((type) => (
                        <FormField
                          key={type.id}
                          control={form.control}
                          name="test_type_ids"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={type.id}
                                className="flex flex-row items-start space-x-2 space-y-0 rounded-md border p-2"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(type.id)}
                                    onCheckedChange={(checked) => {
                                      const currentValues = [...(field.value || [])]
                                      if (checked) {
                                        field.onChange([...currentValues, type.id])
                                      } else {
                                        field.onChange(
                                          currentValues.filter((value) => value !== type.id)
                                        )
                                      }
                                    }}
                                  />
                                </FormControl>
                                <div className="leading-none">
                                  <FormLabel className="cursor-pointer text-sm">
                                    {type.name}
                                  </FormLabel>
                                </div>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                    </div>
                  )}
                  <FormMessage />
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
                {subject ? "Actualizar" : "Crear"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
