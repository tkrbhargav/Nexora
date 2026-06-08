import { cn } from "@/lib/utils";
import { Bell, ChevronDown, Search, Zap } from "lucide-react";
import { useState } from "react";

export function AppTopbar() {
	const [searchFocused, setSearchFocused] = useState(false);

	return (
		<header className="flex items-center h-16 px-6 border-b border-border bg-background shrink-0 gap-4">

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
						"flex items-center gap-2.5 w-full max-w-md px-4 h-10 rounded-xl border bg-muted/50 transition-all duration-200",
						searchFocused
							? "border-primary/60 ring-2 ring-primary/20 bg-background"
							: "border-border hover:border-border/80",
					)}
				>
					<Search
						size={16}
						className={cn(
							"shrink-0 transition-colors",
							searchFocused ? "text-primary" : "text-muted-foreground",
						)}
					/>
					<input
						type="text"
						placeholder="Search..."
						onFocus={() => setSearchFocused(true)}
						onBlur={() => setSearchFocused(false)}
						className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
					/>
					<kbd className="hidden sm:flex items-center gap-1 text-[10px] font-medium text-muted-foreground/60 border border-border rounded px-1.5 py-0.5">
						⌘K
					</kbd>
				</div>
			</div>

			{/* ── Right: Notifications + Profile ── */}
			<div className="flex items-center gap-3 shrink-0">
				{/* Notification bell */}
				<button
					type="button"
					className="relative flex items-center justify-center size-9 rounded-xl bg-muted hover:bg-accent transition-colors"
				>
					<Bell size={18} className="text-muted-foreground" />
					{/* red dot */}
					<span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-destructive ring-2 ring-background" />
				</button>

				{/* Profile avatar */}
				<button
					type="button"
					className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-accent transition-colors group"
				>
					<div className="size-8 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-xs font-bold text-white shrink-0 ring-2 ring-primary/30">
						AD
					</div>
					<div className="hidden sm:flex flex-col items-start leading-tight">
						<span className="text-sm font-medium">Admin</span>
						<span className="text-[11px] text-muted-foreground">admin@nexora.io</span>
					</div>
					<ChevronDown
						size={14}
						className="text-muted-foreground transition-transform duration-200 group-hover:rotate-180"
					/>
				</button>
			</div>
		</header>
	);
}
