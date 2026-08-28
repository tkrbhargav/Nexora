import {
	Building2,
	ChevronLeft,
	ChevronRight,
	LayoutDashboard,
	Users,
	Warehouse,
} from "lucide-react";
import { Link, useLocation } from "react-router";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const NAV_ITEMS = [
	{ label: "Dashboard", to: "/admin/dashboard", icon: LayoutDashboard },
	{ label: "Organizations", to: "/admin/organizations", icon: Building2 },
	{ label: "Inventory", to: "/admin/inventory", icon: Warehouse },
	{ label: "Users", to: "/admin/users", icon: Users },
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
			<aside
				style={{
					top: topOffset + 12,
					height: `calc(100vh - ${topOffset + 24}px)`,
					width: sidebarW,
				}}
				className="fixed left-3 z-40 flex flex-col transition-all duration-300"
			>
				<div className="flex flex-col flex-1 rounded-2xl overflow-hidden border border-border bg-card">
					<nav className="flex flex-col gap-1 flex-1 overflow-y-auto overflow-x-hidden px-2.5 py-4 scrollbar-none">
						{NAV_ITEMS.map(({ label, to, icon: Icon }) => {
							const isActive =
								pathname === to ||
								(to === "/admin/dashboard" && pathname === "/admin") ||
								(pathname !== to && pathname.startsWith(to + "/"));

							return (
								<Button
									key={to}
									variant="ghost"
									asChild
									title={collapsed ? label : undefined}
									className={cn(
										"group relative flex items-center justify-start gap-3 rounded-xl px-3 h-auto py-2.5 text-sm font-medium transition-all duration-200",
										"text-muted-foreground hover:text-foreground hover:bg-accent mr-3",
										isActive && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
										collapsed && "justify-center px-0",
									)}
								>
									<Link to={to}>
										<Icon
											size={18}
											className={cn(
												"shrink-0 transition-colors",
												isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground",
											)}
										/>
										{!collapsed && (
											<span className="truncate text-[13px] font-medium leading-none">
												{label}
											</span>
										)}
									</Link>
								</Button>
							);
						})}
					</nav>

					<div className="h-px mx-3 bg-border" />
					<div className="px-3 py-3 flex justify-center">
						<div className={cn(
							"h-1 rounded-full bg-primary transition-all duration-300",
							collapsed ? "w-6" : "w-10",
						)} />
					</div>
				</div>
			</aside>

			{/* Collapse toggle — rendered outside aside to avoid clipping */}
			<Button
				type="button"
				size="icon"
				onClick={onToggle}
				style={{
					top: topOffset + 28,
					left: sidebarW + -2,
				}}
				className="fixed z-50 flex size-7 p-0 items-center justify-center rounded-full bg-primary text-primary-foreground ring-2 ring-background transition-all duration-300 hover:scale-110 hover:bg-primary/90"
				aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
			>
				{collapsed
					? <ChevronRight size={13} strokeWidth={2.5} />
					: <ChevronLeft size={13} strokeWidth={2.5} />
				}
			</Button>
		</>
	);
}
