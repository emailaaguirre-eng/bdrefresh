import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bd: {
          dark: {
            bg: "#080c12",
            elevated: "#0c1118",
            card: "#0f1520",
            surface: "#151d2b",
            border: "#1e2a3d",
            text: "#e4eaf2",
            muted: "#8a9bb5",
            faint: "#4d6280",
          },
          light: {
            /** Main light canvas + dot-grid (push toward white; keep `alt` for band contrast). */
            bg: "#fcfcfd",
            alt: "#f3f5f8",
            card: "#ffffff",
            border: "#cfd4de",
            text: "#161a26",
            secondary: "#3d4556",
            muted: "#5f6a80",
          },
          accent: {
            DEFAULT: "#2568a0",
            light: "#3080c4",
            lighter: "#5aabee",
            dark: "#1b5080",
          },
          teal: {
            DEFAULT: "#1ba885",
            light: "#2ec4a2",
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-dm)", "var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        container: "1200px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)",
        "card-hover":
          "0 12px 32px rgba(0,0,0,0.08), 0 4px 8px rgba(0,0,0,0.04)",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
} satisfies Config;
