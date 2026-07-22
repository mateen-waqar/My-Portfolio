import type { Config } from "tailwindcss";

/**
 * Tailwind v4 is CSS-first: the actual design tokens live in
 * `src/app/globals.css` under `@theme inline`. This file exists for
 * editor tooling (IntelliSense, sorting plugins) and to document the
 * content paths explicitly.
 */
export default {
  content: [
    "./src/**/*.{ts,tsx,mdx}",
  ],
  darkMode: "class",
} satisfies Config;
