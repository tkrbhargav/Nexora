import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function NotFoundPage() {
	return (
		<div className="relative flex min-h-screen items-center justify-center bg-background px-4 overflow-hidden">

			{/* Radial gradient background */}
			<div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.12),transparent_65%)]" />

			{/* Soft corner blobs */}
			<div
				aria-hidden
				className="pointer-events-none absolute -top-40 -left-40 size-[480px] rounded-full bg-primary/8 blur-[100px]"
			/>
			<div
				aria-hidden
				className="pointer-events-none absolute -bottom-40 -right-40 size-[380px] rounded-full bg-primary/6 blur-[90px]"
			/>

			<Card
				className="
					relative w-full max-w-md text-center
					border-border/50
					bg-card/90 backdrop-blur-xl
					shadow-[0_8px_48px_rgba(0,0,0,0.18)]
					dark:shadow-[0_8px_48px_rgba(255,255,255,0.06)]
				"
			>
				
				<CardHeader className="items-center space-y-5 pt-8">

					{/* Layered glowing numeral */}
					<div className="relative select-none leading-none">
						<span
							aria-hidden
							className="absolute inset-0 text-[100px] font-black leading-none text-primary/20 blur-3xl font-heading"
						>
							404
						</span>
						<span className="relative text-[100px] font-black leading-none tracking-tight text-primary font-heading drop-shadow-[0_2px_24px_hsl(var(--primary)/0.4)]">
							404
						</span>
					</div>

					<div className="space-y-1.5">
						<CardTitle className="text-xl font-bold">Page not found</CardTitle>
						<CardDescription className="text-sm leading-relaxed max-w-xs mx-auto">
							The page you're looking for doesn't exist or has been moved.
						</CardDescription>
					</div>
				</CardHeader>

				<CardContent className="pb-8 pt-2">
					<Button
						className="
							rounded-full px-8 gap-2
							bg-primary text-white font-semibold
							shadow-lg shadow-primary/30
							hover:shadow-primary/50 hover:scale-[1.03]
							active:scale-[0.98]
							transition-all duration-200
						"
						onClick={() => window.history.back()}
					>
						<ArrowLeft className="size-4" />
						Go Back
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}