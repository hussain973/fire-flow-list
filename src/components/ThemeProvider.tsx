
"use client";

import { useEffect } from 'react';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const root = window.document.documentElement;

    // Apply light/dark mode
    const storedTheme = localStorage.getItem("theme") || "dark";
    root.classList.remove("light", "dark");
    root.classList.add(storedTheme);

    // Apply custom primary color
    const storedColor = localStorage.getItem("focusflow-theme-color");
    if (storedColor) {
      root.style.setProperty('--primary', storedColor);
      root.style.setProperty('--ring', storedColor);
    }
  }, []);

  return <>{children}</>;
}
