"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SubjectsTable } from "@/components/dashboard/applicados/subjects-table"
import { SubjectFormDialog } from "@/components/dashboard/applicados/subject-form-dialog"
import { toast } from "sonner"
import { getSubjects } from "@/actions/applicados/subject-actions"

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
  reference_title: string | null
  title: string
  order: number
  number_of_questions: number
  approximate_time_minutes: number
  created_at: Date
  updated_at: Date
  subject_id: string
}

interface TestSubject {
  test_type_id: string
  subject_id: string
  assigned_at: Date
  subject_order_in_test: number | null
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
  subject_levels: SubjectLevel[]
  testSubjects: TestSubject[]
}

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [filteredSubjects, setFilteredSubjects] = useState<Subject[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [showSubjectForm, setShowSubjectForm] = useState(false)
  const [subjectToEdit, setSubjectToEdit] = useState<Subject | null>(null)
  
  const router = useRouter()
  const searchParams = useSearchParams()
  // Usando toast de sonner directamente
  
  // Cargar materias al iniciar
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        setIsLoading(true)
        const apiKeyId = searchParams.get("api_key_id")
        const testTypeId = searchParams.get("test_type_id")
        
        const result = await getSubjects(apiKeyId || undefined, testTypeId || undefined)
        
        if (result.success) {
          setSubjects(result.data || [])
          setFilteredSubjects(result.data || [])
        } else {
          toast.error("Error", {
            description: result.errors?._form?.[0] || "No se pudieron cargar las materias"
          })
        }
      } catch (error) {
        console.error("Error al cargar materias:", error)
        toast.error("Error", {
          description: "Ocurrió un error al cargar las materias"
        })
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchSubjects()
  }, [searchParams])
  
  // Filtrar materias según término de búsqueda
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredSubjects(subjects)
    } else {
      const filtered = subjects.filter(
        (subject) => 
          subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          subject.slug_materia.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredSubjects(filtered)
    }
  }, [searchTerm, subjects])
  
  // Manejar la edición de una materia
  const handleEditSubject = (subject: Subject) => {
    setSubjectToEdit(subject)
    setShowSubjectForm(true)
  }
  
  // Manejar la creación de una nueva materia
  const handleNewSubject = () => {
    setSubjectToEdit(null)
    setShowSubjectForm(true)
  }
  
  // Manejar el cierre del formulario
  const handleCloseForm = async (refresh = false) => {
    setShowSubjectForm(false)
    setSubjectToEdit(null)
    
    if (refresh) {
      // Recargar la lista de materias usando la función fetchSubjects
      // En lugar de router.refresh() que no siempre funciona como esperamos
      const fetchSubjects = async () => {
        try {
          setIsLoading(true)
          const apiKeyId = searchParams.get("api_key_id")
          const testTypeId = searchParams.get("test_type_id")
          
          const result = await getSubjects(apiKeyId || undefined, testTypeId || undefined)
          
          if (result.success) {
            setSubjects(result.data || [])
            setFilteredSubjects(result.data || [])
          } else {
            toast.error("Error", {
              description: "No se pudieron cargar las materias"
            })
          }
        } catch (error) {
          console.error("Error al cargar materias:", error)
          toast.error("Error", {
            description: "Ocurrió un error al cargar las materias"
          })
        } finally {
          setIsLoading(false)
        }
      }
      
      // Ejecutar la función para recargar los datos
      await fetchSubjects()
    }
  }
  
  // Manejar la visualización de niveles de una materia
  const handleViewLevels = (subjectId: string) => {
    router.push(`/dashboard/applicados/subjects/${subjectId}/levels`)
  }
  
  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-2xl font-bold">Materias</CardTitle>
            <CardDescription>
              Gestiona las materias disponibles en la plataforma
            </CardDescription>
          </div>
          <Button onClick={handleNewSubject}>
            <Plus className="mr-2 h-4 w-4" /> Nueva Materia
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex items-center py-4">
            <Input
              placeholder="Buscar materias..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          
          <SubjectsTable 
            subjects={filteredSubjects}
            isLoading={isLoading}
            onEdit={handleEditSubject}
            onViewLevels={handleViewLevels}
            onRefresh={() => router.refresh()}
          />
        </CardContent>
      </Card>
      
      {showSubjectForm && (
        <SubjectFormDialog
          subject={subjectToEdit}
          open={showSubjectForm}
          onClose={handleCloseForm}
        />
      )}
    </div>
  )
}
