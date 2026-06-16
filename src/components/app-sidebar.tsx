import {
	Building2,
	ChevronLeft,
	ChevronRight,
	LayoutDashboard,
	Users,
	Warehouse
} from "lucide-react";
import { Link, useLocation } from "react-router";

import { cn } from "@/lib/utils";
import { Button } from "./core/button";

const NAV_ITEMS = [
	{ label: "Dashboard",     to: "/admin/dashboard",      icon: LayoutDashboard },
	{ label: "Organizations", to: "/admin/organizations",  icon: Building2       },
	{ label: "Inventory",     to: "/admin/inventory",      icon: Warehouse       },
	{ label: "Users",         to: "/admin/users",          icon: Users           },
] satisfies { label: string; to: string; icon: React.ElementType }[];

interface AppSidebarProps {
	collapsed: boolean;
	onToggle: () => void;
	topOffset?: number;
}

export function AppSidebar({ collapsed, onToggle, topOffset = 64 }: AppSidebarProps) {
	const { pathname } = useLocation();

	const sidebarW = collapsed ? 68 : 230;

	return (
		<>
			{/* ── Sidebar panel ── */}
			<aside
				style={{
					top: topOffset + 12,
					height: `calc(100vh - ${topOffset + 24}px)`,
					width: sidebarW,
				}}
				className="fixed left-3 z-40 flex flex-col transition-all duration-300"
			>
				{/* Glass card */}
				<div className="flex flex-col flex-1 rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-b from-primary/15 via-primary/8 to-primary/5 backdrop-blur-xl shadow-xl shadow-black/20">

					{/* Nav items — scrollable */}
					<nav className="flex flex-col gap-1 flex-1 overflow-y-auto overflow-x-hidden px-2.5 py-4 scrollbar-none">
						{NAV_ITEMS.map(({ label, to, icon: Icon }) => {
							const isActive =
								pathname === to ||
								// Also highlight Dashboard when at /admin (index)
								(to === "/admin/dashboard" && pathname === "/admin") ||
								(pathname !== to && pathname.startsWith(to + "/"));

							return (
								<Link
									key={to}
									to={to}
									title={collapsed ? label : undefined}
									className={cn(
										"group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
										"text-muted-foreground hover:text-foreground hover:bg-primary/15 mr-3",
										isActive && "bg-primary text-primary-foreground shadow-md shadow-primary/30 hover:bg-primary hover:text-primary-foreground",
										collapsed && "justify-center px-0",
									)}
								>
									{/* Active glow pill */}
									{isActive && (
										<span className="absolute inset-0 rounded-xl bg-primary/20 blur-sm -z-10" />
									)}

									<Icon
										size={18}
										className={cn(
											"shrink-0 transition-colors",
											isActive ? "text-primary-foreground" : "text-primary/60 group-hover:text-primary",
										)}
									/>

									{!collapsed && (
										<span className="truncate text-[13px] font-medium leading-none">
											{label}
										</span>
									)}
								</Link>
							);
						})}
					</nav>

					{/* Bottom accent */}
					<div className="h-px mx-3 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
					<div className="px-3 py-3 flex justify-center">
						<div className={cn(
							"h-1 rounded-full bg-gradient-to-r from-primary/40 via-primary to-primary/40 transition-all duration-300",
							collapsed ? "w-6" : "w-10",
						)} />
					</div>
				</div>
			</aside>

			{/* ── Floating collapse toggle — rendered outside aside so it's never clipped ── */}
			<Button
				type="button"
				onClick={onToggle}
				style={{
					top: topOffset + 28,
					left: sidebarW + -2,
				}}
				className="fixed z-50 flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/40 ring-2 ring-background transition-all duration-300 hover:scale-110 hover:shadow-primary/60 hover:bg-primary/90"
				aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
			>
				{collapsed
					? <ChevronRight size={13} strokeWidth={2.5} />
					: <ChevronLeft  size={13} strokeWidth={2.5} />
				}
			</Button>
		</>
	);
}
