"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import AppLoader from "@/components/layout/AppLoader";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      disableTransitionOnChange
    >
      <AppLoader />
      {children}
    </NextThemesProvider>
  );
}
