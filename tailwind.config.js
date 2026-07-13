/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#1a1d23',
        foreground: '#e2e8f0',
        card: {
          DEFAULT: '#22262f',
          foreground: '#e2e8f0',
        },
        primary: {
          DEFAULT: '#61dafb',
          foreground: '#0f1117',
        },
        secondary: {
          DEFAULT: '#2a2f3a',
          foreground: '#94a3b8',
        },
        muted: {
          DEFAULT: '#1e2128',
          foreground: '#64748b',
        },
        accent: {
          DEFAULT: '#3b82f6',
          foreground: '#ffffff',
        },
        border: '#2d3340',
        'border-glow': 'rgba(97, 218, 251, 0.1)',
        ring: '#61dafb',
        success: '#22c55e',
        warning: '#f59e0b',
        danger: '#ef4444',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '0.5rem',
      },
      spacing: {
        sidebar: '240px',
        header: '56px',
      },
    },
  },
  plugins: [],
}
