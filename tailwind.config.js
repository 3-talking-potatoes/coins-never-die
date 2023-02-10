/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      white: "#ffffff",
      grey: "#EAEAEA",
      blue: "#1C45FF",
      red: "#DA2B2B",
      yellow: {
        100: "#FFE492",
        200: "#FECB35",
        coin: "#FFCA49",
      },
      black: {
        100: "#1b1c1e",
        200: "#000000",
      },
      slate: {
        100: "#ccd3db",
        200: "#e2e8f0",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
