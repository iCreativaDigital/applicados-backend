"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { QuestionnairesTable } from "@/components/dashboard/applicados/questionnaires-table"
import { QuestionnaireFormDialog } from "@/components/dashboard/applicados/questionnaire-form-dialog"
import { toast } from "sonner"
import { getQuestionnaires } from "@/actions/applicados/questionnaire-actions"

interface Questionnaire {
  id: string
  name: string
  description: string | null
  order: number
  published: boolean
  subject_level_id: string
  created_at: Date
  updated_at: Date
  subjectLevel?: {
    id: string
    title: string
    reference_title: string | null
    subject: {
      id: string
      name: string
    }
  }
}

export default function QuestionnairesPage() {
  const [questionnaires, setQuestionnaires] = useState<Questionnaire[]>([])
  const [filteredQuestionnaires, setFilteredQuestionnaires] = useState<Questionnaire[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [showQuestionnaireForm, setShowQuestionnaireForm] = useState(false)
  const [questionnaireToEdit, setQuestionnaireToEdit] = useState<Questionnaire | null>(null)
  
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Cargar cuestionarios al iniciar
  useEffect(() => {
    const fetchQuestionnaires = async () => {
      try {
        setIsLoading(true)
        const subjectLevelId = searchParams.get("subject_level_id")
        
        const result = await getQuestionnaires(subjectLevelId || undefined)
        
        if (result.success) {
          setQuestionnaires(result.data || [])
          setFilteredQuestionnaires(result.data || [])
        } else {
          toast.error("Error", {
            description: result.errors?._form?.[0] || "No se pudieron cargar los cuestionarios"
          })
        }
      } catch (error) {
        console.error("Error al cargar cuestionarios:", error)
        toast.error("Error", {
          description: "Ocurrió un error al cargar los cuestionarios"
        })
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchQuestionnaires()
  }, [searchParams])
  
  // Filtrar cuestionarios según término de búsqueda
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredQuestionnaires(questionnaires)
    } else {
      const filtered = questionnaires.filter(
        (questionnaire) => 
          questionnaire.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          questionnaire.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          questionnaire.subjectLevel?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          questionnaire.subjectLevel?.subject.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredQuestionnaires(filtered)
    }
  }, [searchTerm, questionnaires])
  
  // Manejar la edición de un cuestionario
  const handleEditQuestionnaire = (questionnaire: Questionnaire) => {
    setQuestionnaireToEdit(questionnaire)
    setShowQuestionnaireForm(true)
  }
  
  // Manejar la creación de un nuevo cuestionario
  const handleNewQuestionnaire = () => {
    setQuestionnaireToEdit(null)
    setShowQuestionnaireForm(true)
  }
  
  // Manejar el cierre del formulario
  const handleCloseForm = async (refresh = false) => {
    setShowQuestionnaireForm(false)
    setQuestionnaireToEdit(null)
    
    if (refresh) {
      // Recargar la lista de cuestionarios
      const fetchQuestionnaires = async () => {
        try {
          setIsLoading(true)
          const subjectLevelId = searchParams.get("subject_level_id")
          
          const result = await getQuestionnaires(subjectLevelId || undefined)
          
          if (result.success) {
            setQuestionnaires(result.data || [])
            setFilteredQuestionnaires(result.data || [])
          } else {
            toast.error("Error", {
              description: "No se pudieron cargar los cuestionarios"
            })
          }
        } catch (error) {
          console.error("Error al cargar cuestionarios:", error)
          toast.error("Error", {
            description: "Ocurrió un error al cargar los cuestionarios"
          })
        } finally {
          setIsLoading(false)
        }
      }
      
      // Ejecutar la función para recargar los datos
      await fetchQuestionnaires()
    }
  }
  
  // Manejar la visualización de preguntas de un cuestionario
  const handleViewQuestions = (questionnaireId: string) => {
    router.push(`/dashboard/applicados/questionnaires/${questionnaireId}/questions`)
  }
  
  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-2xl font-bold">Cuestionarios</CardTitle>
            <CardDescription>
              Gestiona los cuestionarios disponibles en la plataforma
            </CardDescription>
          </div>
          <Button onClick={handleNewQuestionnaire}>
            <Plus className="mr-2 h-4 w-4" /> Nuevo Cuestionario
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex items-center py-4">
            <Input
              placeholder="Buscar cuestionarios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          
          <QuestionnairesTable 
            questionnaires={filteredQuestionnaires}
            isLoading={isLoading}
            onEdit={handleEditQuestionnaire}
            onViewQuestions={handleViewQuestions}
            onRefresh={() => handleCloseForm(true)}
          />
        </CardContent>
      </Card>
      
      {showQuestionnaireForm && (
        <QuestionnaireFormDialog
          questionnaire={questionnaireToEdit}
          open={showQuestionnaireForm}
          onClose={handleCloseForm}
        />
      )}
    </div>
  )
}
