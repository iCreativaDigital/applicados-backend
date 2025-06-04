"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft, Plus } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { getQuestionnaireById } from "@/actions/applicados/questionnaire-actions"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { QuestionList } from "@/components/dashboard/applicados/question-list"
import { QuestionFormDialog } from "@/components/dashboard/applicados/question-form-dialog"

export default function QuestionsPage() {
  const [questionnaire, setQuestionnaire] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [formDialogOpen, setFormDialogOpen] = useState(false)
  
  const router = useRouter()
  const params = useParams()
  const questionnaireId = params.id as string
  
  // Función para cargar el cuestionario
  const fetchQuestionnaire = async () => {
    try {
      setIsLoading(true)
      
      const result = await getQuestionnaireById(questionnaireId)
      
      if (result.success) {
        setQuestionnaire(result.data)
      } else {
        toast.error("Error", {
          description: result.errors?._form?.[0] || "No se pudo cargar el cuestionario"
        })
      }
    } catch (error) {
      console.error("Error al cargar cuestionario:", error)
      toast.error("Error", {
        description: "Ocurrió un error al cargar el cuestionario"
      })
    } finally {
      setIsLoading(false)
    }
  }
  
  // Cargar el cuestionario al iniciar
  useEffect(() => {
    if (questionnaireId) {
      fetchQuestionnaire()
    }
  }, [questionnaireId])
  
  // Volver a la lista de cuestionarios
  const handleBack = () => {
    router.push("/dashboard/applicados/questionnaires")
  }
  
  // Añadir una nueva pregunta
  const handleAddQuestion = () => {
    setFormDialogOpen(true)
  }
  
  // Renderizar estado de carga
  if (isLoading) {
    return (
      <div className="container mx-auto py-6">
        <Button variant="outline" className="mb-6" onClick={handleBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver a cuestionarios
        </Button>
        
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }
  
  // Renderizar error si no se encuentra el cuestionario
  if (!questionnaire) {
    return (
      <div className="container mx-auto py-6">
        <Button variant="outline" className="mb-6" onClick={handleBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver a cuestionarios
        </Button>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Cuestionario no encontrado</CardTitle>
            <CardDescription>
              No se pudo encontrar el cuestionario solicitado
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              El cuestionario que estás buscando no existe o ha sido eliminado.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }
  
  return (
    <div className="container mx-auto py-6">
      <Button variant="outline" className="mb-6" onClick={handleBack}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Volver a cuestionarios
      </Button>
      
      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-2xl font-bold">{questionnaire.name}</CardTitle>
            <CardDescription>
              {questionnaire.description || "Sin descripción"}
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            {questionnaire.published ? (
              <Badge variant="default" className="bg-green-500">Publicado</Badge>
            ) : (
              <Badge variant="outline">Borrador</Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Nivel de materia</h3>
              <p>{questionnaire.subjectLevel?.title || "No disponible"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Materia</h3>
              <p>{questionnaire.subjectLevel?.subject?.name || "No disponible"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Orden</h3>
              <p>{questionnaire.order}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Fecha de creación</h3>
              <p>{new Date(questionnaire.created_at).toLocaleDateString('es-ES')}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        {/* <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-xl font-bold">Preguntas</CardTitle>
            <CardDescription>
              Gestiona las preguntas de este cuestionario
            </CardDescription>
          </div>
          <Button onClick={handleAddQuestion}>
            <Plus className="mr-2 h-4 w-4" /> Nueva Pregunta
          </Button> */}
        {/* </CardHeader> */}
        <CardContent>
          <QuestionList 
            questionnaireId={questionnaireId} 
            questionnaireName={questionnaire.name} 
          />
        </CardContent>
      </Card>
      
      {/* Diálogo de formulario para crear/editar preguntas */}
      <QuestionFormDialog
        open={formDialogOpen}
        onOpenChange={setFormDialogOpen}
        questionnaireId={questionnaireId}
        onSuccess={() => {
          // Recargar el cuestionario después de crear/editar una pregunta
          fetchQuestionnaire()
        }}
      />
    </div>
  )
}
