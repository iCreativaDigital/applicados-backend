import { SignupForm } from "@/components/auth/signup-form"

export default function SignupPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-muted/40">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-background p-6 shadow-lg">
        <SignupForm />
      </div>
    </div>
  )
}