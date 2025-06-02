import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { Navbar } from "@/components/dashboard/navbar";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

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
    <SidebarProvider>
      <div className="min-h-screen bg-gray-50 flex w-full">
        <AppSidebar user={session.user} />
        <div className="flex-1">
          <Navbar user={session.user} />
          <main className="pt-16 px-4 md:px-6 lg:px-8">
            <div className="py-4">
              <SidebarTrigger className="mb-4 md:hidden" />
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
