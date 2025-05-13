import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getUserApiKeys } from "@/actions/auth";
import { ApiKeyList } from "@/components/dashboard/api-key-list";
import { CreateApiKeyForm } from "@/components/dashboard/create-api-key-form";

export default async function DashboardPage() {
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
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Información de usuario</h2>
            <div className="space-y-2">
              <p><span className="font-medium">Nombre:</span> {session.user.name || "No especificado"}</p>
              <p><span className="font-medium">Email:</span> {session.user.email}</p>
              <p><span className="font-medium">Usuario:</span> {session.user.username}</p>
            </div>
            <div className="mt-4">
              <a href="/dashboard/profile" className="text-blue-600 hover:underline flex items-center">
                Editar perfil
              </a>
            </div>
          </div>
        </div>
        
        <div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Crear API Key</h2>
            <CreateApiKeyForm userId={session.user.id} />
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Mis API Keys</h2>
          {apiKeysResult.success ? (
            <ApiKeyList apiKeys={apiKeysResult.apiKeys} userId={session.user.id} />
          ) : (
            <p className="text-red-500">{apiKeysResult.error || "Error al cargar las API Keys"}</p>
          )}
        </div>
      </div>
    </div>
  );
}
