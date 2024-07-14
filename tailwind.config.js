/** @type {import('tailwindcss').Config} */

export default {
  content: ["./**/*.{html,tsx}", "./components/**/*.{html,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  compilerOptions: {
    baseUrl: ".",
    paths: {
      "@/*": ["./src/*"],
    },
  },
};
