import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Autenticación | Quintero and Associates",
  description: "Acceso a servicios profesionales de contabilidad, impuestos y negocios",
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
}
