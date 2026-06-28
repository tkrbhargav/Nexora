import { createBrowserRouter } from "react-router";
import { adminRoutes } from "./routes/app/admin";
import { clientRoutes } from "./routes/app/client";
import LoginPage from "./routes/auth/login";
import SignUpPage from "./routes/auth/signup";
import NotFoundPage from "./routes/not-found";
import { ProtectedRoute } from "./routes/ProtectedRoute";

export const router = createBrowserRouter([
	// ── Auth ──────────────────────────────────────────────────
	{ path: "/login", element: <LoginPage /> },
	{ path: "/signup", element: <SignUpPage /> },

	// ── Protected ─────────────────────────────────────────────
	{
		element: <ProtectedRoute />,
		children: [adminRoutes, clientRoutes],
	},

	// ── Fallback ──────────────────────────────────────────────
	{ path: "*", element: <NotFoundPage /> },
]);
