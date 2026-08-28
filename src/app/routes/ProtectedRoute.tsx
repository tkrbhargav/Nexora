/**
 * Guards authenticated-only sections.
 * Role-based access is handled by login redirect logic in `features/auth/api/login.ts`.
 * For route-level role guards, create a `<RoleGuard allowedRoles={[...]} />` wrapper.
 */
import { useAppStore } from "@/store";
import { Navigate, Outlet } from "react-router";

export function ProtectedRoute() {
	const isAuthenticated = useAppStore((s) => s.isAuthenticated);
	return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}