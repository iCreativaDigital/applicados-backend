"use client";

import { TestTypesTable, TestType } from "./test-types-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { getTestTypes } from "@/actions/applicados/test-type-actions";

export function TestTypesPage() {
  const [testTypes, setTestTypes] = useState<TestType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestTypes = async () => {
      try {
        setLoading(true);
        const response = await getTestTypes();
        
        if (!response.success) {
          throw new Error(response.errors?._form?.[0] || "Error al cargar los tipos de prueba");
        }
        
        setTestTypes(response.data || []);
      } catch (error) {
        console.error("Error fetching test types:", error);
        setError("No se pudieron cargar los tipos de prueba. Por favor, intenta de nuevo más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchTestTypes();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestión de Tipos de Pruebas</CardTitle>
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
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md"
            >
              Reintentar
            </button>
          </div>
        ) : (
          <TestTypesTable initialTestTypes={testTypes} />
        )}
      </CardContent>
    </Card>
  );
}
