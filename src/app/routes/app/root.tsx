import { AppSidebar } from "@/components/app-sidebar";
import { AppTopbar } from "@/components/app-topbar";
import { useState } from "react";
import { Outlet } from "react-router";

// Topbar height in px — keep in sync with the h-16 (64px) in AppTopbar
const TOPBAR_HEIGHT = 64;

export function AppRoot() {
	const [collapsed, setCollapsed] = useState(false);

	// Sidebar widths must match the values used in AppSidebar (left: 3 = 12px gap + width)
	const sidebarWidth = collapsed ? 68 : 220;

	return (
		<div className="min-h-screen bg-background">
			{/* ── Fixed full-width Topbar ── */}
			<AppTopbar />

			{/* ── Fixed Sidebar, sitting directly below the topbar ── */}
			<AppSidebar
				collapsed={collapsed}
				onToggle={() => setCollapsed((c) => !c)}
				topOffset={TOPBAR_HEIGHT}
			/>

			{/* ── Scrollable page content ── */}
			<main
				className="overflow-y-auto p-6 transition-all duration-300"
				style={{
					paddingTop: `${TOPBAR_HEIGHT + 24}px`,
					paddingLeft: `${sidebarWidth + 35}px`,
					minHeight: "100vh",
				}}
			>
				<Outlet />
			</main>
		</div>
	);
}
