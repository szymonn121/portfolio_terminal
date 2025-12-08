import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        terminal: {
          green: "#00FF41",
          dim: "#0F3D0F",
          dark: "#000000",
          glow: "#00FF4180",
        },
      },
      fontFamily: {
        mono: ["VT323", "Courier New", "monospace"],
      },
      animation: {
        blink: "blink 1s step-end infinite",
        typing: "typing 3.5s steps(40, end)",
        fadeIn: "fadeIn 0.5s ease-in",
      },
      keyframes: {
        blink: {
          "0%, 50%": { opacity: "1" },
          "51%, 100%": { opacity: "0" },
        },
        typing: {
          "0%": { width: "0" },
          "100%": { width: "100%" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
