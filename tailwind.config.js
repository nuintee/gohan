/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'gh-white': '#F4F4F4',
        'gh-orange': '#FF7315',
        'gh-red': '#EF5D5D',
        'gh-dark': '#232020',
        'gh-brown': '#3A3535',
      },
    },
  },
  plugins: [],
}
