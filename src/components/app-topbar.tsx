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
import { useAppStore } from "@/store";
import { Bell, ChevronDown, Moon, Search, Sun, Zap } from "lucide-react";
import { useState } from "react";

export function AppTopbar() {
	const [searchFocused, setSearchFocused] = useState(false);
	const theme = useAppStore((state) => state.theme);
	const setTheme = useAppStore((state) => state.setTheme);

  console.log("current theme ", theme);
	return (
		<header className="fixed top-0 left-0 right-0 z-50 flex items-center h-16 px-6 border-b border-border bg-background/95 backdrop-blur-sm shrink-0 gap-4">

			{/* ── Left: Logo ── */}
			<div className="flex items-center gap-2.5 shrink-0">
				<div className="flex items-center justify-center size-8 rounded-xl bg-primary shadow-lg shadow-primary/30">
					<Zap size={16} className="text-primary-foreground fill-primary-foreground" />
				</div>
				<span className="text-xl font-bold tracking-tight font-heading">Nexora</span>
			</div>

			{/* ── Center: Search ── */}
			<div className="flex-1 flex justify-center px-4">
				<div
					className={cn(
						"flex items-center relative w-full max-w-md h-10 rounded-xl border bg-muted/50 transition-all duration-200",
						searchFocused
							? "border-primary/60 ring-2 ring-primary/20 bg-background"
							: "border-border hover:border-border/80",
					)}
				>
					<Search
						size={16}
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
						className="flex-1 pl-10 pr-10 h-full bg-transparent text-sm border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground"
					/>
					<kbd className="hidden sm:flex absolute right-3 items-center gap-1 text-[10px] font-medium text-muted-foreground/60 border border-border bg-background rounded px-1.5 py-0.5 z-10">
						⌘K
					</kbd>
				</div>
			</div>

			{/* ── Right: Notifications + Profile ── */}
			<div className="flex items-center gap-3 shrink-0">
				{/* Theme toggle */}
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="icon" className="relative size-9 rounded-xl hover:bg-accent transition-colors">
							<Sun className={cn("h-5 w-5 transition-all text-muted-foreground", theme === "dark" ? "scale-0 -rotate-90 absolute" : "scale-100 rotate-0")} />
							<Moon className={cn("h-5 w-5 transition-all text-muted-foreground", theme === "dark" ? "scale-100 rotate-0" : "scale-0 rotate-90 absolute")} />
							<span className="sr-only">Toggle theme</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem onClick={() => setTheme("light")}>
							Light
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => setTheme("dark")}>
							Dark
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => setTheme("system")}>
							System
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
				<Button
					variant="secondary"
					size="icon"
					className="relative size-9 rounded-xl hover:bg-accent transition-colors"
				>
					<Bell size={18} className="text-muted-foreground" />
					{/* red dot */}
					<span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-destructive ring-2 ring-background" />
				</Button>

				{/* Profile avatar */}
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="ghost"
							className="flex items-center gap-2 px-2 h-11 rounded-xl hover:bg-accent transition-colors group"
						>
							<Avatar className="size-8 ring-2 ring-primary/30">
								<AvatarFallback className="bg-gradient-to-br from-primary to-purple-500 text-xs font-bold text-white">
									AD
								</AvatarFallback>
							</Avatar>
							<div className="hidden sm:flex flex-col items-start leading-none gap-1.5">
								<span className="text-sm font-medium leading-none">Admin</span>
								<span className="text-[11px] text-muted-foreground leading-none">admin@nexora.io</span>
							</div>
							<ChevronDown
								size={14}
								className="text-muted-foreground transition-transform duration-200 group-hover:rotate-180 ml-1"
							/>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="w-56">
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
