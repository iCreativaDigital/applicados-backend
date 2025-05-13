import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-muted/40">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-background p-6 shadow-lg">
        <LoginForm />
      </div>
    </div>
  )
}
