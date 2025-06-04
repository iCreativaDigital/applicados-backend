"use client"

import { useState, useEffect } from "react"
import { getQuestionsByQuestionnaire, deleteQuestion } from "@/actions/applicados/question-actions"
import { toast } from "sonner"
import { QuestionFormDialog } from "./question-form-dialog"

// UI Components
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { PlusCircle, Edit, Trash2, AlertCircle, CheckCircle2, XCircle } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

// Definimos el enum QuestionType ya que no podemos importarlo directamente
enum QuestionType {
  MULTIPLE_CHOICE_SINGLE = "MULTIPLE_CHOICE_SINGLE",
  MULTIPLE_CHOICE_MULTIPLE = "MULTIPLE_CHOICE_MULTIPLE",
  TRUE_FALSE = "TRUE_FALSE"
}

// Tipo para las preguntas
interface Question {
  id: string
  text: string
  question_type: QuestionType
  explanation?: string
  points: number
  order?: number
  difficulty: number
  tags?: string
  active: boolean
  questionnaire_id: string
  answerOptions: AnswerOption[]
}

// Tipo para las opciones de respuesta
interface AnswerOption {
  id: string
  text: string
  is_correct: boolean
  order?: number
}

interface QuestionListProps {
  questionnaireId: string
  questionnaireName: string
}

export function QuestionList({ questionnaireId, questionnaireName }: QuestionListProps) {
  // Estados
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [formDialogOpen, setFormDialogOpen] = useState(false)
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [questionToDelete, setQuestionToDelete] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  // Cargar preguntas al montar el componente o cuando cambie el ID del cuestionario
  useEffect(() => {
    loadQuestions()
  }, [questionnaireId])

  // Función para cargar las preguntas
  const loadQuestions = async () => {
    try {
      setLoading(true)
      const result = await getQuestionsByQuestionnaire(questionnaireId)
      
      if (result.success && result.data) {
        setQuestions(result.data)
      } else {
        toast.error("Error", {
          description: "No se pudieron cargar las preguntas"
        })
      }
    } catch (error) {
      console.error("Error al cargar las preguntas:", error)
      toast.error("Error", {
        description: "Ocurrió un error al cargar las preguntas"
      })
    } finally {
      setLoading(false)
    }
  }

  // Función para abrir el diálogo de creación de preguntas
  const handleAddQuestion = () => {
    setSelectedQuestion(null)
    setFormDialogOpen(true)
  }

  // Función para abrir el diálogo de edición de preguntas
  const handleEditQuestion = (question: Question) => {
    setSelectedQuestion(question)
    setFormDialogOpen(true)
  }

  // Función para confirmar la eliminación de una pregunta
  const handleDeleteConfirm = (questionId: string) => {
    setQuestionToDelete(questionId)
    setDeleteDialogOpen(true)
  }

  // Función para eliminar una pregunta
  const handleDeleteQuestion = async () => {
    if (!questionToDelete) return

    try {
      setIsDeleting(true)
      const result = await deleteQuestion(questionToDelete)
      
      if (result.success) {
        toast.success("Pregunta eliminada", {
          description: "La pregunta ha sido eliminada correctamente"
        })
        
        // Actualizar la lista de preguntas
        setQuestions(questions.filter(q => q.id !== questionToDelete))
      } else {
        toast.error("Error", {
          description: result.errors?._form?.[0] || "No se pudo eliminar la pregunta"
        })
      }
    } catch (error) {
      console.error("Error al eliminar la pregunta:", error)
      toast.error("Error", {
        description: "Ocurrió un error al eliminar la pregunta"
      })
    } finally {
      setIsDeleting(false)
      setDeleteDialogOpen(false)
      setQuestionToDelete(null)
    }
  }

  // Función para obtener el texto del tipo de pregunta
  const getQuestionTypeText = (type: QuestionType) => {
    switch (type) {
      case QuestionType.MULTIPLE_CHOICE_SINGLE:
        return "Opción múltiple (respuesta única)"
      case QuestionType.MULTIPLE_CHOICE_MULTIPLE:
        return "Opción múltiple (múltiples respuestas)"
      case QuestionType.TRUE_FALSE:
        return "Verdadero / Falso"
      default:
        return "Desconocido"
    }
  }

  // Función para obtener el color de la insignia de dificultad
  const getDifficultyBadgeColor = (difficulty: number) => {
    switch (difficulty) {
      case 1: return "bg-green-100 text-green-800 hover:bg-green-200"
      case 2: return "bg-lime-100 text-lime-800 hover:bg-lime-200"
      case 3: return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
      case 4: return "bg-orange-100 text-orange-800 hover:bg-orange-200"
      case 5: return "bg-red-100 text-red-800 hover:bg-red-200"
      default: return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Preguntas</h2>
          <p className="text-muted-foreground">
            Gestiona las preguntas del cuestionario: {questionnaireName}
          </p>
        </div>
        <Button onClick={handleAddQuestion}>
          <PlusCircle className="mr-2 h-4 w-4" /> Agregar Pregunta
        </Button>
      </div>
      
      <Separator />
      
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </CardContent>
              <CardFooter>
                <Skeleton className="h-10 w-32" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : questions.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No hay preguntas</h3>
          <p className="text-muted-foreground mt-2 mb-6">
            Este cuestionario aún no tiene preguntas. Agrega una para comenzar.
          </p>
          <Button onClick={handleAddQuestion}>
            <PlusCircle className="mr-2 h-4 w-4" /> Agregar Primera Pregunta
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {questions.map((question) => (
            <Card key={question.id} className={!question.active ? "opacity-70" : ""}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <CardTitle className="flex items-center gap-2">
                      {question.text}
                      {!question.active && (
                        <Badge variant="outline" className="ml-2 bg-gray-100">
                          Inactiva
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <Badge variant="outline">
                          {getQuestionTypeText(question.question_type)}
                        </Badge>
                        <Badge variant="outline" className={getDifficultyBadgeColor(question.difficulty)}>
                          Dificultad: {question.difficulty}
                        </Badge>
                        <Badge variant="outline">
                          {question.points} {question.points === 1 ? "punto" : "puntos"}
                        </Badge>
                        {question.order !== null && question.order !== undefined && (
                          <Badge variant="outline">
                            Orden: {question.order}
                          </Badge>
                        )}
                        {question.tags && question.tags.split(",").map((tag, i) => (
                          <Badge key={i} variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                            {tag.trim()}
                          </Badge>
                        ))}
                      </div>
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleEditQuestion(question)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-500" onClick={() => handleDeleteConfirm(question.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Opciones de respuesta:</h4>
                    <ul className="space-y-2">
                      {question.answerOptions.map((option) => (
                        <li key={option.id} className="flex items-center gap-2">
                          {option.is_correct ? (
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500" />
                          )}
                          <span>{option.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {question.explanation && (
                    <div>
                      <h4 className="font-medium mb-1">Explicación:</h4>
                      <p className="text-muted-foreground">{question.explanation}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      {/* Diálogo de formulario para crear/editar preguntas */}
      <QuestionFormDialog
        open={formDialogOpen}
        onOpenChange={setFormDialogOpen}
        questionnaireId={questionnaireId}
        questionToEdit={selectedQuestion}
        onSuccess={loadQuestions}
      />
      
      {/* Diálogo de confirmación para eliminar pregunta */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará permanentemente la pregunta y todas sus opciones de respuesta.
              Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteQuestion}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? "Eliminando..." : "Eliminar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
