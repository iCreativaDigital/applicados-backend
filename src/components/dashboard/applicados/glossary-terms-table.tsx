"use client"

import { useState } from "react"
import { toast } from "sonner"
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
import { Edit, Trash2, Check, X } from "lucide-react"
import { GlossaryTermFormDialog } from "./glossary-term-form-dialog"
import { activateGlossaryTerm, deactivateGlossaryTerm } from "@/actions/applicados/glossary-term-actions"

interface GlossaryTerm {
  id: string
  word: string
  description: string
  active: boolean
  created_at: Date
  updated_at: Date
  category_id: string
  category: {
    id: string
    name: string
    active: boolean
  }
}

interface GlossaryTermsTableProps {
  terms: GlossaryTerm[]
  onRefresh: () => void
}

export function GlossaryTermsTable({ terms, onRefresh }: GlossaryTermsTableProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedTerm, setSelectedTerm] = useState<GlossaryTerm | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Función para abrir el diálogo de edición
  const handleEdit = (term: GlossaryTerm) => {
    setSelectedTerm(term)
    setIsEditDialogOpen(true)
  }

  // Función para abrir el diálogo de eliminación
  const handleDelete = (term: GlossaryTerm) => {
    setSelectedTerm(term)
    setIsDeleteDialogOpen(true)
  }

  // Función para cambiar el estado de activación de un término
  const handleToggleActive = async (term: GlossaryTerm) => {
    setIsSubmitting(true)
    try {
      const result = term.active
        ? await deactivateGlossaryTerm(term.id)
        : await activateGlossaryTerm(term.id)

      if (result.success) {
        toast.success(
          term.active
            ? "Término desactivado correctamente"
            : "Término activado correctamente"
        )
        onRefresh()
      } else if (result.errors?._form) {
        toast.error(result.errors._form[0])
      } else {
        toast.error("Error al cambiar el estado del término")
      }
    } catch (error) {
      console.error("Error al cambiar estado:", error)
      toast.error("Ha ocurrido un error inesperado")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Palabra</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {terms.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  No hay términos disponibles
                </TableCell>
              </TableRow>
            ) : (
              terms.map((term) => (
                <TableRow key={term.id}>
                  <TableCell className="font-medium">{term.word}</TableCell>
                  <TableCell>
                    <Badge variant={term.category.active ? "outline" : "secondary"}>
                      {term.category.name}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs truncate" title={term.description}>
                      {term.description}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={term.active ? "success" : "destructive"}
                    >
                      {term.active ? "Activo" : "Inactivo"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEdit(term)}
                        title="Editar término"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      
                      <Button
                        variant={term.active ? "destructive" : "outline"}
                        size="icon"
                        onClick={() => handleToggleActive(term)}
                        disabled={isSubmitting || (!term.category.active && !term.active)}
                        title={
                          term.active
                            ? "Desactivar término"
                            : "Activar término"
                        }
                      >
                        {term.active ? (
                          <X className="h-4 w-4" />
                        ) : (
                          <Check className="h-4 w-4" />
                        )}
                      </Button>
                      
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDelete(term)}
                        disabled={isSubmitting}
                        title="Eliminar término"
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
      </div>

      {/* Diálogo de edición */}
      <GlossaryTermFormDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        initialData={selectedTerm}
        onSuccess={onRefresh}
      />

      {/* Diálogo de confirmación para eliminar */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción desactivará el término &quot;{selectedTerm?.word}&quot;.
              {!selectedTerm?.category.active && (
                <div className="mt-2 text-amber-500">
                  Nota: La categoría de este término está inactiva.
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={async (e) => {
                e.preventDefault()
                if (!selectedTerm) return
                
                setIsSubmitting(true)
                try {
                  const result = await deactivateGlossaryTerm(selectedTerm.id)
                  
                  if (result.success) {
                    toast.success("Término desactivado correctamente")
                    onRefresh()
                  } else if (result.errors?._form) {
                    toast.error(result.errors._form[0])
                  } else {
                    toast.error("Error al desactivar el término")
                  }
                } catch (error) {
                  console.error("Error al desactivar término:", error)
                  toast.error("Ha ocurrido un error inesperado")
                } finally {
                  setIsSubmitting(false)
                  setIsDeleteDialogOpen(false)
                }
              }}
            >
              Desactivar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
