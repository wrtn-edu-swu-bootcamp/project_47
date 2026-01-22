/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
        },
        senior: {
          50: '#fef3c7',
          500: '#f59e0b',
          600: '#d97706',
        },
        mz: {
          50: '#fce7f3',
          500: '#ec4899',
          600: '#db2777',
        },
        newbie: {
          50: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
        }
      },
      fontFamily: {
        'senior': ['Noto Sans KR', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
