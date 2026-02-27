import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        desk: {
          blue: '#38BDF8',
          bg: '#0F172A',
          card: '#1E293B',
          border: '#334155',
        },
      },
      backgroundColor: {
        app: '#0F172A',
        card: '#1E293B',
      },
      borderColor: {
        DEFAULT: '#334155',
      },
    },
  },
  plugins: [],
};

export default config;
