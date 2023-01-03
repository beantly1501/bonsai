/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'reddit-black': '#030303',
        'reddit-grey': '#151516',
      }
    },
  },
  plugins: [],
}
