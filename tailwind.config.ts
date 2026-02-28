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
        noto: ["var(--noto)"],
        archivo: ["var(--archivo)"],
        vt323: ["var(--vt323)"],
        "press-start": ["var(--press-start)"],
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
        "my-orange": "#ff6f00",
        "my-green": "#004d60",
        "my-blue": "#009bef",
        "win95-gray": "#c0c0c0",
        "win95-desktop": "#008080",
        "win95-title": "#000080",
        "win95-title-inactive": "#7b7b7b",
      },
    },
  },
  plugins: [],
};
export default config;
