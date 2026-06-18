// src/stores/theme/types.ts
export type ThemeMode = "light" | "dark" | "system";

export interface ThemeSlice {
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
}
