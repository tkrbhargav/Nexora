// src/stores/auth/auth-slice.ts
import type { StateCreator } from "zustand";
import type { AuthSlice } from "./types";

export const createAuthSlice: StateCreator<AuthSlice & {}, [], [], AuthSlice> =
  (set) => ({
    user: null,
    token: null,
    isAuthenticated: false,
    setUser: (user, token) => set({ user, token, isAuthenticated: true }),
    clearUser: () => set({ user: null, token: null, isAuthenticated: false }),
    updateRole: (role) =>
      set((state) =>
        state.user ? { user: { ...state.user, role } } : {}
      ),
  });
