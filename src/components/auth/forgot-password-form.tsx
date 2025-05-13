"use client"

import { useState } from "react"
import { useFormState } from "react-dom"
import { forgotPassword } from "@/actions/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import Link from "next/link"

// Definir los posibles estados del formulario de manera más estricta
type FormState = 
  | { success: true; message: string; error?: undefined }
  | { error: string; success: false; message?: undefined }
  | { success?: undefined; error?: undefined; message?: undefined }

const initialState: FormState = { success: undefined, error: undefined, message: undefined }

export function ForgotPasswordForm() {
  const [state, formAction] = useFormState(forgotPasswordWithFormState, initialState)
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
    toast.success(state.message || "Se ha enviado un enlace de recuperación a tu correo electrónico.")
  }
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Recuperar contraseña</CardTitle>
        <CardDescription className="text-center">
          Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Correo electrónico
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="correo@ejemplo.com"
              required
              className="w-full"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Enviando..." : "Enviar enlace de recuperación"}
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
const forgotPasswordWithFormState = async (prevState: FormState, formData: FormData): Promise<FormState> => {
  const email = formData.get("email") as string
  
  if (!email) {
    return { error: "El correo electrónico es requerido", success: false }
  }
  
  try {
    const result = await forgotPassword(email)
    
    if (result.success) {
      return { 
        success: true, 
        message: result.message || "Se ha enviado un enlace de recuperación a tu correo electrónico."
      }
    } else {
      return { 
        error: result.error || "Ha ocurrido un error al procesar la solicitud", 
        success: false 
      }
    }
  } catch (error) {
    console.error("Error al solicitar recuperación de contraseña:", error)
    return { 
      error: "Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo más tarde.", 
      success: false 
    }
  }
}
