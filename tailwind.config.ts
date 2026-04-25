import type { Config } from "tailwindcss";

// NOTE: In Tailwind CSS v4, theme configuration has moved to CSS (@theme in globals.css).
// This file is kept for compatibility with any tooling that still reads it.
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
};

export default config;
