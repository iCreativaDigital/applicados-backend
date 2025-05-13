"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { login } from "@/actions/auth"
import { useRouter } from "next/navigation"


interface LoginFormProps {
  className?: string
}

export function LoginForm({ className }: LoginFormProps) {
  const [emailOrUsername, setEmailOrUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Limpiar error previo
    setError(null)
    
    if (!emailOrUsername || !password) {
      toast.error("Por favor, completa todos los campos")
      return
    }
    
    setIsLoading(true)
    
    try {
      // Intentar iniciar sesión
      const result = await login(emailOrUsername, password);
      console.log('Resultado de login:', result)
      
      if (result?.success) {
        // Login exitoso
        toast.success("Inicio de sesión exitoso")
        
        // Redirigir a la página de selección de cuenta en lugar del dashboard
        router.push('/dashboard')
      } else if (result?.error) {
        // Error con mensaje específico
        setError(result.error)
        toast.error(result.error)
      } else {
        // Respuesta inesperada
        setError('Error inesperado al iniciar sesión')
        toast.error("Error inesperado al iniciar sesión")
      }
    } catch (error: any) {
      // Error de excepción
      console.error('Excepción en el formulario de login:', error)
      
      const errorMessage = error?.message || "Error al iniciar sesión. Verifica tus credenciales."
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form className={cn("flex flex-col gap-6", className)} onSubmit={handleSubmit}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Sign in</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your credentials to access your account
        </p>
      </div>
      {error && (
        <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
          {error}
        </div>
      )}
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="emailOrUsername">Email o nombre de usuario</Label>
          <Input 
            id="emailOrUsername" 
            type="text" 
            placeholder="ejemplo@correo.com o username" 
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
            required 
            className={error ? "border-destructive" : ""}
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="/auth/forgot-password"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot password?
            </a>
          </div>
          <Input 
            id="password" 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
            className={error ? "border-destructive" : ""}
          />
        </div>
        <Button type="submit" className="w-full cursor-pointer hover:bg-accent hover:text-accent-foreground" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </div>
      <div className="text-center text-sm">
        Don't have an account?{" "}
        <a href="/auth/signup" className="underline underline-offset-4">
          Register
        </a>
      </div>
    </form>
  )
}
