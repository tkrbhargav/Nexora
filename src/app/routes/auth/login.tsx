import { LoginForm } from "@/features/auth";

export default function LoginPage(){
  return (
    <div className="flex items-center justify-center min-h-screen w-full px-4 bg-background">
      <LoginForm />
    </div>
  )
}