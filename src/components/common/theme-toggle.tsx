"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="size-9 rounded-full border border-border bg-surface" />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      title={isDark ? "Switch to Light Theme" : "Switch to Dark Theme"}
      className="group relative flex size-9 items-center justify-center rounded-full border border-[#10b981]/40 bg-surface text-foreground backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-[#10b981] hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] focus-visible:outline-2 focus-visible:outline-accent"
    >
      {isDark ? (
        <Sun className="size-4 text-[#10b981] transition-transform duration-300 group-hover:rotate-45" />
      ) : (
        <Moon className="size-4 text-[#059669] transition-transform duration-300 group-hover:-rotate-12" />
      )}
    </button>
  );
}
