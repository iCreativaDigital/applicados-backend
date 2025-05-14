import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getUserApiKeys } from "@/actions/auth";
import { UsersPageClient } from "@/components/dashboard/users/users-page-client";

export default async function UsersPage() {
  // Verificar autenticación
  const session = await auth();
  
  if (!session || !session.user) {
    // Redirigir al login si no hay sesión
    redirect("/auth/login");
  }
  
  // Obtener las API Keys del usuario
  const apiKeysResult = await getUserApiKeys(session.user.id);
  
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Gestión de Usuarios</h1>
      
      {/* Componente del cliente para manejar la interactividad */}
      <UsersPageClient 
        apiKeysResult={apiKeysResult} 
      />
    </div>
  );
}
