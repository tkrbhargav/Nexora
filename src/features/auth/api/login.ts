/**
 * ─────────────────────────────────────────────────────────────────────────────
 * Login API — POST /auth/login
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * This file contains the API call for user authentication and a React Query
 * mutation hook (`useLogin`) that handles:
 *   • Calling the login endpoint
 *   • Storing user + token in Zustand on success
 *   • Redirecting to the correct dashboard based on user role
 *
 * ┌──────────────────────────────────────────────────────────────────────────┐
 * │  HOW TO CONNECT TO YOUR BACKEND                                        │
 * │                                                                         │
 * │  Step 1 — Set the API base URL                                          │
 * │    Open `src/lib/api-client.ts` and set `VITE_API_URL` in your          │
 * │    `.env` file:                                                         │
 * │      VITE_API_URL=https://your-backend.com/api                          │
 * │                                                                         │
 * │  Step 2 — Adjust the endpoint path                                      │
 * │    In the `loginWithCredentials` function below, change the URL          │
 * │    string "/auth/login" to match your backend's login route.            │
 * │    Examples:                                                            │
 * │      "/api/v1/auth/login"                                               │
 * │      "/users/sign_in"                                                   │
 * │                                                                         │
 * │  Step 3 — Map the response                                              │
 * │    If your API response shape differs from `LoginResponse`,             │
 * │    update the mapping in `loginWithCredentials`.                         │
 * │    For example, if your API returns:                                     │
 * │      { data: { access_token: "...", profile: { ... } } }               │
 * │    Then map it like:                                                     │
 * │      const { access_token, profile } = response.data.data;             │
 * │      return { token: access_token, user: profile };                     │
 * │                                                                         │
 * │  Step 4 — Update the types                                              │
 * │    Open `src/features/auth/types/index.ts` and adjust                   │
 * │    `LoginResponse` to reflect the actual API shape.                     │
 * └──────────────────────────────────────────────────────────────────────────┘
 */

import { useAppStore } from "@/store";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import type { LoginRequest, LoginResponse } from "../types";

// ── Admin roles — users with any of these roles will be sent to /admin ──────
const ADMIN_ROLES = new Set(["super-admin", "admin", "manager"]);

// ─────────────────────────────────────────────────────────────────────────────
// Mock Credentials
// ─────────────────────────────────────────────────────────────────────────────

const MOCK_USERS: Record<
	string,
	{ password: string; user: LoginResponse["user"]; token: string }
> = {
	"admin@gmail.com": {
		password: "admin@123",
		user: {
			id: "1",
			name: "Admin User",
			email: "admin@gmail.com",
			role: "admin",
		},
		token: "mock-admin-token-xyz",
	},
	"client@gmail.com": {
		password: "client@123",
		user: {
			id: "2",
			name: "Client User",
			email: "client@gmail.com",
			role: "user",
		},
		token: "mock-client-token-xyz",
	},
};

// ─────────────────────────────────────────────────────────────────────────────
// API Function (Mocked)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Mock login — validates credentials against hardcoded users above.
 *
 * TODO: Replace with a real API call when your backend is ready:
 *   const response = await api.post<LoginResponse>("/auth/login", credentials);
 *   return response.data;
 */
export async function loginWithCredentials(
	credentials: LoginRequest,
): Promise<LoginResponse> {
	// Simulate network delay
	await new Promise((resolve) => setTimeout(resolve, 500));

	const mockUser = MOCK_USERS[credentials.email];

	if (!mockUser || mockUser.password !== credentials.password) {
		throw {
			response: {
				data: { message: "Invalid email or password." },
			},
		};
	}

	return {
		user: mockUser.user,
		token: mockUser.token,
	};
}

// ─────────────────────────────────────────────────────────────────────────────
// React Query Mutation Hook
// ─────────────────────────────────────────────────────────────────────────────

/**
 * `useLogin` — mutation hook for user authentication.
 *
 * On success:
 *   1. Stores the user & token in Zustand (persisted to localStorage).
 *   2. Shows a success toast.
 *   3. Redirects to `/admin/dashboard` or `/dashboard` based on user role.
 *
 * On error:
 *   Shows an error toast with the server's message.
 *
 * Usage in a component:
 * ```tsx
 * const login = useLogin();
 *
 * const onSubmit = (data: LoginFormData) => {
 *   login.mutate(data);
 * };
 * ```
 */
export function useLogin() {
	const navigate = useNavigate();
	const setUser = useAppStore((state) => state.setUser);

	return useMutation({
		mutationFn: loginWithCredentials,

		onSuccess: (data) => {
			// ── 1. Persist auth state in Zustand ─────────────────────────────
			setUser(data.user, data.token);

			// ── 2. Show success feedback ─────────────────────────────────────
			toast.success(`Welcome back, ${data.user.name}!`);

			// ── 3. Role-based redirect ───────────────────────────────────────
			// Admin roles (super-admin, admin, manager) → /admin/dashboard
			// Regular users                              → /dashboard
			const redirectPath = ADMIN_ROLES.has(data.user.role)
				? "/admin/dashboard"
				: "/dashboard";

			navigate(redirectPath, { replace: true });
		},

		onError: (error: unknown) => {
			// ── Extract error message from Axios response or fallback ────────
			const message =
				(error as { response?: { data?: { message?: string } } })?.response
					?.data?.message || "Login failed. Please check your credentials.";

			toast.error(message);
		},
	});
}
