/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        heading: ['Oswald', 'sans-serif'],
      },
      colors: {
        background: '#0a0a0a',
        foreground: '#ffffff',
        muted: { DEFAULT: '#262626', foreground: '#a3a3a3' },
        accent: { DEFAULT: '#3b82f6', foreground: '#ffffff' },
        border: '#262626',
        card: '#171717',
      }
    },
  },
  plugins: [],
}