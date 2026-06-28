import GithubIcon from "@/assets/githubIcon.svg?react";
import GoogleIcon from "@/assets/googleIcon.svg?react";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/core/field";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	type SignupFormData,
	signupSchema,
} from "@/features/auth/schemas/signupSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, Mail, Sparkles, User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

export function SignUpForm() {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignupFormData>({
		resolver: zodResolver(signupSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	const onSubmit = (data: SignupFormData) => {
		console.log("Sign up submitted successfully:", data);
	};

	return (
		<Card className="w-full max-w-[400px] border border-border/50 bg-card/60 backdrop-blur-xl shadow-2xl rounded-2xl p-5 sm:p-6 relative overflow-hidden transition-all duration-300 hover:shadow-primary/5 hover:border-primary/20">
			{/* Brand Header */}
			<div className="flex flex-col items-center gap-1.5 sm:gap-2">
				<div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 text-white shadow-lg shadow-indigo-500/20 hover:scale-105 transition-transform duration-300">
					<Sparkles className="h-5 w-5 sm:h-6 sm:w-6" />
				</div>
				<h1 className="text-lg sm:text-xl font-bold tracking-tight text-foreground text-center ">
					Create an Account
				</h1>
				<p className="text-[11px] sm:text-xs text-muted-foreground text-center">
					Get started with Nexora by creating a free account
				</p>
			</div>

			<CardContent className="p-0">
				<form onSubmit={handleSubmit(onSubmit)}>
					<FieldGroup className="gap-4 sm:gap-5">
						{/* Full Name */}
						<Field>
							<FieldLabel
								htmlFor="name"
								className="text-[10px] font-bold text-foreground/80 tracking-wider uppercase mb-1.5"
							>
								Full Name
							</FieldLabel>
							<div className="relative group">
								<User className="absolute left-3 top-[11px] h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors duration-200" />
								<Input
									id="name"
									type="text"
									placeholder="John Doe"
									aria-invalid={!!errors.name}
									className="h-9 pl-9 bg-muted/20 border-border/80 rounded-xl focus-visible:ring-primary/20 focus-visible:border-primary/80 transition-all duration-200 text-xs"
									{...register("name")}
								/>
							</div>
							{errors.name && (
								<FieldError className="text-[11px] mt-1">
									{errors.name.message}
								</FieldError>
							)}
						</Field>

						{/* Email */}
						<Field>
							<FieldLabel
								htmlFor="email"
								className="text-[10px] font-bold text-foreground/80 tracking-wider uppercase mb-1.5"
							>
								Email Address
							</FieldLabel>
							<div className="relative group">
								<Mail className="absolute left-3 top-[11px] h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors duration-200" />
								<Input
									id="email"
									type="email"
									placeholder="name@example.com"
									aria-invalid={!!errors.email}
									className="h-9 pl-9 bg-muted/20 border-border/80 rounded-xl focus-visible:ring-primary/20 focus-visible:border-primary/80 transition-all duration-200 text-xs"
									{...register("email")}
								/>
							</div>
							{errors.email && (
								<FieldError className="text-[11px] mt-1">
									{errors.email.message}
								</FieldError>
							)}
						</Field>

						{/* Password */}
						<Field>
							<FieldLabel
								htmlFor="password"
								className="text-[10px] font-bold text-foreground/80 tracking-wider uppercase mb-1.5"
							>
								Password
							</FieldLabel>
							<div className="relative group">
								<Lock className="absolute left-3 top-[11px] h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors duration-200" />
								<Input
									id="password"
									type={showPassword ? "text" : "password"}
									placeholder="••••••••"
									aria-invalid={!!errors.password}
									className="h-9 pl-9 pr-9 bg-muted/20 border-border/80 rounded-xl focus-visible:ring-primary/20 focus-visible:border-primary/80 transition-all duration-200 text-xs"
									{...register("password")}
								/>
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md hover:bg-muted/60"
								>
									{showPassword ? (
										<EyeOff className="h-4 w-4" />
									) : (
										<Eye className="h-4 w-4" />
									)}
								</button>
							</div>
							{errors.password && (
								<FieldError className="text-[11px] mt-1">
									{errors.password.message}
								</FieldError>
							)}
						</Field>

						{/* Confirm Password */}
						<Field>
							<FieldLabel
								htmlFor="confirmPassword"
								className="text-[10px] font-bold text-foreground/80 tracking-wider uppercase mb-1.5"
							>
								Confirm Password
							</FieldLabel>
							<div className="relative group">
								<Lock className="absolute left-3 top-[11px] h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors duration-200" />
								<Input
									id="confirmPassword"
									type={showConfirmPassword ? "text" : "password"}
									placeholder="••••••••"
									aria-invalid={!!errors.confirmPassword}
									className="h-9 pl-9 pr-9 bg-muted/20 border-border/80 rounded-xl focus-visible:ring-primary/20 focus-visible:border-primary/80 transition-all duration-200 text-xs"
									{...register("confirmPassword")}
								/>
								<button
									type="button"
									onClick={() => setShowConfirmPassword(!showConfirmPassword)}
									className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md hover:bg-muted/60"
								>
									{showConfirmPassword ? (
										<EyeOff className="h-4 w-4" />
									) : (
										<Eye className="h-4 w-4" />
									)}
								</button>
							</div>
							{errors.confirmPassword && (
								<FieldError className="text-[11px] mt-1">
									{errors.confirmPassword.message}
								</FieldError>
							)}
						</Field>

						{/* Submit */}
						<Field className="mt-2">
							<Button
								type="submit"
								className="w-full h-9 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold shadow-md shadow-indigo-500/10 hover:shadow-lg hover:shadow-indigo-500/20 hover:brightness-105 active:scale-[0.99] transition-all duration-200 text-xs"
							>
								Create Account
							</Button>
						</Field>

						{/* Modern Flexbox Separator */}
						<div className="flex items-center gap-3 my-0.5 sm:my-1">
							<div className="h-px flex-1 bg-border/60"></div>
							<span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
								Or sign up with
							</span>
							<div className="h-px flex-1 bg-border/60"></div>
						</div>

						{/* OAuth Buttons */}
						<div className="grid grid-cols-2 gap-2 sm:gap-3">
							<Button
								variant="outline"
								type="button"
								className="h-9 rounded-xl border-border/80 bg-muted/10 hover:bg-muted/40 transition-all duration-200 gap-2 text-xs font-semibold"
							>
								<GoogleIcon className="size-4" />
								<span>Google</span>
							</Button>
							<Button
								variant="outline"
								type="button"
								className="h-9 rounded-xl border-border/80 bg-muted/10 hover:bg-muted/40 transition-all duration-200 gap-2 text-xs font-semibold"
							>
								<GithubIcon className="size-4" />
								<span>GitHub</span>
							</Button>
						</div>

						{/* Sign up link */}
						<p className="text-center text-[11px] text-muted-foreground ">
							Already have an account?{" "}
							<Link
								to="/login"
								className="font-semibold text-primary hover:text-primary/80 hover:underline underline-offset-4 transition-colors"
							>
								Log in
							</Link>
						</p>
					</FieldGroup>
				</form>
			</CardContent>
		</Card>
	);
}
