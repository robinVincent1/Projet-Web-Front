/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'Inscription': "url('./src/Inscription.png')"
      }
    },
  },
  plugins: [],
}
