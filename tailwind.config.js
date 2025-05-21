/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1e3a8a", // Deep blue for buttons, accents
        secondary: "#1f2937", // Dark gray for background
      },
    },
  },
  plugins: [],
};