/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep dark background shades
        dark: {
          900: '#0B0B0E', // Main background
          800: '#15151A', // Card background
          700: '#1E1E24', // Lighter borders/hovers
        },
        // Neon Accents
        neon: {
          cyan: '#00F0FF',
          purple: '#B026FF',
          orange: '#FF5722',
        }
      },
      fontFamily: {
        mono: ['Fira Code', 'Courier New', 'monospace'], // For the code feel
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}