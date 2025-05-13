import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { Navbar } from "@/components/dashboard/navbar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Verificar autenticación
  const session = await auth();
  
  if (!session || !session.user) {
    // Redirigir al login si no hay sesión
    redirect("/auth/login");
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={session.user} />
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
}
