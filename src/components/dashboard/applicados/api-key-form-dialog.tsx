"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ApiKey } from "./api-keys-table";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Copy } from "lucide-react";
import { toast } from "sonner";

interface ApiKeyFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  apiKey: ApiKey | null;
  onSubmit: (data: any) => Promise<{ key?: string } | undefined>;
  loading?: boolean;
}

interface FormData {
  name: string;
}

export function ApiKeyFormDialog({
  open,
  onOpenChange,
  apiKey,
  onSubmit,
  loading: externalLoading,
}: ApiKeyFormDialogProps) {
  const [internalLoading, setInternalLoading] = useState(false);
  const [newApiKey, setNewApiKey] = useState<string | null>(null);
  
  // Usar el estado de carga externo si se proporciona, de lo contrario usar el interno
  const loading = externalLoading !== undefined ? externalLoading : internalLoading;
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    defaultValues: {
      name: apiKey?.name || "",
    },
  });

  // Resetear el formulario cuando se abre/cierra el diálogo o cambia la API Key seleccionada
  useEffect(() => {
    if (open) {
      reset({
        name: apiKey?.name || "",
      });
      setNewApiKey(null);
    }
  }, [open, apiKey, reset]);

  const onFormSubmit = async (data: FormData) => {
    if (externalLoading === undefined) {
      setInternalLoading(true);
    }
    
    try {
      // Preparar los datos para enviar al componente padre
      if (!apiKey) {
        // Crear nueva API Key
        const result = await onSubmit({
          name: data.name,
        });
        
        // Si el resultado contiene una API Key generada, mostrarla
        if (result && result.key) {
          setNewApiKey(result.key);
        }
      } else {
        // Actualizar API Key existente
        await onSubmit({
          name: data.name,
          apiKeyId: apiKey.id,
        });
      }
    } catch (error) {
      console.error("Error en el formulario:", error);
    } finally {
      if (externalLoading === undefined) {
        setInternalLoading(false);
      }
      
      // No cerramos el diálogo si se mostró una nueva API Key
      if (!newApiKey) {
        onOpenChange(false);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {apiKey ? "Editar API Key" : "Crear nueva API Key"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre</Label>
            <Input
              id="name"
              placeholder="Nombre descriptivo para esta API Key"
              {...register("name", { required: "El nombre es obligatorio" })}
              disabled={loading}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>
          
          {/* Mostrar la API Key generada si está disponible */}
          {newApiKey && (
            <div className="p-4 border rounded-md bg-amber-50 border-amber-200">
              <p className="text-sm font-medium text-amber-800">
                ¡API Key creada con éxito!
              </p>
              <p className="text-xs text-amber-700 mt-1">
                Guarda esta clave en un lugar seguro. No podrás verla completa de nuevo.
              </p>
              <div className="mt-2 p-2 bg-white rounded border border-amber-300 relative">
                <code className="text-xs font-mono break-all">{newApiKey}</code>
                <Button 
                  type="button" 
                  size="sm" 
                  variant="ghost" 
                  className="absolute top-1 right-1 h-6 w-6 p-0"
                  onClick={() => {
                    navigator.clipboard.writeText(newApiKey);
                    toast.success("API Key copiada al portapapeles");
                  }}
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
              <div className="mt-4 flex justify-end">
                <Button 
                  type="button" 
                  onClick={() => {
                    setNewApiKey("");
                    onOpenChange(false);
                  }}
                >
                  Entendido, cerrar
                </Button>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {apiKey ? "Actualizando..." : "Creando..."}
                </span>
              ) : (
                apiKey ? "Actualizar" : "Crear"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
