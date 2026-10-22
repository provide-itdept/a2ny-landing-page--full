/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: { navy: '#08111f', ink: '#0b1220', muted: '#607086', line: '#d7dee8', blue: '#2563eb', cyan: '#06b6d4' },
      fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'] },
      maxWidth: { site: '1200px' },
      borderRadius: { card: '14px' },
    },
  },
  plugins: [],
}
