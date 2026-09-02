import { useTheme } from "@/components/theme-provider";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Bell, Monitor, Moon, MoreVertical, Search, Sun, Zap } from "lucide-react";
import { useState } from "react";

export function AppTopbar() {
	const [searchFocused, setSearchFocused] = useState(false);
	const { theme, resolvedTheme, setTheme } = useTheme();
	const isDark = resolvedTheme === "dark";

	return (
		<header className="fixed top-0 left-0 right-0 z-50 flex items-center h-16 px-6 border-b border-border/50 bg-background/80 backdrop-blur-md shrink-0 gap-4">
			{/* Brand */}
			<div className="flex items-center gap-2.5 shrink-0">
				<div className="flex items-center justify-center size-8 rounded-xl bg-primary">
					<Zap size={16} className="text-primary-foreground fill-primary-foreground" />
				</div>
				<span className="text-xl font-bold tracking-tight font-heading">Nexora</span>
			</div>

			{/* Spacer */}
			<div className="flex-1" />

			{/* Search — right side */}
			<div
				className={cn(
					"flex items-center relative w-full max-w-xs h-9 rounded-lg border bg-muted/30 transition-all duration-200",
					searchFocused
						? "border-primary/50 ring-1 ring-primary/20 bg-background max-w-sm"
						: "border-border/50 hover:border-border",
				)}
			>
				<Search
					size={15}
					className={cn(
						"absolute left-3 shrink-0 transition-colors z-10",
						searchFocused ? "text-primary" : "text-muted-foreground",
					)}
				/>
				<Input
					type="text"
					placeholder="Search..."
					onFocus={() => setSearchFocused(true)}
					onBlur={() => setSearchFocused(false)}
					className="flex-1 pl-9 pr-14 h-full bg-transparent text-sm border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/50"
				/>
				<kbd className="hidden sm:flex absolute right-2.5 items-center gap-0.5 text-[10px] font-medium text-muted-foreground/50 border border-border/50 bg-muted/40 rounded px-1.5 py-0.5 z-10">
					⌘F
				</kbd>
			</div>

			{/* Actions */}
			<div className="flex items-center gap-2 shrink-0">
				{/* Theme toggle */}
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="icon" className="relative size-8 rounded-lg hover:bg-accent/60 transition-colors">
							<Sun className={cn("h-4 w-4 transition-all duration-300 text-muted-foreground", isDark ? "scale-0 -rotate-90 absolute" : "scale-100 rotate-0")} />
							<Moon className={cn("h-4 w-4 transition-all duration-300 text-muted-foreground", isDark ? "scale-100 rotate-0" : "scale-0 rotate-90 absolute")} />
							<span className="sr-only">Toggle theme</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="w-36">
						<DropdownMenuItem onClick={() => setTheme("light")} className={cn("gap-2", theme === "light" && "text-primary font-medium")}>
							<Sun size={14} />
							Light
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => setTheme("dark")} className={cn("gap-2", theme === "dark" && "text-primary font-medium")}>
							<Moon size={14} />
							Dark
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => setTheme("system")} className={cn("gap-2", theme === "system" && "text-primary font-medium")}>
							<Monitor size={14} />
							System
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>

				{/* Notifications */}
				<Button
					variant="ghost"
					size="icon"
					className="relative size-8 rounded-lg hover:bg-accent/60 transition-colors"
				>
					<Bell size={16} className="text-muted-foreground" />
					<span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-destructive ring-2 ring-background" />
				</Button>

				{/* More actions */}
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="icon" className="size-8 rounded-lg hover:bg-accent/60 transition-colors">
							<MoreVertical size={16} className="text-muted-foreground" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="w-48">
						<DropdownMenuItem>Profile</DropdownMenuItem>
						<DropdownMenuItem>Settings</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive">
							Logout
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</header>
	);
}

