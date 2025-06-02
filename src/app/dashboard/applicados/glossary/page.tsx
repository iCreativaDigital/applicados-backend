"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GlossaryTermsTable } from "@/components/dashboard/applicados/glossary-terms-table"
import { GlossaryTermFormDialog } from "@/components/dashboard/applicados/glossary-term-form-dialog"
import { getGlossaryTerms } from "@/actions/applicados/glossary-term-actions"
import { BookText, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function GlossaryPage() {
  const [terms, setTerms] = useState<any[]>([])
  const [filteredTerms, setFilteredTerms] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false)
  const [includeInactive, setIncludeInactive] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Cargar términos
  const loadTerms = async () => {
    setIsLoading(true)
    try {
      const result = await getGlossaryTerms(includeInactive)
      if (result.success) {
        // Asegurarnos de que result.data sea un arreglo, si es undefined usamos un arreglo vacío
        const termsData = result.data || []
        setTerms(termsData)
        filterTerms(termsData, searchQuery)
      } else {
        toast.error("Error al cargar los términos del glosario")
      }
    } catch (error) {
      console.error("Error al cargar términos:", error)
      toast.error("Ha ocurrido un error inesperado")
    } finally {
      setIsLoading(false)
    }
  }

  // Filtrar términos según la búsqueda
  const filterTerms = (termsData: any[], query: string) => {
    if (!query.trim()) {
      setFilteredTerms(termsData)
      return
    }
    
    const lowerQuery = query.toLowerCase()
    const filtered = termsData.filter(
      (term) => 
        term.word.toLowerCase().includes(lowerQuery) || 
        term.description.toLowerCase().includes(lowerQuery) ||
        term.category.name.toLowerCase().includes(lowerQuery)
    )
    
    setFilteredTerms(filtered)
  }

  // Manejar cambios en la búsqueda
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    filterTerms(terms, query)
  }

  // Cargar términos al montar el componente y cuando cambie includeInactive
  useEffect(() => {
    loadTerms()
  }, [includeInactive])

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <BookText className="h-6 w-6 mr-2 text-blue-600" />
          <h1 className="text-2xl font-bold">Glosario de Términos</h1>
        </div>
        <Button onClick={() => setIsFormDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Término
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gestión del Glosario</CardTitle>
          <CardDescription>
            Administra los términos del glosario de Applicados.
          </CardDescription>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-2">
            <div className="w-full md:w-1/2">
              <Input
                placeholder="Buscar por palabra, descripción o categoría..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full"
              />
            </div>
            <div className="flex items-center justify-between w-full md:w-auto gap-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="includeInactive"
                  checked={includeInactive}
                  onChange={(e) => setIncludeInactive(e.target.checked)}
                  className="rounded border-gray-300"
                />
                <label htmlFor="includeInactive" className="text-sm">
                  Mostrar términos inactivos
                </label>
              </div>
              <Button variant="outline" size="sm" onClick={loadTerms} disabled={isLoading}>
                {isLoading ? "Cargando..." : "Actualizar"}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <p>Cargando términos...</p>
            </div>
          ) : (
            <GlossaryTermsTable
              terms={filteredTerms}
              onRefresh={loadTerms}
            />
          )}
        </CardContent>
      </Card>

      {/* Diálogo para crear nuevo término */}
      <GlossaryTermFormDialog
        open={isFormDialogOpen}
        onOpenChange={setIsFormDialogOpen}
        onSuccess={loadTerms}
      />
    </div>
  )
}
