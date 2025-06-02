"use client"

import * as React from "react"
import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"

import { 
  Home, 
  Users, 
  BarChart3, 
  FileText, 
  Settings, 
  KeyRound,
  GraduationCap,
  BookOpen,
  ClipboardList,
  BookText,
  ListTree,
  ChevronDown,
  ChevronRight
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface AppSidebarProps {
  user: {
    name?: string | null
    email?: string | null
    username?: string
    image?: string | null
  }
}

// Definir los elementos del menú
const dashboardItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Usuarios",
    url: "/dashboard/users",
    icon: Users,
  },
  {
    title: "Analíticas",
    url: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    title: "Mi Perfil",
    url: "/dashboard/profile",
    icon: Settings,
  },
  {
    title: "Documentación API",
    url: "/dashboard/api-docs",
    icon: FileText,
  },
]

const applicadosItems = [
  {
    title: "Tipos de Pruebas",
    url: "/dashboard/applicados/test-types",
    icon: GraduationCap,
  },
  {
    title: "API Keys",
    url: "/dashboard/applicados/api-keys",
    icon: KeyRound,
  },
  {
    title: "Materias",
    url: "/dashboard/applicados/subjects",
    icon: BookOpen,
  },
  {
    title: "Cuestionarios",
    url: "/dashboard/applicados/questionnaires",
    icon: ClipboardList,
  },
]

export function AppSidebar({ user }: AppSidebarProps) {
  const pathname = usePathname()
  const [glossaryOpen, setGlossaryOpen] = useState(false)
  
  // Función para verificar si un enlace está activo
  const isActive = (path: string) => {
    if (path === "/dashboard" && pathname === "/dashboard") {
      return true
    }
    return path !== "/dashboard" && pathname.startsWith(path)
  }
  
  // Verificar si alguna sección del glosario está activa
  const isGlossaryActive = 
    isActive("/dashboard/applicados/glossary") || 
    isActive("/dashboard/applicados/glossary-categories")

  // Obtener las iniciales del usuario para el avatar
  const getUserInitials = () => {
    if (user.name) {
      return user.name.split(" ").map(n => n[0]).join("").toUpperCase()
    }
    if (user.username) {
      return user.username.substring(0, 2).toUpperCase()
    }
    if (user.email) {
      return user.email.substring(0, 2).toUpperCase()
    }
    return "U"
  }

  return (
    <Sidebar>
      <SidebarHeader className="flex flex-col items-center justify-center p-4 border-b">
        <Avatar className="h-12 w-12 mb-2">
          <AvatarImage src={user.image || ""} alt={user.name || "Usuario"} />
          <AvatarFallback>{getUserInitials()}</AvatarFallback>
        </Avatar>
        <div className="text-center">
          <p className="text-sm font-medium">{user.name || user.username || user.email}</p>
          {user.email && <p className="text-xs text-muted-foreground">{user.email}</p>}
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>General</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {dashboardItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4 mr-2" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Applicados</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Elementos regulares */}
              {applicadosItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4 mr-2" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              
              {/* Menú desplegable para Glosario */}
              <li data-slot="sidebar-menu-item" data-sidebar="menu-item" className="group/menu-item relative">
                <div className="flex flex-col w-full">
                  {/* Botón principal del Glosario */}
                  <SidebarMenuButton 
                    isActive={isGlossaryActive}
                    onClick={() => setGlossaryOpen(!glossaryOpen)}
                    className="flex justify-between items-center"
                  >
                    <div className="flex items-center">
                      <BookText className="h-4 w-4 mr-2" />
                      <span>Glosario</span>
                    </div>
                    <ChevronDown className={`h-4 w-4 transition-transform ${glossaryOpen ? "rotate-180" : ""}`} />
                  </SidebarMenuButton>
                  
                  {/* Submenú del Glosario */}
                  {glossaryOpen && (
                    <div className="ml-6 mt-1 flex flex-col gap-1">
                      <div className="group/menu-item relative">
                        <SidebarMenuButton asChild isActive={isActive("/dashboard/applicados/glossary")}>
                          <Link href="/dashboard/applicados/glossary">
                            <BookText className="h-4 w-4 mr-2" />
                            <span>Términos</span>
                          </Link>
                        </SidebarMenuButton>
                      </div>
                      <div className="group/menu-item relative">
                        <SidebarMenuButton asChild isActive={isActive("/dashboard/applicados/glossary-categories")}>
                          <Link href="/dashboard/applicados/glossary-categories">
                            <ListTree className="h-4 w-4 mr-2" />
                            <span>Categorías</span>
                          </Link>
                        </SidebarMenuButton>
                      </div>
                    </div>
                  )}
                </div>
              </li>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
