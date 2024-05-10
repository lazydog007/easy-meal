import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  plugins: [
    require("tailwindcss-animate"),
    require("tailwindcss-scrollbar"),
    require("daisyui"),
  ],
  daisyui: {
    themes: ["bumblebee", "esmerald", "dim", "dark"],
  },
} satisfies Config

export default config
