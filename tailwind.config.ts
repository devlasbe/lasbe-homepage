import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        main: ["var(--font-main)"],
      },
      fontSize: {
        // Window Content — fixed sizes
        "system-caption": ["0.75rem", { lineHeight: "1rem" }],
        "system-body": ["0.875rem", { lineHeight: "1.25rem" }],
        "system-heading": ["1rem", { lineHeight: "1.5rem" }],
        "system-icon-md": ["1.5rem", { lineHeight: "2rem" }],
        "system-icon-lg": ["3rem", { lineHeight: "1" }],
        // OS Chrome — desktop base (mobile overrides in globals.css @layer utilities)
        "system-ui": ["1rem", { lineHeight: "1.5rem" }],
        "system-ui-md": ["1.125rem", { lineHeight: "1.75rem" }],
        "system-ui-lg": ["1.375rem", { lineHeight: "1.75rem" }],
        "system-desktop-icon": ["3.5rem", { lineHeight: "1" }],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        blue: {
          500: "#1084d0",
          900: "#000080",
        },
        teal: {
          500: "#008080",
        },
        gray: {
          200: "#d0d0d0",
          300: "#c0c0c0",
          400: "#a8a4a0",
          500: "#808080",
          700: "#444444",
        },
        green: {
          500: "#008000",
        },
        red: {
          500: "#ff0000",
          900: "#800000",
        },
      },
    },
  },
  plugins: [],
};
export default config;
