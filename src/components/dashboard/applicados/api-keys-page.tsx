"use client";

import { ApiKeysTable, ApiKey } from "./api-keys-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { getApiKeys, createApiKey, updateApiKey, deactivateApiKey } from "@/actions/applicados/api-key-actions";
import { toast } from "sonner";

export function ApiKeysPage() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchApiKeys = async () => {
    try {
      setLoading(true);
      const response = await getApiKeys();
      
      if (!response.success) {
        throw new Error(response.errors?._form?.[0] || "Error al cargar las API Keys");
      }
      
      // Convertir los datos de la API a nuestro tipo ApiKey
      const formattedApiKeys: ApiKey[] = (response.data || []).map(key => ({
        id: key.id,
        name: key.name,
        key: key.key,
        created_at: key.created_at,
        last_used_at: key.last_used_at,
        app_user: {
          id: key.app_user.id,
          name: key.app_user.name,
          company_name: key.app_user.company_name
        }
      }));
      
      setApiKeys(formattedApiKeys);
      toast.success("API Keys cargadas correctamente");
    } catch (error) {
      console.error("Error fetching API Keys:", error);
      setError("No se pudieron cargar las API Keys. Por favor, intenta de nuevo más tarde.");
      toast.error("Error al cargar las API Keys");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApiKeys();
  }, []);

  // Función para manejar la creación, actualización y desactivación de API Keys
  const handleApiKeyAction = async (action: string, data: any) => {
    try {
      // Actualizar la UI después de una acción exitosa
      await fetchApiKeys();
    } catch (error) {
      console.error(`Error al ${action} API Key:`, error);
      toast.error(`Error al ${action} la API Key`);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Gestión de API Keys</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        ) : error ? (
          <div className="p-4 text-center">
            <p className="text-destructive">{error}</p>
            <button 
              onClick={() => fetchApiKeys()} 
              className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md"
            >
              Reintentar
            </button>
          </div>
        ) : (
          <ApiKeysTable 
            initialApiKeys={apiKeys} 
            onApiKeyChange={() => fetchApiKeys()}
          />
        )}
      </CardContent>
    </Card>
  );
}
