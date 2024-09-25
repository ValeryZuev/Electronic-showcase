/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin'
import textRendering from 'tailwindcss-text-rendering'

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  plugins: [
    textRendering,
    plugin(function ({ addUtilities, theme }) {
      addUtilities({
        '.border-image-1': {
          borderImageSlice: '1',
        },
        '.border-image-2': {
          borderImageSlice: '2',
        },
        '.border-image-green': {
          borderImageSource: theme('backgroundImage.gradient-green')
        },
        '.border-image-green-rose': {
          borderImageSource: theme('backgroundImage.gradient-green-rose')
        }
      })
    })
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
        green: {
          base: '#07FF53'
        }
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(90deg, #494949, #000000)',
        'gradient-green': 'linear-gradient(90deg, #00C53C, #399252)',
        'gradient-green-rose': 'linear-gradient(90deg, #07FF53, #EDB7D6)',
      }
    },
  },
}

