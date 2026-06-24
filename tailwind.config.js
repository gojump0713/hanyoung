/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0f2a52',
          50: '#eef3fa',
          100: '#d6e2f2',
          600: '#163d72',
          700: '#0f2a52',
          800: '#0b1f3d',
          900: '#081730',
        },
        brand: {
          blue: '#1d4ed8',
          light: '#3b82f6',
          sky: '#e0edff',
        },
      },
      fontFamily: {
        sans: [
          'Pretendard',
          '-apple-system',
          'BlinkMacSystemFont',
          'system-ui',
          'Roboto',
          '"Helvetica Neue"',
          '"Segoe UI"',
          '"Apple SD Gothic Neo"',
          '"Noto Sans KR"',
          'sans-serif',
        ],
      },
      boxShadow: {
        card: '0 1px 3px rgba(15,42,82,0.08), 0 1px 2px rgba(15,42,82,0.06)',
        cardhover: '0 8px 24px rgba(15,42,82,0.12)',
      },
    },
  },
  plugins: [],
}
