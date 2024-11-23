import fluid, { extract, fontSize, screens } from "fluid-tailwind";
//** @type {import("prettier").Config} *//** @type {import("prettier").Config} */** @type {import('tailwindcss').Config} */
export default {
  content: {
    files: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    extract,
  },
  theme: {
    screens,
    fontSize,
    fontFamily: {
      sans: ["Objectivity", "sans-serif"],
    },
    colors: {
      dark: "#141414",
      light: "#FAF8F4",
      brand: "#E0AA3E",
      "brand-2": "#FFCF70",
    },
    extend: {},
  },
  plugins: [fluid],
};
