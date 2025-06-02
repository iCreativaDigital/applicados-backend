"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GlossaryCategoriesTable } from "@/components/dashboard/applicados/glossary-categories-table"
import { GlossaryCategoryFormDialog } from "@/components/dashboard/applicados/glossary-category-form-dialog"
import { getGlossaryCategories } from "@/actions/applicados/glossary-category-actions"
import { ListTree, Plus } from "lucide-react"

export default function GlossaryCategoriesPage() {
  const [categories, setCategories] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false)
  const [includeInactive, setIncludeInactive] = useState(false)

  // Cargar categorías
  const loadCategories = async () => {
    setIsLoading(true)
    try {
      const result = await getGlossaryCategories(includeInactive)
      if (result.success) {
        // Asegurarnos de que result.data sea un arreglo, si es undefined usamos un arreglo vacío
        const categoriesData = result.data || []
        setCategories(categoriesData)
      } else {
        toast.error("Error al cargar las categorías del glosario")
      }
    } catch (error) {
      console.error("Error al cargar categorías:", error)
      toast.error("Ha ocurrido un error inesperado")
    } finally {
      setIsLoading(false)
    }
  }

  // Cargar categorías al montar el componente y cuando cambie includeInactive
  useEffect(() => {
    loadCategories()
  }, [includeInactive])

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <ListTree className="h-6 w-6 mr-2 text-blue-600" />
          <h1 className="text-2xl font-bold">Categorías del Glosario</h1>
        </div>
        <Button onClick={() => setIsFormDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nueva Categoría
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gestión de Categorías</CardTitle>
          <CardDescription>
            Administra las categorías del glosario de términos de Applicados.
          </CardDescription>
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="includeInactive"
                checked={includeInactive}
                onChange={(e) => setIncludeInactive(e.target.checked)}
                className="rounded border-gray-300"
              />
              <label htmlFor="includeInactive" className="text-sm">
                Mostrar categorías inactivas
              </label>
            </div>
            <Button variant="outline" size="sm" onClick={loadCategories} disabled={isLoading}>
              {isLoading ? "Cargando..." : "Actualizar"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <p>Cargando categorías...</p>
            </div>
          ) : (
            <GlossaryCategoriesTable
              categories={categories}
              onRefresh={loadCategories}
            />
          )}
        </CardContent>
      </Card>

      {/* Diálogo para crear nueva categoría */}
      <GlossaryCategoryFormDialog
        open={isFormDialogOpen}
        onOpenChange={setIsFormDialogOpen}
        onSuccess={loadCategories}
      />
    </div>
  )
}
