/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}", // Ajusta según tus carpetas
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          100: '#d0f0eb',
          200: '#a1e1d7',
          500: '#1abc9c', // color principal
          700: '#16a085', // color oscuro
        },
        relogic: '#5f8c5e', // otro color custom
      },
    },
  },
  plugins: [],
}
