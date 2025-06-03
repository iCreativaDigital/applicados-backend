"use client"

import { useState } from "react"
import { 
  Pencil, 
  Trash2, 
  Loader2
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

interface SubjectLevel {
  id: string
  subject_id: string
  title: string
  reference_title?: string
  order: number
  number_of_questions: number
  approximate_time_minutes: number
  created_at: Date
  updated_at: Date
}

interface SubjectLevelsTableProps {
  levels: SubjectLevel[]
  isLoading: boolean
  onEdit: (level: SubjectLevel) => void
}

export function SubjectLevelsTable({ 
  levels, 
  isLoading, 
  onEdit 
}: SubjectLevelsTableProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [levelToDelete, setLevelToDelete] = useState<SubjectLevel | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  // Usando toast de sonner directamente

  // Manejar la eliminación de un nivel
  const handleDelete = async () => {
    if (!levelToDelete) return

    try {
      setIsDeleting(true)
      const response = await fetch(`/api/dashboard/subjects/levels/${levelToDelete.id}`, {
        method: "DELETE",
      })
      
      const result = await response.json()
      
      if (result.success) {
        toast.success("Nivel eliminado", {
          description: "El nivel ha sido eliminado correctamente"
        })
        
        // Recargar la página para actualizar la lista
        window.location.reload()
      } else {
        toast.error("Error", {
          description: result.message || "No se pudo eliminar el nivel"
        })
      }
    } catch (error) {
      console.error("Error al eliminar nivel:", error)
      toast.error("Error", {
        description: "Ocurrió un error al eliminar el nivel"
      })
    } finally {
      setIsDeleting(false)
      setDeleteDialogOpen(false)
      setLevelToDelete(null)
    }
  }

  // Confirmar eliminación de nivel
  const confirmDelete = (level: SubjectLevel) => {
    setLevelToDelete(level)
    setDeleteDialogOpen(true)
  }

  // Función para formatear una referencia opcional
  const formatReference = (reference?: string) => {
    if (!reference) return 'N/A';
    return reference;
  }

  // Renderizar filas de carga
  const renderSkeletonRows = () => {
    return Array(5).fill(0).map((_, index) => (
      <TableRow key={`skeleton-${index}`}>
        <TableCell><Skeleton className="h-4 w-8" /></TableCell>
        <TableCell><Skeleton className="h-4 w-32" /></TableCell>
        <TableCell><Skeleton className="h-4 w-16" /></TableCell>
        <TableCell><Skeleton className="h-4 w-16" /></TableCell>
        <TableCell><Skeleton className="h-4 w-16" /></TableCell>
        <TableCell><Skeleton className="h-8 w-20" /></TableCell>
      </TableRow>
    ))
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Orden</TableHead>
            <TableHead>Título</TableHead>
            <TableHead>Referencia</TableHead>
            <TableHead>Preguntas</TableHead>
            <TableHead>Tiempo (min)</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            renderSkeletonRows()
          ) : levels.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                No hay niveles disponibles para esta materia
              </TableCell>
            </TableRow>
          ) : (
            levels.map((level) => (
              <TableRow key={level.id}>
                <TableCell>{level.order}</TableCell>
                <TableCell className="font-medium">{level.title}</TableCell>
                <TableCell>{level.reference_title || 'N/A'}</TableCell>
                <TableCell>{level.number_of_questions}</TableCell>
                <TableCell>{level.approximate_time_minutes}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onEdit(level)}
                      title="Editar nivel"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => confirmDelete(level)}
                      title="Eliminar nivel"
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
              Esta acción eliminará el nivel "{levelToDelete?.title}" y no se puede deshacer.
              También se eliminarán todos los cuestionarios y preguntas asociados a este nivel.
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
