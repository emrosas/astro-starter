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
    extend: {},
  },
  plugins: [fluid],
};
