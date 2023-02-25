const { colors } = require('./src/config/colors')
const { screens } = require('./src/config/screens')
const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/features/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens,
    extend: {
      colors,
      fontFamily: {
        poppins: ['Poppins', ...fontFamily.sans],
      },
      keyframes: {
        fadeIn: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { opacity: '100' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-in-out',
      },
    },
  },
  plugins: [],
}
