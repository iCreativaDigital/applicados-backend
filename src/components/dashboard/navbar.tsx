"use client"

import Link from "next/link"
import { logout } from "@/actions/auth"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface NavbarProps {
  user: {
    name?: string | null
    email?: string | null
    username?: string
  }
}

export function Navbar({ user }: NavbarProps) {
  const router = useRouter()
  
  const handleLogout = async () => {
    try {
      await logout()
      toast.success("Sesión cerrada correctamente")
      router.push("/auth/login")
    } catch (error) {
      console.error("Error al cerrar sesión:", error)
      toast.error("Error al cerrar sesión")
    }
  }
  
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/dashboard" className="text-xl font-bold text-blue-600">
            Auth Microservice
          </Link>
          
          <div className="hidden md:flex ml-10 space-x-6">
            <Link href="/dashboard" className="text-gray-600 hover:text-blue-600">
              Dashboard
            </Link>
            <Link href="/dashboard/profile" className="text-gray-600 hover:text-blue-600">
              Mi Perfil
            </Link>
            <Link href="/dashboard/api-docs" className="text-gray-600 hover:text-blue-600">
              Documentación API
            </Link>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Link href="/dashboard/profile" className="flex items-center text-sm text-gray-600 hover:text-blue-600">
            <span className="mr-2">{user.name || user.username || user.email}</span>
          </Link>
          
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </nav>
  )
}
