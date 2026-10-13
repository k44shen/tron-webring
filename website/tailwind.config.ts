import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Times New Roman"', "Times", "serif"],
      },
      colors: {
        brass: "#C4A882",
        dark: "#0A0A0A",
        light: "#E8E8E8",
      },
    },
  },
  plugins: [],
};

export default config;
