/**
 * ProtectedRoute — Guards authenticated-only sections of the app.
 *
 * Reads `isAuthenticated` from the Zustand auth store. If the user is
 * not authenticated, they are redirected to `/login`.
 *
 * ┌──────────────────────────────────────────────────────────────────────────┐
 * │  NOTE: This guard only checks authentication (logged in or not).       │
 * │  Role-based access (admin vs client) is handled by the login redirect  │
 * │  logic in `features/auth/api/login.ts`. If you need route-level role   │
 * │  guards, create a `<RoleGuard allowedRoles={[...]} />` wrapper.        │
 * └──────────────────────────────────────────────────────────────────────────┘
 */
import { useAppStore } from "@/store";
import { Navigate, Outlet } from "react-router";

export function ProtectedRoute() {
	const isAuthenticated = useAppStore((s) => s.isAuthenticated);
	return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}