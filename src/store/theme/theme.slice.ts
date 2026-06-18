// src/stores/theme/theme-slice.ts
import type { StateCreator } from "zustand";
import type { ThemeMode, ThemeSlice } from "./types";

export const createThemeSlice: StateCreator<ThemeSlice & {}, [], [], ThemeSlice> =
  (set, get) => ({
    theme: "system",
    toggleTheme: () => {
      // Toggle between 'light' and 'dark'; ignore 'system' for simplicity
      const newTheme = get().theme === "dark" ? "light" : "dark";
      set({ theme: newTheme });
    },
    setTheme: (theme: ThemeMode) => set({ theme }),
  });
