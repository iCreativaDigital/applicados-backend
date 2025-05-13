"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { signup } from "@/actions/auth"
import { useRouter } from "next/navigation"

interface SignupFormProps {
  className?: string
}

export function SignupForm({ className }: SignupFormProps) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Limpiar error previo
    setError(null)
    
    if (!username || !email || !password || !confirmPassword) {
      toast.error("Por favor, completa todos los campos obligatorios")
      return
    }
    
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden")
      toast.error("Las contraseñas no coinciden")
      return
    }
    
    setIsLoading(true)
    
    try {
      // Crear FormData para enviar al servidor
      const formData = new FormData()
      formData.append("username", username)
      formData.append("email", email)
      formData.append("password", password)
      formData.append("confirmPassword", confirmPassword)
      
      if (name) formData.append("name", name)
      if (companyName) formData.append("company_name", companyName)
      if (phone) formData.append("phone", phone)
      
      // Intentar registrar al usuario
      const result = await signup(formData)
      
      if (result?.success) {
        // Registro exitoso
        toast.success("Registro exitoso. Ahora puedes iniciar sesión.")
        router.push('/auth/login')
      } else if (result?.error) {
        // Error con mensaje específico
        setError(result.error)
        toast.error(result.error)
      } else {
        // Respuesta inesperada
        setError('Error inesperado al registrar usuario')
        toast.error("Error inesperado al registrar usuario")
      }
    } catch (error: any) {
      // Error de excepción
      console.error('Excepción en el formulario de registro:', error)
      
      const errorMessage = error?.message || "Error al registrar usuario."
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form className={cn("flex flex-col gap-6", className)} onSubmit={handleSubmit}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Crear cuenta</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Ingresa tus datos para crear una cuenta
        </p>
      </div>
      {error && (
        <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
          {error}
        </div>
      )}
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="username">Nombre de usuario *</Label>
          <Input 
            id="username" 
            type="text" 
            placeholder="usuario123" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required 
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email *</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="ejemplo@correo.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="name">Nombre completo</Label>
          <Input 
            id="name" 
            type="text" 
            placeholder="Juan Pérez" 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="company_name">Empresa</Label>
          <Input 
            id="company_name" 
            type="text" 
            placeholder="Nombre de tu empresa" 
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phone">Teléfono</Label>
          <Input 
            id="phone" 
            type="tel" 
            placeholder="+1234567890" 
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Contraseña *</Label>
          <Input 
            id="password" 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="confirmPassword">Confirmar contraseña *</Label>
          <Input 
            id="confirmPassword" 
            type="password" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required 
          />
        </div>
        <Button type="submit" className="w-full cursor-pointer hover:bg-accent hover:text-accent-foreground" disabled={isLoading}>
          {isLoading ? "Registrando..." : "Registrarse"}
        </Button>
      </div>
      <div className="text-center text-sm">
        ¿Ya tienes una cuenta?{" "}
        <a href="/auth/login" className="underline underline-offset-4">
          Iniciar sesión
        </a>
      </div>
    </form>
  )
}
