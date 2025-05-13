import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { ProfileForm } from "@/components/dashboard/profile-form";
import { ChangePasswordForm } from "@/components/dashboard/change-password-form";

export default async function ProfilePage() {
  // Verificar autenticación
  const session = await auth();
  
  if (!session || !session.user) {
    // Redirigir al login si no hay sesión
    redirect("/auth/login");
  }
  
  // Obtener datos completos del usuario desde la base de datos
  const userData = await prisma.appUser.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      username: true,
      company_name: true,
      phone: true,
      website: true
    }
  });
  
  if (!userData) {
    redirect("/auth/login");
  }
  
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Mi Perfil</h1>
      
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <ProfileForm user={userData} />
        </div>
        
        <div>
          <ChangePasswordForm userId={userData.id} />
        </div>
      </div>
    </div>
  );
}
