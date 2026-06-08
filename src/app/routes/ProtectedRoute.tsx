import { Navigate, Outlet } from "react-router";

export function ProtectedRoute() {
	// const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
	const isAuthenticated = true;
	return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}