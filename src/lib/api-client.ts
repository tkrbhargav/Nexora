import Axios, { type InternalAxiosRequestConfig } from "axios";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * Base API Client
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * ┌──────────────────────────────────────────────────────────────────────────┐
 * │  HOW TO SET YOUR BACKEND URL                                           │
 * │                                                                         │
 * │  1. Create a `.env` file in the project root (next to package.json):   │
 * │       VITE_API_URL=https://your-backend.com/api                        │
 * │                                                                         │
 * │  2. For different environments, create:                                 │
 * │       `.env.development`  → local dev server URL                        │
 * │       `.env.staging`      → staging URL                                 │
 * │       `.env.production`   → production URL                              │
 * │                                                                         │
 * │  3. Restart the dev server after changing `.env` files.                 │
 * │                                                                         │
 * │  4. The fallback "/api" below works with Vite's proxy config.          │
 * │     To use the proxy, add this to `vite.config.ts`:                     │
 * │       server: {                                                         │
 * │         proxy: {                                                        │
 * │           "/api": {                                                      │
 * │             target: "http://localhost:8000",                             │
 * │             changeOrigin: true,                                         │
 * │           }                                                              │
 * │         }                                                                │
 * │       }                                                                  │
 * └──────────────────────────────────────────────────────────────────────────┘
 */
export const api = Axios.create({
	baseURL: import.meta.env.VITE_API_URL || "/api",
	headers: {
		"Content-Type": "application/json",
	},
});

/**
 * Request interceptor — attaches the auth token to every outgoing request.
 *
 * The token is read from localStorage where the Zustand persist middleware
 * stores it. If you change the storage key or strategy, update this accordingly.
 */
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
	const token = localStorage.getItem("auth_token");

	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
});

/**
 * Response interceptor — handles global error responses.
 *
 * ┌──────────────────────────────────────────────────────────────────────────┐
 * │  CUSTOMISATION IDEAS                                                    │
 * │                                                                         │
 * │  • Auto-redirect to /login on 401 (session expired)                    │
 * │  • Implement token refresh logic before retrying the request           │
 * │  • Show toast notifications for 5xx server errors                      │
 * │  • Log errors to an external service (Sentry, LogRocket, etc.)         │
 * └──────────────────────────────────────────────────────────────────────────┘
 */
api.interceptors.response.use(
	(response) => response,
	(error) => {
		// ── Auto-redirect on 401 (Unauthorized) ──────────────────────────
		// Uncomment the block below to auto-redirect when the token expires:
		//
		// if (error.response?.status === 401) {
		//   localStorage.removeItem("auth_token");
		//   window.location.href = "/login";
		//   return Promise.reject(error);
		// }

		const message =
			error.response?.data?.message || error.message || "An unexpected error occurred";

		console.error("[API Error]", message);

		return Promise.reject(error);
	},
);
