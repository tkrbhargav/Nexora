import { useState } from "react";
import { Outlet } from "react-router";
import { AppSidebar } from "@/components/app-sidebar";
import { AppTopbar } from "@/components/app-topbar";

export function AppRoot() {
	const [collapsed, setCollapsed] = useState(false);

	return (
		<div className="flex h-screen bg-background overflow-hidden">
			{/* Sidebar */}
			<AppSidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />

			{/* Main area */}
			<div className="flex flex-col flex-1 min-w-0 overflow-hidden">
				{/* Topbar */}
				<AppTopbar />

				{/* Page content */}
				<main className="flex-1 overflow-y-auto p-6">
					<Outlet />
				</main>
			</div>
		</div>
	);
}
