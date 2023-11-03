/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bb-dark-blue': '#005FBC',
        'bb-blue': '#0080FF',
        'bb-light-blue': '#41A0FF',
        'bb-chrome': '#EEEEEE',
        'bb-light-gray': '#CCCCCC',
        'bb-gray': '#BBBBBB',
        'bb-dark-gray': '#AAAAAA',
        'bb-black': '#121212',
      },
      fontSize: {
        'xs': '10px',
        'sm': '13px',
        'base': '15px',
        'xl': '28px',
      },
      maxWidth: {
        'app': '812px',
      }
    },
  },
  plugins: [],
}

