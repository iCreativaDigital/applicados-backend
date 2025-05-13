
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  
  // Si el usuario está autenticado, redirigir al dashboard
  // Si no, redirigir a la página de login
  if (session?.user) {
    redirect("/dashboard");
  } else {
    redirect("/auth/login");
  }
  
  // Este código nunca se ejecutará debido a las redirecciones
  return null;
}
