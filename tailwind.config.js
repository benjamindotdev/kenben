/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{html,tsx}",
    "./src/components/**/*.{html,tsx}",
    "./src/components/ui/**/*.{html,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ffc8dd",
        secondary: "#003049",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
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
