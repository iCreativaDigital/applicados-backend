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
import { GlossaryCategoryFormDialog } from "./glossary-category-form-dialog"
import { activateGlossaryCategory, deactivateGlossaryCategory } from "@/actions/applicados/glossary-category-actions"

interface GlossaryCategory {
  id: string
  name: string
  description: string | null
  active: boolean
  created_at: Date
  updated_at: Date
  _count?: {
    terms: number
  }
}

interface GlossaryCategoriesTableProps {
  categories: GlossaryCategory[]
  onRefresh: () => void
}

export function GlossaryCategoriesTable({ categories, onRefresh }: GlossaryCategoriesTableProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<GlossaryCategory | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Función para abrir el diálogo de edición
  const handleEdit = (category: GlossaryCategory) => {
    setSelectedCategory(category)
    setIsEditDialogOpen(true)
  }

  // Función para abrir el diálogo de eliminación
  const handleDelete = (category: GlossaryCategory) => {
    setSelectedCategory(category)
    setIsDeleteDialogOpen(true)
  }

  // Función para cambiar el estado de activación de una categoría
  const handleToggleActive = async (category: GlossaryCategory) => {
    setIsSubmitting(true)
    try {
      const result = category.active
        ? await deactivateGlossaryCategory(category.id)
        : await activateGlossaryCategory(category.id)

      if (result.success) {
        toast.success(
          category.active
            ? "Categoría desactivada correctamente"
            : "Categoría activada correctamente"
        )
        onRefresh()
      } else if (result.errors?._form) {
        toast.error(result.errors._form[0])
      } else {
        toast.error("Error al cambiar el estado de la categoría")
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
              <TableHead>Nombre</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Términos</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  No hay categorías disponibles
                </TableCell>
              </TableRow>
            ) : (
              categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell>
                    {category.description ? (
                      <div className="max-w-xs truncate">
                        {category.description}
                      </div>
                    ) : (
                      <span className="text-gray-400 italic">Sin descripción</span>
                    )}
                  </TableCell>
                  <TableCell>{category._count?.terms || 0}</TableCell>
                  <TableCell>
                    <Badge
                      variant={category.active ? "success" : "destructive"}
                    >
                      {category.active ? "Activa" : "Inactiva"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEdit(category)}
                        title="Editar categoría"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      
                      <Button
                        variant={category.active ? "destructive" : "outline"}
                        size="icon"
                        onClick={() => handleToggleActive(category)}
                        disabled={isSubmitting || (!!category._count?.terms && category._count.terms > 0 && category.active)}
                        title={
                          category.active
                            ? "Desactivar categoría"
                            : "Activar categoría"
                        }
                      >
                        {category.active ? (
                          <X className="h-4 w-4" />
                        ) : (
                          <Check className="h-4 w-4" />
                        )}
                      </Button>
                      
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDelete(category)}
                        disabled={isSubmitting || (!!category._count?.terms && category._count.terms > 0)}
                        title="Eliminar categoría"
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
      <GlossaryCategoryFormDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        initialData={selectedCategory}
        onSuccess={onRefresh}
      />

      {/* Diálogo de confirmación para eliminar */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción desactivará la categoría &quot;{selectedCategory?.name}&quot;. 
              {selectedCategory?._count?.terms && selectedCategory._count.terms > 0 ? (
                <div className="mt-2 text-red-500">
                  No se puede desactivar una categoría con términos asociados.
                  Primero debes desactivar o reasignar todos los términos.
                </div>
              ) : null}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              disabled={!!selectedCategory?._count?.terms && selectedCategory._count.terms > 0}
              onClick={async (e) => {
                e.preventDefault()
                if (!selectedCategory) return
                
                setIsSubmitting(true)
                try {
                  const result = await deactivateGlossaryCategory(selectedCategory.id)
                  
                  if (result.success) {
                    toast.success("Categoría desactivada correctamente")
                    onRefresh()
                  } else if (result.errors?._form) {
                    toast.error(result.errors._form[0])
                  } else {
                    toast.error("Error al desactivar la categoría")
                  }
                } catch (error) {
                  console.error("Error al desactivar categoría:", error)
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
