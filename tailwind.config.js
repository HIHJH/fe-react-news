/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Grayscale Colors
        grayscale: {
          "white-alt": "rgba(255, 255, 255, 0.7)",
          white: "#FFFFFF",
          50: "#F5F7F9",
          100: "#D2DAE0",
          200: "#879298",
          300: "#6E8091",
          400: "#5F6E76",
          500: "#485986",
          black: "#14212B",
        },
        // Blue Colors
        blue: {
          100: "#7890E7",
          500: "#436200",
        },
      },
      fontFamily: {
        sans: [
          "Pretendard",
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
