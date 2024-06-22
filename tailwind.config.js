/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
      fontFamily: {
        Lato: ['Lato', 'sans-serif'],
        Holtwood: ['Holtwood One SC', 'serif'],
        Tenali :['Tenali Ramakrishna', 'sans-serif'],
        Niconne : ['Niconne', 'cursive'],
        Alata: ['Alata', 'sans-serif'],

      },
    plugins: [],
  }
}

