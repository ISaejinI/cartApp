/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ], theme: {
    fontFamily: {
      display: ['Oswald', 'sans-serif'],
      body: ['Lato', 'sans-serif'],
    },
    extend: {
      colors: {
        cream: '#f6efe7',
        pink: '#f5bbb8',
        darkgreen: '#58612a',
        neutralgreen: '#989a35',
        lightgreen: '#e0e0a0'
      }
    },
  },
  plugins: [],
}

