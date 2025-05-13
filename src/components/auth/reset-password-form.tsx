"use client"

import { useState } from "react"
import { useFormState } from "react-dom"
import { resetPassword } from "@/actions/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface FormState {
  error?: string
  success?: boolean
}

interface ResetPasswordFormProps {
  token: string
}

const initialState: FormState = {}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const router = useRouter()
  const [state, formAction] = useFormState(
    (prevState: FormState, formData: FormData) => resetPasswordWithFormState(prevState, formData, token),
    initialState
  )
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    try {
      await formAction(formData)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  // Mostrar toast cuando hay un error o éxito
  if (state.error) {
    toast.error(state.error)
  } else if (state.success) {
    toast.success("Contraseña restablecida correctamente")
    // Redirigir al login después de un restablecimiento exitoso
    setTimeout(() => {
      router.push("/auth/login")
    }, 2000)
  }
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Restablecer contraseña</CardTitle>
        <CardDescription className="text-center">
          Crea una nueva contraseña para tu cuenta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Nueva contraseña
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              className="w-full"
              minLength={8}
            />
            <p className="text-xs text-gray-500">
              La contraseña debe tener al menos 8 caracteres
            </p>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium">
              Confirmar contraseña
            </label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              className="w-full"
              minLength={8}
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Restableciendo..." : "Restablecer contraseña"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <div className="text-sm text-gray-500">
          <Link href="/auth/login" className="text-blue-600 hover:underline">
            Volver al inicio de sesión
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}

// Función auxiliar para manejar el estado del formulario
const resetPasswordWithFormState = async (prevState: FormState, formData: FormData, token: string) => {
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirmPassword") as string
  
  if (password !== confirmPassword) {
    return { error: "Las contraseñas no coinciden", success: false }
  }
  
  if (password.length < 8) {
    return { error: "La contraseña debe tener al menos 8 caracteres", success: false }
  }
  
  const result = await resetPassword(token, password)
  return result
}
