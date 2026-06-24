import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/core/field"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export function LoginForm() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form>
          <FieldGroup>
            {/* Email */}
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </Field>

            {/* Password */}
            <Field>
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <a
                  href="#"
                  className="text-xs text-muted-foreground underline-offset-4 hover:underline hover:text-primary transition-colors"
                >
                  Forgot password?
                </a>
              </div>
              <Input id="password" type="password" required />
            </Field>

            {/* Submit */}
            <Field>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </Field>

            {/* Divider */}
            <FieldSeparator>or</FieldSeparator>

            {/* OAuth */}
            <Field>
              <Button variant="outline" type="button" className="w-full">
                Login with Google
              </Button>
            </Field>

            {/* Sign up link */}
            <FieldDescription className="text-center">
              Don&apos;t have an account?{" "}
              <a href="/signup" className="font-medium text-primary hover:underline underline-offset-4">
                Sign up
              </a>
            </FieldDescription>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
