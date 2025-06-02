"use client";

import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
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
import { PencilIcon, TrashIcon } from "lucide-react";
import { TestTypeFormDialog } from "./test-type-form-dialog";
import { deleteTestType, TestTypeFormData } from "@/actions/applicados/test-type-actions";
import { toast } from "sonner";

export type TestType = {
  id: string;
  name: string;
  description: string | null;
  api_key_id: string | null;
  created_at: Date;
  updated_at: Date;
  api_key?: {
    id: string;
    name: string;
    app_user?: {
      id: string;
      name: string | null;
      company_name: string | null;
    };
  } | null;
};

interface TestTypesTableProps {
  initialTestTypes: TestType[];
}

export function TestTypesTable({ initialTestTypes }: TestTypesTableProps) {
  const [testTypes, setTestTypes] = useState<TestType[]>(initialTestTypes);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [currentTestType, setCurrentTestType] = useState<TestType | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleEdit = (testType: TestType) => {
    setCurrentTestType(testType);
    setIsCreating(false);
    setIsFormDialogOpen(true);
  };

  const handleCreate = () => {
    setCurrentTestType(null);
    setIsCreating(true);
    setIsFormDialogOpen(true);
  };

  const handleDelete = (testType: TestType) => {
    setCurrentTestType(testType);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!currentTestType) return;
    
    try {
      const response = await deleteTestType(currentTestType.id);
      
      if (response.success) {
        setTestTypes(testTypes.filter(t => t.id !== currentTestType.id));
        toast.success(response.message || "Tipo de prueba eliminado correctamente");
      } else {
        console.error("Error al eliminar el tipo de prueba");
        toast.error(response.errors?._form?.[0] || "Error al eliminar el tipo de prueba");
      }
    } catch (error) {
      console.error("Error al eliminar el tipo de prueba:", error);
      toast.error("Error al eliminar el tipo de prueba");
    } finally {
      setIsDeleteDialogOpen(false);
      setCurrentTestType(null);
    }
  };

  const handleFormSubmit = async (formData: TestTypeFormData) => {
    try {
      if (isCreating) {
        // Importar dinámicamente para evitar errores de SSR
        const { createTestType } = await import("@/actions/applicados/test-type-actions");
        
        // Crear nuevo tipo de prueba
        const response = await createTestType(formData);
        
        if (response.success && response.data) {
          setTestTypes([...testTypes, response.data]);
          toast.success(response.message || "Tipo de prueba creado correctamente");
        } else {
          toast.error(response.errors?._form?.[0] || "Error al crear el tipo de prueba");
        }
      } else if (currentTestType) {
        // Importar dinámicamente para evitar errores de SSR
        const { updateTestType } = await import("@/actions/applicados/test-type-actions");
        
        // Actualizar tipo de prueba existente
        const response = await updateTestType(currentTestType.id, formData);
        
        if (response.success && response.data) {
          setTestTypes(testTypes.map(t => t.id === response.data.id ? response.data : t));
          toast.success(response.message || "Tipo de prueba actualizado correctamente");
        } else {
          toast.error(response.errors?._form?.[0] || "Error al actualizar el tipo de prueba");
        }
      }
    } catch (error) {
      console.error("Error al guardar el tipo de prueba:", error);
      toast.error("Error al guardar el tipo de prueba");
    } finally {
      setIsFormDialogOpen(false);
      setCurrentTestType(null);
      setIsCreating(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Tipos de Pruebas</h2>
        <Button onClick={handleCreate}>Crear Nuevo Tipo de Prueba</Button>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead>Empresa / API Key</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {testTypes.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No hay tipos de prueba registrados
              </TableCell>
            </TableRow>
          ) : (
            testTypes.map((testType) => (
              <TableRow key={testType.id}>
                <TableCell className="font-medium">{testType.name}</TableCell>
                <TableCell>{testType.description || "--"}</TableCell>
                <TableCell>
                  {testType.api_key ? (
                    <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20">
                      {testType.api_key.app_user?.company_name || testType.api_key.name}
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                      Global
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(testType)}
                    title="Editar"
                  >
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(testType)}
                    title="Eliminar"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      
      {/* Diálogo de confirmación para eliminar */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará permanentemente el tipo de prueba &quot;{currentTestType?.name}&quot;.
              Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground">
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* Formulario para crear/editar */}
      <TestTypeFormDialog
        open={isFormDialogOpen}
        onOpenChange={setIsFormDialogOpen}
        testType={currentTestType}
        isCreating={isCreating}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}
