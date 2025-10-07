/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
          background: 'hsl(var(--bg))',
          foreground: 'hsl(var(--fg))',
          card: 'hsl(var(--card))',
          muted: 'hsl(var(--muted))',
          border: 'hsl(var(--border))',
          primary: 'hsl(var(--primary))',
        },
        borderRadius: { '2xl': '1rem' },
        boxShadow: { soft: '0 10px 20px rgba(0,0,0,.06)' },
        container: { center: true, padding: '1rem' },
      },
    },
    plugins: [],
  };
  