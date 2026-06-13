/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Paleta tomada de res/values/colors.xml del proyecto TeToca
        teal: {
          DEFAULT: '#008F8F',
          bright: '#17B5B6',
          soft: '#9AD9D6',
          dark: '#006B6B',
          deepest: '#063D3D',
        },
        brand: {
          yellow: '#FFC42A',
          mint: '#F0F9F9',
          ink: '#050505',
        },
      },
      fontFamily: {
        display: ['Sora', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
