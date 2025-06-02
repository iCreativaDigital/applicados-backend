"use client"

import Link from "next/link"
import { logout } from "@/actions/auth"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { LogOut, Bell } from "lucide-react"

interface NavbarProps {
  user: {
    name?: string | null
    email?: string | null
    username?: string
    image?: string | null
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
    <nav className="fixed top-0 right-0 left-0 bg-white shadow-sm z-10">
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <SidebarTrigger className="md:hidden mr-2" />
          <Link href="/dashboard" className="text-xl font-bold text-blue-600">
            Applicados
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-500 hover:text-blue-600 rounded-full hover:bg-gray-100">
            <Bell className="h-5 w-5" />
          </button>
          
          <button
            onClick={handleLogout}
            className="p-2 text-gray-500 hover:text-red-600 rounded-full hover:bg-gray-100"
            title="Cerrar sesión"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </nav>
  )
}
