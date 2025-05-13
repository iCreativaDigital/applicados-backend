"use client"

import { useState } from "react"
import { generateApiKey } from "@/actions/auth"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

interface CreateApiKeyFormProps {
  userId: string
}

export function CreateApiKeyForm({ userId }: CreateApiKeyFormProps) {
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [generatedApiKey, setGeneratedApiKey] = useState<string | null>(null)
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!name.trim()) {
      toast.error("Por favor, ingresa un nombre para la API Key")
      return
    }
    
    setIsLoading(true)
    
    try {
      const result = await generateApiKey(userId, name)
      
      if (result.success && result.apiKey) {
        toast.success("API Key generada correctamente")
        setGeneratedApiKey(result.apiKey)
        setName("")
      } else {
        toast.error(result.error || "Error al generar la API Key")
      }
    } catch (error) {
      console.error("Error al generar API Key:", error)
      toast.error("Error al generar la API Key")
    } finally {
      setIsLoading(false)
    }
  }
  
  // Función para copiar la API Key al portapapeles
  const copyToClipboard = (apiKey: string) => {
    navigator.clipboard.writeText(apiKey)
      .then(() => toast.success("API Key copiada al portapapeles"))
      .catch(() => toast.error("Error al copiar la API Key"))
  }
  
  return (
    <div>
      {generatedApiKey ? (
        <div className="space-y-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded-md">
            <h3 className="font-semibold text-green-800 mb-2">¡API Key generada correctamente!</h3>
            <p className="text-sm text-green-700 mb-2">
              Esta es tu API Key. Guárdala en un lugar seguro, ya que no podrás verla de nuevo.
            </p>
            <div className="flex items-center bg-white p-2 rounded border border-green-300">
              <code className="font-mono text-sm flex-1 overflow-x-auto">
                {generatedApiKey}
              </code>
              <button
                onClick={() => copyToClipboard(generatedApiKey)}
                className="ml-2 p-1 text-blue-500 hover:text-blue-700"
                title="Copiar API Key"
              >
                📋
              </button>
            </div>
          </div>
          <Button
            onClick={() => setGeneratedApiKey(null)}
            className="w-full"
          >
            Crear otra API Key
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="api-key-name">Nombre de la API Key</Label>
            <Input
              id="api-key-name"
              placeholder="Ej: API de mi aplicación"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <p className="text-xs text-gray-500">
              Asigna un nombre descriptivo para identificar esta API Key
            </p>
          </div>
          
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Generando..." : "Generar API Key"}
          </Button>
        </form>
      )}
    </div>
  )
}
