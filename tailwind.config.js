/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  plugins: [
    require("tailwindcss-text-rendering"),
  ],
  theme: {
    extend: {
      fontFamily: {
        base: ['"Montserrat"', 'sans-serif'],
      },
      screens: {
        sm: '568px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
        xxl: '1440px',
      },
      colors: {
        transparent: 'transparent',
        white: {
          base: '#FFF',
          soft: '#CFD1DE'
        },
        black: {
          base: '#000',
          soft: '#262626'
        },
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(90deg, #494949, #000000)'
      }
    },
  },
}

