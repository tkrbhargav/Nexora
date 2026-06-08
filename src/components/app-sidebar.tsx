import {
  Activity,
  Building2,
  ChevronsLeft,
  ChevronsRight, LayoutDashboard, Users,
  Warehouse
} from "lucide-react";
import { Link, useLocation } from "react-router";

import { cn } from "@/lib/utils";

const NAV_ITEMS = [
	{ label: "Dashboard",    to: "/client/dashboard", icon: LayoutDashboard },
	{ label: "Organizations", to: "/organizations",   icon: Building2       },
	{ label: "Inventory",    to: "/inventory",        icon: Warehouse       },
	{ label: "Users",        to: "/users",            icon: Users           },
	{ label: "Activity",     to: "/activity",         icon: Activity        },
] satisfies { label: string; to: string; icon: React.ElementType }[];

interface AppSidebarProps {
	collapsed: boolean;
	onToggle: () => void;
}

export function AppSidebar({ collapsed, onToggle }: AppSidebarProps) {
	const { pathname } = useLocation();

	return (
		<aside
			className={cn(
				"relative flex flex-col gap-2.5 rounded-[42px] bg-primary/10 py-10 px-5 transition-all duration-300",
				collapsed ? "w-[140px]" : "w-[350px]",
			)}
		>
			{NAV_ITEMS.map(({ label, to, icon: Icon }) => {
				const isActive = pathname === to || pathname.startsWith(to + "/");

				return (
					<Link
						key={to}
						to={to}
						className={cn(
							"flex items-center gap-3 rounded-[22px] px-7 h-13 text-sm font-medium text-primary/70 transition-colors hover:bg-primary/20",
							collapsed && "justify-center px-0",
							isActive && "bg-primary text-primary-foreground hover:bg-primary",
						)}
					>
						<Icon size={24} className="shrink-0" />
						{!collapsed && <span className="text-[18px]">{label}</span>}
					</Link>
				);
			})}

			{/* Toggle button — overflows right edge */}
			<button
				type="button"
				onClick={onToggle}
				className="absolute -right-5 top-18 flex size-10 items-center justify-center rounded-[15px] bg-primary text-primary-foreground shadow-md transition-colors hover:bg-primary/80"
			>
				{collapsed ? <ChevronsRight size={24} /> : <ChevronsLeft size={24} />}
			</button>
		</aside>
	);
}
