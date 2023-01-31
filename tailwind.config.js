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
      black: "#1b1c1e",
      blue: "#1C45FF",
      red: "#DA2B2B",
      yellow: {
        100: "#FFE492",
        200: "#FECB35",
      },
    },
  },
  plugins: [],
};
