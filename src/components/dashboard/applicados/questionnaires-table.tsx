"use client"

import { useState } from "react"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import { MoreHorizontal, Pencil, List, Trash2 } from "lucide-react"
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
import { deleteQuestionnaire } from "@/actions/applicados/questionnaire-actions"

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

interface QuestionnairesTableProps {
  questionnaires: Questionnaire[]
  isLoading: boolean
  onEdit: (questionnaire: Questionnaire) => void
  onViewQuestions: (questionnaireId: string) => void
  onRefresh: () => void
}

export function QuestionnairesTable({ 
  questionnaires, 
  isLoading, 
  onEdit, 
  onViewQuestions,
  onRefresh 
}: QuestionnairesTableProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [questionnaireToDelete, setQuestionnaireToDelete] = useState<Questionnaire | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  // Formatear fecha
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  // Manejar la eliminación de un cuestionario
  const handleDeleteQuestionnaire = async () => {
    if (!questionnaireToDelete) return
    
    try {
      setIsDeleting(true)
      const result = await deleteQuestionnaire(questionnaireToDelete.id)
      
      if (result.success) {
        toast.success("Éxito", {
          description: "Cuestionario eliminado correctamente"
        })
        onRefresh()
      } else {
        toast.error("Error", {
          description: result.errors?._form?.[0] || "No se pudo eliminar el cuestionario"
        })
      }
    } catch (error) {
      console.error("Error al eliminar cuestionario:", error)
      toast.error("Error", {
        description: "Ocurrió un error al eliminar el cuestionario"
      })
    } finally {
      setIsDeleting(false)
      setShowDeleteDialog(false)
      setQuestionnaireToDelete(null)
    }
  }

  // Confirmar eliminación
  const confirmDelete = (questionnaire: Questionnaire) => {
    setQuestionnaireToDelete(questionnaire)
    setShowDeleteDialog(true)
  }

  // Renderizar esqueleto de carga
  if (isLoading) {
    return (
      <div className="w-full">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Nivel / Materia</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Orden</TableHead>
                <TableHead>Fecha de creación</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(5)].map((_, index) => (
                <TableRow key={index}>
                  <TableCell><Skeleton className="h-5 w-full" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-full" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-10" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-8 w-20 ml-auto" /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    )
  }

  // Renderizar tabla vacía
  if (questionnaires.length === 0) {
    return (
      <div className="w-full">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Nivel / Materia</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Orden</TableHead>
                <TableHead>Fecha de creación</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                  No hay cuestionarios disponibles
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    )
  }

  // Renderizar tabla con datos
  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Nivel / Materia</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Orden</TableHead>
              <TableHead>Fecha de creación</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {questionnaires.map((questionnaire) => (
              <TableRow key={questionnaire.id}>
                <TableCell className="font-medium">{questionnaire.name}</TableCell>
                <TableCell>
                  {questionnaire.subjectLevel ? (
                    <div className="flex flex-col">
                      <span>{questionnaire.subjectLevel.title}</span>
                      <span className="text-xs text-muted-foreground">
                        {questionnaire.subjectLevel.subject.name}
                      </span>
                    </div>
                  ) : (
                    <span className="text-muted-foreground">No disponible</span>
                  )}
                </TableCell>
                <TableCell>
                  {questionnaire.published ? (
                    <Badge variant="default" className="bg-green-500">Publicado</Badge>
                  ) : (
                    <Badge variant="outline">Borrador</Badge>
                  )}
                </TableCell>
                <TableCell>{questionnaire.order}</TableCell>
                <TableCell>{formatDate(questionnaire.created_at)}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Abrir menú</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => onEdit(questionnaire)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onViewQuestions(questionnaire.id)}>
                        <List className="mr-2 h-4 w-4" />
                        Ver preguntas
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => confirmDelete(questionnaire)}
                        className="text-red-600 focus:text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará permanentemente el cuestionario 
              &quot;{questionnaireToDelete?.name}&quot; y todas sus preguntas asociadas.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault()
                handleDeleteQuestionnaire()
              }}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            >
              {isDeleting ? "Eliminando..." : "Eliminar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
