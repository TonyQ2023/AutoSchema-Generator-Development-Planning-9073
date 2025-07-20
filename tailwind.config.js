/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#0F52BA',
          600: '#0d47a1',
          700: '#0b3d91',
          800: '#093481',
          900: '#072a71',
        },
        accent: {
          50: '#fef2f2',
          100: '#fee2e2',
          500: '#E31837',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        }
      }
    },
  },
  plugins: [],
}