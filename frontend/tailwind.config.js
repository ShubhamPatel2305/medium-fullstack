/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        customBlue: '#13016C',
      },
      spacing:{
        '1/4':'25%',
        '1/5':'20%',
        '1/10': '10%'
      }
    },
  },
  plugins: [],
}

