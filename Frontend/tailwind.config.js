/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        root: {
          background: '#fff',
          'bg-card': '#B1C5E7',
          'bg-card2': '#0345B0',
          'bg-card2Hover': '#033E9E',
          dark: '#000',
          light: '#fff',
          navBar: '#023484',

        },
      },
    },
  },
  plugins: [],
}

