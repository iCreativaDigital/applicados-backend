"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { ApiKeyFormDialog } from "./api-key-form-dialog";
import { formatDate } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Copy, Eye, EyeOff, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export interface ApiKey {
  id: string;
  name: string;
  key: string;
  app_user: {
    id: string;
    name: string | null;
    company_name: string | null;
  };
  created_at?: Date;
  last_used_at?: Date | null;
}

interface ApiKeysTableProps {
  initialApiKeys: ApiKey[];
  onApiKeyChange?: () => void;
}

export function ApiKeysTable({ initialApiKeys, onApiKeyChange }: ApiKeysTableProps) {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>(initialApiKeys);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedApiKey, setSelectedApiKey] = useState<ApiKey | null>(null);
  const [visibleKeys, setVisibleKeys] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [isRegenerateDialogOpen, setIsRegenerateDialogOpen] = useState(false);
  const [regeneratingKeyId, setRegeneratingKeyId] = useState<string>("");
  const [regeneratedKey, setRegeneratedKey] = useState<string>("");

  const toggleKeyVisibility = (id: string) => {
    setVisibleKeys((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("API Key copiada al portapapeles");
  };

  const handleCreateApiKey = () => {
    setSelectedApiKey(null);
    setIsDialogOpen(true);
  };

  const handleEditApiKey = (apiKey: ApiKey) => {
    setSelectedApiKey(apiKey);
    setIsDialogOpen(true);
  };

  const handleDeactivateApiKey = async (id: string) => {
    if (!confirm("¿Estás seguro de que deseas desactivar esta API Key? Esta acción no se puede deshacer.")) {
      return;
    }
    
    setLoading(true);
    try {
      // Importamos la función de forma dinámica para evitar problemas de circular dependency
      const { deactivateApiKey } = await import('@/actions/applicados/api-key-actions');
      const response = await deactivateApiKey(id);
      
      if (response.success) {
        // Eliminar la API Key del estado local
        setApiKeys(apiKeys.filter(ak => ak.id !== id));
        toast.success("API Key desactivada correctamente");
        
        // Notificar al componente padre sobre el cambio
        if (onApiKeyChange) {
          onApiKeyChange();
        }
      } else {
        toast.error(response.errors?._form?.[0] || "Error al desactivar la API Key");
      }
    } catch (error) {
      console.error("Error al desactivar API Key:", error);
      toast.error("Error al desactivar la API Key");
    } finally {
      setLoading(false);
    }
  };
  
  const handleShowRegenerateDialog = (apiKey: ApiKey) => {
    setRegeneratingKeyId(apiKey.id);
    setIsRegenerateDialogOpen(true);
  };
  
  const handleRegenerateApiKey = async () => {
    if (!regeneratingKeyId) return;
    
    setLoading(true);
    try {
      // Importamos la función de forma dinámica para evitar problemas de circular dependency
      const { regenerateApiKey } = await import('@/actions/applicados/api-key-actions');
      const response = await regenerateApiKey(regeneratingKeyId);
      
      if (response.success && response.data) {
        // Actualizar la API Key en el estado local
        const updatedApiKey = response.data;
        setApiKeys(apiKeys.map(ak => ak.id === regeneratingKeyId ? {
          ...ak,
          key: updatedApiKey.key
        } : ak));
        
        // Guardar la nueva clave para mostrarla
        setRegeneratedKey(updatedApiKey.key);
        toast.success("API Key regenerada correctamente");
        
        // Notificar al componente padre sobre el cambio
        if (onApiKeyChange) {
          onApiKeyChange();
        }
      } else {
        toast.error(response.errors?._form?.[0] || "Error al regenerar la API Key");
        setIsRegenerateDialogOpen(false);
      }
    } catch (error) {
      console.error("Error al regenerar API Key:", error);
      toast.error("Error al regenerar la API Key");
      setIsRegenerateDialogOpen(false);
    } finally {
      setLoading(false);
    }
  };
  
  const handleCloseRegenerateDialog = () => {
    setIsRegenerateDialogOpen(false);
    setRegeneratingKeyId("");
    setRegeneratedKey("");
  };

  const handleApiKeySubmit = async (data: any): Promise<{ key?: string } | undefined> => {
    setLoading(true);
    try {
      // Importamos las funciones de forma dinámica para evitar problemas de circular dependency
      const { createApiKey, updateApiKey } = await import('@/actions/applicados/api-key-actions');
      
      if (selectedApiKey) {
        // Actualizar API Key existente
        const response = await updateApiKey(data.apiKeyId, { name: data.name });
        
        if (response.success && response.data) {
          // Actualizar el estado local
          setApiKeys(apiKeys.map(ak => ak.id === data.apiKeyId ? {
            ...ak,
            name: data.name
          } : ak));
          toast.success("API Key actualizada correctamente");
          
          // Notificar al componente padre sobre el cambio
          if (onApiKeyChange) {
            onApiKeyChange();
          }
          
          return undefined; // No hay clave para devolver en actualizaciones
        } else {
          toast.error(response.errors?._form?.[0] || "Error al actualizar la API Key");
          return undefined;
        }
      } else {
        // Crear nueva API Key
        const response = await createApiKey({ name: data.name });
        
        if (response.success && response.data) {
          // Añadir la nueva API Key al estado local
          const newApiKey = response.data as unknown as ApiKey;
          setApiKeys([...apiKeys, newApiKey]);
          toast.success("API Key creada correctamente");
          
          // Notificar al componente padre sobre el cambio
          if (onApiKeyChange) {
            onApiKeyChange();
          }
          
          // Devolver la clave generada para mostrarla en el diálogo
          return { key: newApiKey.key };
        } else {
          toast.error(response.errors?._form?.[0] || "Error al crear la API Key");
          return undefined;
        }
      }
    } catch (error) {
      console.error("Error al procesar API Key:", error);
      toast.error("Error al procesar la API Key");
      return undefined;
    } finally {
      setLoading(false);
      // No cerramos el diálogo aquí para permitir que se muestre la API Key generada
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Tus API Keys</h3>
        <Button
          onClick={handleCreateApiKey}
          disabled={loading}
        >
          Crear nueva API Key
        </Button>
      </div>
      
      {apiKeys.length === 0 ? (
        <div className="text-center p-8 border rounded-md">
          <p className="text-muted-foreground">No hay API Keys disponibles.</p>
          <Button
            onClick={handleCreateApiKey}
            variant="outline"
            className="mt-4"
            disabled={loading}
          >
            Crear API Key
          </Button>
        </div>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>API Key</TableHead>
                <TableHead>Usuario/Empresa</TableHead>
                <TableHead>Creada</TableHead>
                <TableHead>Último uso</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {apiKeys.map((apiKey) => (
                <TableRow key={apiKey.id}>
                  <TableCell className="font-medium">{apiKey.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-xs">
                        {visibleKeys[apiKey.id] 
                          ? apiKey.key 
                          : apiKey.key.substring(0, 4) + "..." + apiKey.key.substring(apiKey.key.length - 4)}
                      </span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-6 w-6" 
                              onClick={() => toggleKeyVisibility(apiKey.id)}
                              disabled={loading}
                            >
                              {visibleKeys[apiKey.id] ? <EyeOff size={14} /> : <Eye size={14} />}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            {visibleKeys[apiKey.id] ? "Ocultar" : "Mostrar"} API Key
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-6 w-6" 
                              onClick={() => copyToClipboard(apiKey.key)}
                              disabled={loading}
                            >
                              <Copy size={14} />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            Copiar API Key
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </TableCell>
                  <TableCell>
                    {apiKey.app_user.company_name || apiKey.app_user.name || "Usuario"}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {formatDate(apiKey.created_at)}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {formatDate(apiKey.last_used_at)}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleEditApiKey(apiKey)}
                        disabled={loading}
                      >
                        Editar
                      </Button>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleShowRegenerateDialog(apiKey)}
                              disabled={loading}
                            >
                              <RefreshCw className="h-3 w-3 mr-1" />
                              Regenerar
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            Generar una nueva API Key manteniendo todas las asociaciones
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-destructive border-destructive hover:bg-destructive/10"
                        onClick={() => handleDeactivateApiKey(apiKey.id)}
                        disabled={loading}
                      >
                        Desactivar
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <ApiKeyFormDialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) {
            setSelectedApiKey(null);
          }
        }}
        apiKey={selectedApiKey}
        onSubmit={handleApiKeySubmit}
        loading={loading}
      />
      
      {/* Diálogo de confirmación para regenerar API Key */}
      <AlertDialog open={isRegenerateDialogOpen} onOpenChange={setIsRegenerateDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {regeneratedKey ? "API Key regenerada con éxito" : "Regenerar API Key"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {regeneratedKey ? (
                <div className="space-y-4">
                  <div className="text-sm">
                    Tu API Key ha sido regenerada exitosamente. Guarda esta nueva clave en un lugar seguro.
                    No podrás verla completa de nuevo.
                  </div>
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-md relative">
                    <code className="text-xs font-mono break-all">{regeneratedKey}</code>
                    <Button 
                      type="button" 
                      size="sm" 
                      variant="ghost" 
                      className="absolute top-1 right-1 h-6 w-6 p-0"
                      onClick={() => {
                        navigator.clipboard.writeText(regeneratedKey);
                        toast.success("API Key copiada al portapapeles");
                      }}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-sm">
                  ¿Estás seguro de que deseas regenerar esta API Key? La clave actual dejará de funcionar
                  inmediatamente y se generará una nueva. Todas las integraciones que usen esta clave
                  deberán actualizarse con la nueva clave.
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            {regeneratedKey ? (
              <Button onClick={handleCloseRegenerateDialog}>
                Entendido, cerrar
              </Button>
            ) : (
              <>
                <AlertDialogCancel disabled={loading}>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleRegenerateApiKey}
                  disabled={loading}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Regenerando...
                    </span>
                  ) : (
                    "Regenerar API Key"
                  )}
                </AlertDialogAction>
              </>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
