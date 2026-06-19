import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { createAuthSlice } from "./auth/auth.slice";
import type { AuthSlice } from "./auth/types";

export type AppStore = AuthSlice;

export const useAppStore = create<AppStore>()(
  persist(
    (...a) => ({
      ...createAuthSlice(...a),
    }),
    {
      name: "nexora-store",            
      storage: createJSONStorage(() => localStorage),  
      partialize: (state) => ({
        user: state.user ? { id: state.user.id, role: state.user.role } : null,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
      version: 1, 
    }
  )
);
