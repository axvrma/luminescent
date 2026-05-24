/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'SF Pro Display', 'sans-serif'],
      },
      keyframes: {
        sweep: {
          '0%, 100%': { transform: 'translateX(-100%)' },
          '50%': { transform: 'translateX(100%)' },
        }
      },
      animation: {
        sweep: 'sweep 4s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
// Force tailwind rebuild
