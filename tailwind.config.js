/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{html,tsx}",
    "./src/components/**/*.{html,tsx}",
    "./src/components/ui/**/*.{html,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    {
      tailwindcss: { config: "./tailwindcss-config.js" },
    },
  ],
  compilerOptions: {
    baseUrl: ".",
    paths: {
      "@/*": ["./src/*"],
    },
  },
};
