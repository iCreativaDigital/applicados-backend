"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// Importar componentes desde rutas absolutas
import { SubjectLevelsTable } from "@/components/dashboard/applicados/subject-levels-table"
import { SubjectLevelFormDialog } from "@/components/dashboard/applicados/subject-level-form-dialog"
import { toast } from "sonner"
import { getSubjectById } from "@/actions/applicados/subject-actions"
import { getSubjectLevels } from "@/actions/applicados/subject-level-actions"
import { Skeleton } from "@/components/ui/skeleton"



interface SubjectDetail {
  id: string
  subject_id: string
  background_image_url: string | null
  title: string
  title_color: string | null
  subtitle: string | null
  primary_color_hex: string | null
  created_at: Date
  updated_at: Date
}

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

interface Subject {
  id: string
  name: string
  description: string
  slug_materia: string
  approximate_total_minutes: number
  total_questions: number
  order: number
  api_key_id: string | null
  created_at: Date
  updated_at: Date
  subject_detail: SubjectDetail | null
  subject_levels?: SubjectLevel[]
}

export default function SubjectLevelsPage() {
  const [subject, setSubject] = useState<Subject | null>(null)
  const [levels, setLevels] = useState<SubjectLevel[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showLevelForm, setShowLevelForm] = useState(false)
  const [levelToEdit, setLevelToEdit] = useState<SubjectLevel | null>(null)
  
  const params = useParams()
  const router = useRouter()
  // Usando toast de sonner directamente
  const subjectId = params.id as string
  
  // Cargar materia y sus niveles al iniciar
  useEffect(() => {
    const fetchSubjectAndLevels = async () => {
      try {
        setIsLoading(true)
        
        // Obtener la materia
        const subjectResult = await getSubjectById(subjectId)
        
        if (!subjectResult.success) {
          toast.error("Error", {
            description: subjectResult.errors?._form?.[0] || "No se pudo cargar la materia"
          })
          router.push("/dashboard/applicados/subjects")
          return
        }
        
        if (subjectResult.data) {
          // Convertir el objeto a la estructura esperada por el estado
          const formattedSubject: Subject = {
            ...subjectResult.data,
            subject_levels: subjectResult.data.subject_levels?.map(level => ({
              ...level,
              // Convertir null a undefined para reference_title
              reference_title: level.reference_title === null ? undefined : level.reference_title
            })) || []
          }
          setSubject(formattedSubject)
        }
        
        // Obtener los niveles de la materia
        const levelsResult = await getSubjectLevels(subjectId)
        
        if (levelsResult.success && levelsResult.data) {
          // Convertir null a undefined para reference_title en cada nivel
          const formattedLevels = levelsResult.data.map(level => ({
            ...level,
            reference_title: level.reference_title === null ? undefined : level.reference_title
          }))
          setLevels(formattedLevels)
        } else {
          toast.error("Error", {
            description: levelsResult.errors?._form?.[0] || "No se pudieron cargar los niveles"
          })
        }
      } catch (error) {
        console.error("Error al cargar materia y niveles:", error)
        toast.error("Error", {
          description: "Ocurrió un error al cargar la materia y sus niveles"
        })
        router.push("/dashboard/applicados/subjects")
      } finally {
        setIsLoading(false)
      }
    }
    
    if (subjectId) {
      fetchSubjectAndLevels()
    }
  }, [subjectId, router])
  
  // Manejar la edición de un nivel
  const handleEditLevel = (level: SubjectLevel) => {
    setLevelToEdit(level)
    setShowLevelForm(true)
  }
  
  // Manejar la creación de un nuevo nivel
  const handleNewLevel = () => {
    setLevelToEdit(null)
    setShowLevelForm(true)
  }
  
  // Manejar el cierre del formulario
  const handleCloseForm = async (refresh = false) => {
    setShowLevelForm(false)
    setLevelToEdit(null)
    
    if (refresh) {
      // Recargar la lista de niveles usando la función fetchSubjectAndLevels
      // En lugar de router.refresh() que no siempre funciona como esperamos
      const fetchSubjectAndLevels = async () => {
        try {
          setIsLoading(true)
          
          // Obtener la materia
          const subjectResult = await getSubjectById(subjectId)
          
          if (!subjectResult.success) {
            toast.error("Error", {
              description: "No se pudo cargar la materia"
            })
            router.push("/dashboard/applicados/subjects")
            return
          }
          
          if (subjectResult.data) {
            // Convertir el objeto a la estructura esperada por el estado
            const formattedSubject: Subject = {
              ...subjectResult.data,
              subject_levels: subjectResult.data.subject_levels?.map(level => ({
                ...level,
                // Convertir null a undefined para reference_title
                reference_title: level.reference_title === null ? undefined : level.reference_title
              })) || []
            }
            setSubject(formattedSubject)
          }
          
          // Obtener los niveles de la materia
          const levelsResult = await getSubjectLevels(subjectId)
          
          if (levelsResult.success) {
            // Formatear los niveles para el estado
            const formattedLevels = levelsResult.data?.map(level => ({
              ...level,
              // Convertir null a undefined para reference_title
              reference_title: level.reference_title === null ? undefined : level.reference_title
            })) || []
            
            setLevels(formattedLevels)
          } else {
            toast.error("Error", {
              description: "No se pudieron cargar los niveles de la materia"
            })
          }
        } catch (error) {
          console.error("Error al cargar materia y niveles:", error)
          toast.error("Error", {
            description: "Ocurrió un error al cargar la materia y sus niveles"
          })
        } finally {
          setIsLoading(false)
        }
      }
      
      // Ejecutar la función para recargar los datos
      await fetchSubjectAndLevels()
    }
  }
  
  // Volver a la lista de materias
  const handleBackToSubjects = () => {
    router.push("/dashboard/applicados/subjects")
  }
  
  return (
    <div className="container mx-auto py-6">
      <Button 
        variant="outline" 
        onClick={handleBackToSubjects}
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Volver a Materias
      </Button>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            {isLoading ? (
              <>
                <Skeleton className="h-8 w-48 mb-2" />
                <Skeleton className="h-4 w-64" />
              </>
            ) : (
              <>
                <CardTitle className="text-2xl font-bold">
                  Niveles: {subject?.name}
                </CardTitle>
                <CardDescription>
                  Gestiona los niveles de la materia {subject?.name}
                </CardDescription>
              </>
            )}
          </div>
          <Button onClick={handleNewLevel} disabled={isLoading}>
            <Plus className="mr-2 h-4 w-4" /> Nuevo Nivel
          </Button>
        </CardHeader>
        <CardContent>
          <SubjectLevelsTable 
            levels={levels}
            isLoading={isLoading}
            onEdit={handleEditLevel}
          />
        </CardContent>
      </Card>
      
      {showLevelForm && (
        <SubjectLevelFormDialog
          level={levelToEdit}
          subjectId={subjectId}
          open={showLevelForm}
          onClose={handleCloseForm}
        />
      )}
    </div>
  )
}
