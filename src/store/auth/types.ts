// src/stores/auth/types.ts
export type UserRole = "super-admin" | "admin" | "manager" | "user";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface AuthSlice {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  setUser: (user: AuthUser, token: string) => void;
  clearUser: () => void;
  updateRole: (role: UserRole) => void;
}
