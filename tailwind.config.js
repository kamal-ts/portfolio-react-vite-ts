/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: '16px',
    },
    extend: {
      colors:{
        main: '#6366f1',
        dark: '#0f172a',
        smdark: '#1e293b',
        mddark: '#cbd5e1',
        lgdark: '#f8fafc',
        secondary: '#64748b',
      },
      screens: {
        '2xl': '1320px' 
      }
    },
  },
  plugins: [],
}

