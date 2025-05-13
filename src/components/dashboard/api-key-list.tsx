"use client"

import { useState } from "react"
import { deactivateApiKey } from "@/actions/auth"
import { toast } from "sonner"
import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"

interface ApiKey {
  id: string
  key: string
  name: string
  active: boolean
  created_at: Date
  last_used_at: Date | null
  expires_at: Date | null
}

interface ApiKeyListProps {
  apiKeys: ApiKey[]
  userId: string
}

export function ApiKeyList({ apiKeys, userId }: ApiKeyListProps) {
  const [isLoading, setIsLoading] = useState<string | null>(null)
  
  // Función para desactivar una API Key
  const handleDeactivate = async (apiKeyId: string) => {
    if (confirm("¿Estás seguro de que deseas desactivar esta API Key? Esta acción no se puede deshacer.")) {
      setIsLoading(apiKeyId)
      
      try {
        const result = await deactivateApiKey(apiKeyId, userId)
        
        if (result.success) {
          toast.success("API Key desactivada correctamente")
          // Recargar la página para actualizar la lista
          window.location.reload()
        } else {
          toast.error(result.error || "Error al desactivar la API Key")
        }
      } catch (error) {
        console.error("Error al desactivar API Key:", error)
        toast.error("Error al desactivar la API Key")
      } finally {
        setIsLoading(null)
      }
    }
  }
  
  // Función para copiar la API Key al portapapeles
  const copyToClipboard = (apiKey: string) => {
    navigator.clipboard.writeText(apiKey)
      .then(() => toast.success("API Key copiada al portapapeles"))
      .catch(() => toast.error("Error al copiar la API Key"))
  }
  
  // Formatear fecha relativa en español
  const formatDate = (date: Date | null) => {
    if (!date) return "Nunca"
    return formatDistanceToNow(new Date(date), { addSuffix: true, locale: es })
  }
  
  if (apiKeys.length === 0) {
    return <p className="text-gray-500">No tienes API Keys. Crea una para comenzar a usar el servicio.</p>
  }
  
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left">Nombre</th>
            <th className="p-3 text-left">API Key</th>
            <th className="p-3 text-left">Estado</th>
            <th className="p-3 text-left">Creada</th>
            <th className="p-3 text-left">Último uso</th>
            <th className="p-3 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {apiKeys.map((apiKey) => (
            <tr key={apiKey.id} className="border-t border-gray-200">
              <td className="p-3">{apiKey.name}</td>
              <td className="p-3">
                <div className="flex items-center">
                  <span className="font-mono text-sm">
                    {apiKey.key.substring(0, 8)}...{apiKey.key.substring(apiKey.key.length - 8)}
                  </span>
                  <button
                    onClick={() => copyToClipboard(apiKey.key)}
                    className="ml-2 p-1 text-blue-500 hover:text-blue-700"
                    title="Copiar API Key"
                  >
                    📋
                  </button>
                </div>
              </td>
              <td className="p-3">
                <span className={`px-2 py-1 rounded-full text-xs ${apiKey.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {apiKey.active ? 'Activa' : 'Inactiva'}
                </span>
              </td>
              <td className="p-3">{formatDate(apiKey.created_at)}</td>
              <td className="p-3">{formatDate(apiKey.last_used_at)}</td>
              <td className="p-3">
                {apiKey.active ? (
                  <button
                    onClick={() => handleDeactivate(apiKey.id)}
                    disabled={isLoading === apiKey.id}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
                  >
                    {isLoading === apiKey.id ? 'Desactivando...' : 'Desactivar'}
                  </button>
                ) : (
                  <span className="text-gray-500">Desactivada</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
