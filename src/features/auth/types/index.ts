/**
 * ─────────────────────────────────────────────────────────────────────────────
 * Auth API — Request & Response Types
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * These types define the shape of data sent to and received from the
 * authentication endpoints.
 *
 * ┌──────────────────────────────────────────────────────────────────────────┐
 * │  HOW TO CONNECT TO YOUR BACKEND                                        │
 * │                                                                         │
 * │  1. Update `LoginResponse` to match your API's actual response shape.  │
 * │     For example, your backend might return:                             │
 * │       { accessToken: string; refreshToken: string; user: { ... } }     │
 * │     Adjust the fields below accordingly.                                │
 * │                                                                         │
 * │  2. If your API uses different field names (e.g., `access_token`        │
 * │     instead of `token`), update these types AND the mapping logic       │
 * │     in `features/auth/api/login.ts`.                                    │
 * └──────────────────────────────────────────────────────────────────────────┘
 */

import type { AuthUser } from "@/store/auth/types";

// ── Request ─────────────────────────────────────────────────────────────────

/** Payload sent to the login endpoint. */
export interface LoginRequest {
	email: string;
	password: string;
}

// ── Response ────────────────────────────────────────────────────────────────

/**
 * Expected response shape from `POST /auth/login`.
 *
 * TODO: Adjust these fields to match your backend's actual response.
 * Common variations:
 *   - `accessToken` / `access_token` instead of `token`
 *   - Nested `data.user` / `data.token` wrapper
 *   - Additional fields like `refreshToken`, `expiresIn`, etc.
 */
export interface LoginResponse {
	user: AuthUser;
	token: string;
}
