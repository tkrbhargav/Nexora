import {
	Building2,
	ChevronLeft,
	ChevronRight,
	LayoutDashboard,
	LogOut,
	Settings,
	Users,
	Warehouse,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAppStore } from "@/store";

interface NavConfigItem {
	label: string;
	path: string;
	icon: React.ElementType;
}

const MAIN_NAV_ITEMS: NavConfigItem[] = [
	{ label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
	{ label: "Organizations", path: "/organizations", icon: Building2 },
	{ label: "Inventory", path: "/inventory", icon: Warehouse },
	{ label: "Users", path: "/users", icon: Users },
];

const BOTTOM_NAV_ITEMS: NavConfigItem[] = [
	{ label: "Settings", path: "/settings", icon: Settings },
];

interface AppSidebarProps {
	collapsed: boolean;
	onToggle: () => void;
	topOffset?: number;
}

export function AppSidebar({ collapsed, onToggle, topOffset = 64 }: AppSidebarProps) {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const user = useAppStore((s) => s.user);
	const clearUser = useAppStore((s) => s.clearUser);

	const isAdmin = user?.role
		? ["super-admin", "admin", "manager"].includes(user.role)
		: pathname.startsWith("/admin");

	const basePath = isAdmin ? "/admin" : "";
	const sidebarW = collapsed ? 68 : 230;

	const displayName = user?.name || (isAdmin ? "Admin User" : "Client User");
	const displayRole = user?.role || (isAdmin ? "admin" : "client");
	const initials = displayName
		.split(" ")
		.filter(Boolean)
		.map((w) => w[0])
		.join("")
		.toUpperCase()
		.slice(0, 2) || "U";

	const handleLogout = () => {
		clearUser();
		navigate("/login", { replace: true });
	};

	const renderNavItem = ({ label, path, icon: Icon }: NavConfigItem) => {
		const to = `${basePath}${path}`;
		const isDashboard = path === "/dashboard";
		const isActive =
			pathname === to ||
			(isDashboard && (isAdmin ? pathname === "/admin" : pathname === "/")) ||
			(pathname !== to && pathname.startsWith(to + "/"));

		return (
			<Link
				key={path}
				to={to}
				title={collapsed ? label : undefined}
				className={cn(
					"group relative flex items-center gap-3 rounded-lg px-3 h-10 text-sm font-medium transition-all duration-200",
					"text-muted-foreground hover:text-foreground hover:bg-accent/60",
					isActive && "text-foreground bg-accent/60",
					collapsed && "justify-center px-0",
				)}
			>
				{/* Active left-border indicator */}
				{isActive && (
					<span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-full bg-primary" />
				)}
				<Icon
					size={18}
					className={cn(
						"shrink-0 transition-colors",
						isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground",
					)}
				/>
				{!collapsed && (
					<span className="truncate text-[13px] font-medium leading-none">
						{label}
					</span>
				)}
			</Link>
		);
	};

	return (
		<aside
			style={{
				top: topOffset,
				height: `calc(100vh - ${topOffset}px)`,
				width: sidebarW,
			}}
			className="fixed left-0 z-40 flex flex-col transition-all duration-300 bg-sidebar border-r border-sidebar-border"
		>
			{/* Collapse toggle */}
			<div className={cn(
				"flex items-center h-12 px-3 shrink-0",
				collapsed ? "justify-center" : "justify-end",
			)}>
				<Button
					type="button"
					variant="ghost"
					size="icon"
					onClick={onToggle}
					className="size-7 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/60"
					aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
				>
					{collapsed
						? <ChevronRight size={14} strokeWidth={2.5} />
						: <ChevronLeft size={14} strokeWidth={2.5} />
					}
				</Button>
			</div>

			{/* Section label */}
			{!collapsed && (
				<div className="px-4 pb-2">
					<span className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground/60">Menus</span>
				</div>
			)}

			{/* Main nav */}
			<nav className="flex flex-col gap-0.5 flex-1 overflow-y-auto overflow-x-hidden px-2.5 scrollbar-none">
				{MAIN_NAV_ITEMS.map(renderNavItem)}
			</nav>

			{/* Bottom section */}
			<div className="flex flex-col gap-0.5 px-2.5 pb-2">
				{!collapsed && (
					<div className="px-1 pt-3 pb-2">
						<span className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground/60">Account</span>
					</div>
				)}
				{BOTTOM_NAV_ITEMS.map(renderNavItem)}
				<button
					type="button"
					onClick={handleLogout}
					className={cn(
						"group relative flex items-center gap-3 rounded-lg px-3 h-10 text-sm font-medium transition-all duration-200",
						"text-muted-foreground hover:text-destructive hover:bg-destructive/10",
						collapsed && "justify-center px-0",
					)}
				>
					<LogOut size={18} className="shrink-0" />
					{!collapsed && (
						<span className="truncate text-[13px] font-medium leading-none">Logout</span>
					)}
				</button>
			</div>

			{/* Divider */}
			<div className="h-px mx-3 bg-sidebar-border" />

			{/* User profile at bottom */}
			<div className={cn(
				"flex items-center gap-3 px-3 py-3.5 shrink-0",
				collapsed && "justify-center px-2",
			)}>
				<Avatar className="size-8 ring-2 ring-primary/25 shrink-0">
					<AvatarFallback className="bg-primary/15 text-primary text-xs font-bold">
						{initials}
					</AvatarFallback>
				</Avatar>
				{!collapsed && (
					<>
						<div className="flex flex-col items-start leading-none gap-1 min-w-0">
							<span className="text-sm font-medium leading-none text-foreground truncate">{displayName}</span>
							<span className="text-[11px] text-muted-foreground leading-none capitalize">{displayRole}</span>
						</div>
						<ChevronRight size={14} className="ml-auto shrink-0 text-muted-foreground" />
					</>
				)}
			</div>
		</aside>
	);
}

