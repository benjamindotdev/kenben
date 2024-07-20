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
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    {
      tailwindcss: { config: "./tailwindcss-config.js" },
    },
    require("tailwindcss-animate"),
  ],
  compilerOptions: {
    baseUrl: ".",
    paths: {
      "@/*": ["./src/*"],
    },
  },
};
