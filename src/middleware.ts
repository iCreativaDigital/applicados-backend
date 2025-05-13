import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/auth";

// Rutas que no requieren autenticación
const publicRoutes = [
  "/auth/login",
  "/auth/signup",
  "/auth/forgot-password",
  "/auth/reset-password",
  "/api/v1/auth/login",
  "/api/v1/auth/register",
  "/api/v1/auth/forgot-password",
  "/api/v1/auth/reset-password",
];

// Rutas que siempre deben redirigir al dashboard si el usuario está autenticado
const authRoutes = [
  "/auth/login",
  "/auth/signup",
  "/auth/forgot-password",
  "/auth/reset-password",
];

export async function middleware(request: NextRequest) {
  const session = await auth();
  const { pathname } = request.nextUrl;
  
  // Verificar si la ruta actual es pública
  const isPublicRoute = publicRoutes.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  );
  
  // Verificar si la ruta actual es de autenticación
  const isAuthRoute = authRoutes.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  );
  
  // Si el usuario está autenticado y está intentando acceder a una ruta de autenticación,
  // redirigirlo al dashboard
  if (session?.user && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  
  // Si el usuario no está autenticado y está intentando acceder a una ruta protegida,
  // redirigirlo al login
  if (!session?.user && !isPublicRoute) {
    const url = new URL("/auth/login", request.url);
    url.searchParams.set("callbackUrl", encodeURI(request.url));
    return NextResponse.redirect(url);
  }
  
  return NextResponse.next();
}

// Configurar las rutas a las que se aplicará el middleware
export const config = {
  matcher: [
    // Rutas que requieren el middleware
    "/((?!api/v1/auth|_next/static|_next/image|favicon.ico).*)",
  ],
};
