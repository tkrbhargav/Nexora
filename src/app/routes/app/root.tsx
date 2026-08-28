import { AppSidebar } from "@/components/app-sidebar";
import { AppTopbar } from "@/components/app-topbar";
import { useState } from "react";
import { Outlet } from "react-router";

/** Keep in sync with the h-16 (64px) in AppTopbar */
const TOPBAR_HEIGHT = 64;

export function AppRoot() {
	const [collapsed, setCollapsed] = useState(false);

	/** Must match the width values in AppSidebar */
	const sidebarWidth = collapsed ? 68 : 220;

	return (
		<div className="min-h-screen bg-background">
			<AppTopbar />
			<AppSidebar
				collapsed={collapsed}
				onToggle={() => setCollapsed((c) => !c)}
				topOffset={TOPBAR_HEIGHT}
			/>
			<main
				className="overflow-y-auto p-6 transition-all duration-300"
				style={{
					paddingTop: `${TOPBAR_HEIGHT + 24}px`,
					paddingLeft: `${sidebarWidth + 50}px`,
					minHeight: "100vh",
				}}
			>
				<Outlet />
			</main>
		</div>
	);
}
