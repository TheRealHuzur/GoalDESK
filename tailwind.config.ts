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
          bg: 'var(--bg)',
          'bg-2': 'var(--bg-2)',
          'bg-3': 'var(--bg-3)',
          text: 'var(--text)',
          'text-muted': 'var(--text-muted)',
          border: 'var(--border)',
          glow: 'var(--glow)',
          accent: 'var(--accent)',
          'accent-2': 'var(--accent-2)',
          'input-bg': 'var(--input-bg)',
          teal: 'var(--teal)',
          sky: 'var(--sky)',
        },
      },
      backgroundColor: {
        app: 'var(--bg)',
        card: 'var(--bg-2)',
      },
      borderColor: {
        DEFAULT: 'var(--border)',
      },
      boxShadow: {
        'desk': 'var(--shadow)',
        'desk-sm': 'var(--shadow-sm)',
        'desk-glow': '0 0 30px var(--glow), var(--shadow-sm)',
      },
    },
  },
  plugins: [],
};

export default config;
