"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  Eye, 
  Pencil, 
  Trash2, 
  Check, 
  X,
  Loader2,
  LucideIcon
} from "lucide-react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import { deleteSubject } from "@/actions/applicados/subject-actions"

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
  subject_levels: SubjectLevel[]
  subject_detail: SubjectDetail | null
  testSubjects: TestSubject[]
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

interface TestSubject {
  test_type_id: string
  subject_id: string
  assigned_at: Date
  subject_order_in_test: number | null
}

interface SubjectsTableProps {
  subjects: Subject[]
  isLoading: boolean
  onEdit: (subject: Subject) => void
  onViewLevels: (subjectId: string) => void
  onRefresh: () => void
}

export function SubjectsTable({ 
  subjects, 
  isLoading, 
  onEdit, 
  onViewLevels,
  onRefresh 
}: SubjectsTableProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [subjectToDelete, setSubjectToDelete] = useState<Subject | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  // Usando toast de sonner directamente

  // Manejar la eliminación de una materia
  const handleDelete = async () => {
    if (!subjectToDelete) return

    try {
      setIsDeleting(true)
      const result = await deleteSubject(subjectToDelete.id)

      if (result.success) {
        toast.success("Éxito", {
          description: "Materia eliminada correctamente"
        })
        onRefresh()
      } else {
        toast.error("Error", {
          description: result.errors?._form?.[0] || "No se pudo eliminar la materia"
        })
      }
    } catch (error) {
      console.error("Error al eliminar materia:", error)
      toast.error("Error", {
        description: "Ocurrió un error al eliminar la materia"
      })
    } finally {
      setIsDeleting(false)
      setSubjectToDelete(null)
    }
  }

  // Confirmar eliminación de materia
  const confirmDelete = (subject: Subject) => {
    setSubjectToDelete(subject)
    setDeleteDialogOpen(true)
  }

  // Renderizar filas de carga
  const renderSkeletonRows = () => {
    return Array(5).fill(0).map((_, index) => (
      <TableRow key={`skeleton-${index}`}>
        <TableCell><Skeleton className="h-4 w-24" /></TableCell>
        <TableCell><Skeleton className="h-4 w-32" /></TableCell>
        <TableCell><Skeleton className="h-4 w-40" /></TableCell>
        <TableCell><Skeleton className="h-4 w-16" /></TableCell>
        <TableCell><Skeleton className="h-4 w-16" /></TableCell>
        <TableCell><Skeleton className="h-4 w-16" /></TableCell>
        <TableCell><Skeleton className="h-8 w-28" /></TableCell>
      </TableRow>
    ))
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Niveles</TableHead>
            <TableHead>Preguntas</TableHead>
            <TableHead>Tiempo (min)</TableHead>
            <TableHead>Orden</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            renderSkeletonRows()
          ) : subjects.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                No hay materias disponibles
              </TableCell>
            </TableRow>
          ) : (
            subjects.map((subject) => (
              <TableRow key={subject.id}>
                <TableCell className="font-medium">{subject.name}</TableCell>
                <TableCell>{subject.slug_materia}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {subject.subject_levels.length > 0 ? (
                      subject.subject_levels.map((level) => (
                        <Badge key={level.id} variant="success" className="text-xs text-black">
                          {level.title}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-muted-foreground text-xs">Sin niveles</span>
                    )}
                  </div>
                </TableCell>
                <TableCell>{subject.total_questions}</TableCell>
                <TableCell>{subject.approximate_total_minutes}</TableCell>
                <TableCell>{subject.order}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onViewLevels(subject.id)}
                      title="Ver niveles"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onEdit(subject)}
                      title="Editar materia"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => confirmDelete(subject)}
                      title="Eliminar materia"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará la materia "{subjectToDelete?.name}" y no se puede deshacer.
              También se eliminarán todos los niveles asociados a esta materia.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Eliminando...
                </>
              ) : (
                "Eliminar"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
