"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TestType } from "./test-types-table";
import { TestTypeFormData } from "@/actions/applicados/test-type-actions";
import { getApiKeys } from "@/actions/applicados/api-key-actions";

interface ApiKey {
  id: string;
  name: string;
  key: string;
  app_user: {
    id: string;
    name: string | null;
    company_name: string | null;
  };
}

interface TestTypeFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  testType: TestType | null;
  isCreating: boolean;
  onSubmit: (data: TestTypeFormData) => void;
}

type FormData = {
  name: string;
  description: string;
  api_key_id: string;
};

export function TestTypeFormDialog({
  open,
  onOpenChange,
  testType,
  isCreating,
  onSubmit,
}: TestTypeFormDialogProps) {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedApiKey, setSelectedApiKey] = useState<string>(testType?.api_key_id || "global");
  
  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<FormData>({
    defaultValues: {
      name: testType?.name || "",
      description: testType?.description || "",
      api_key_id: testType?.api_key_id || "global",
    },
  });

  // Cargar las API Keys cuando se abre el diálogo
  useEffect(() => {
    if (open) {
      setLoading(true);
      getApiKeys().then((response) => {
        if (response.success && response.data) {
          setApiKeys(response.data);
        }
        setLoading(false);
      });
    }
  }, [open]);

  // Resetear el formulario cuando cambia el tipo de prueba o el estado de creación
  useEffect(() => {
    if (open) {
      reset({
        name: testType?.name || "",
        description: testType?.description || "",
        api_key_id: testType?.api_key_id || "global",
      });
      setSelectedApiKey(testType?.api_key_id || "global");
    }
  }, [open, testType, reset]);
  
  // Actualizar el valor del formulario cuando cambia el API Key seleccionado
  useEffect(() => {
    setValue('api_key_id', selectedApiKey);
  }, [selectedApiKey, setValue]);

  const onFormSubmit = (data: FormData) => {
    // Convertir api_key_id vacío o 'global' a null para la base de datos
    const apiKeyId = data.api_key_id === "" || data.api_key_id === "global" ? null : data.api_key_id || null;
    
    onSubmit({
      name: data.name,
      description: data.description || null,
      api_key_id: apiKeyId,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isCreating ? "Crear Nuevo Tipo de Prueba" : "Editar Tipo de Prueba"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre <span className="text-destructive">*</span></Label>
            <Input
              id="name"
              {...register("name", { 
                required: "El nombre es requerido",
                maxLength: {
                  value: 100,
                  message: "El nombre no puede tener más de 100 caracteres"
                }
              })}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              {...register("description", {
                maxLength: {
                  value: 500,
                  message: "La descripción no puede tener más de 500 caracteres"
                }
              })}
              placeholder="Descripción opcional del tipo de prueba"
              rows={4}
            />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="api_key_id">API Key (Empresa)</Label>
            {apiKeys.length > 0 ? (
              <>
                <Select
                  value={selectedApiKey}
                  onValueChange={(value) => setSelectedApiKey(value)}
                  disabled={loading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar API Key" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="global">Sin asociación (Global)</SelectItem>
                    {apiKeys.map((apiKey) => (
                      <SelectItem key={apiKey.id} value={apiKey.id}>
                        {apiKey.name} - {apiKey.app_user.company_name || apiKey.app_user.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Asociar este tipo de prueba a una empresa específica. Si no selecciona ninguna, será global.
                </p>
              </>
            ) : (
              <div className="rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
                <p className="font-medium">No hay API Keys disponibles</p>
                <p className="mt-1">Debe crear una API Key antes de poder asociarla a un tipo de prueba.</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2 border-amber-300 bg-amber-100 hover:bg-amber-200"
                  onClick={() => {
                    onOpenChange(false);
                    // Redirigir a la página de API Keys
                    window.location.href = "/dashboard/applicados/api-keys";
                  }}
                >
                  Ir a gestión de API Keys
                </Button>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              {isCreating ? "Crear" : "Guardar Cambios"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
