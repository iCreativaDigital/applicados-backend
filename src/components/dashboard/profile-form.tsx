"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { updateUserProfile } from "@/actions/user"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ProfileFormProps {
  user: {
    id: string
    name?: string | null
    email?: string | null
    username?: string
    company_name?: string | null
    phone?: string | null
    website?: string | null
  }
}

export function ProfileForm({ user }: ProfileFormProps) {
  const [name, setName] = useState(user.name || "")
  const [companyName, setCompanyName] = useState(user.company_name || "")
  const [phone, setPhone] = useState(user.phone || "")
  const [website, setWebsite] = useState(user.website || "")
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const result = await updateUserProfile(user.id, {
        name,
        company_name: companyName,
        phone,
        website
      })
      
      if (result.success) {
        toast.success("Perfil actualizado correctamente")
      } else {
        toast.error(result.error || "Error al actualizar el perfil")
      }
    } catch (error) {
      console.error("Error al actualizar el perfil:", error)
      toast.error("Error al actualizar el perfil")
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Información personal</CardTitle>
        <CardDescription>
          Actualiza tu información personal
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={user.email || ""}
              disabled
              className="bg-gray-100"
            />
            <p className="text-xs text-gray-500">
              El email no se puede modificar
            </p>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="username">Nombre de usuario</Label>
            <Input
              id="username"
              type="text"
              value={user.username || ""}
              disabled
              className="bg-gray-100"
            />
            <p className="text-xs text-gray-500">
              El nombre de usuario no se puede modificar
            </p>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="name">Nombre completo</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="company">Empresa</Label>
            <Input
              id="company"
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="phone">Teléfono</Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+34 123 456 789"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="website">Página web (donde usarás la API)</Label>
            <Input
              id="website"
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://ejemplo.com"
            />
            <p className="text-xs text-gray-500">
              Este campo es informativo para conocer dónde se utilizará nuestra API
            </p>
          </div>
          
          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Guardando..." : "Guardar cambios"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
