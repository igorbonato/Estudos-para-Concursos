import typography from '@tailwindcss/typography'

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
      typography: {
        invert: {
          css: {
            '--tw-prose-body': '#e2e8f0',
            '--tw-prose-headings': '#e2e8f0',
            '--tw-prose-bold': '#e2e8f0',
            '--tw-prose-links': '#61dafb',
            '--tw-prose-quotes': '#94a3b8',
            '--tw-prose-quote-borders': '#61dafb',
            '--tw-prose-bullets': '#61dafb',
            '--tw-prose-hr': '#2d3340',
            '--tw-prose-th-borders': '#2d3340',
            '--tw-prose-td-borders': '#2d3340',
            '--tw-prose-code': '#e2e8f0',
            code: {
              backgroundColor: '#22262f',
              borderRadius: '0.25rem',
              padding: '0.15rem 0.35rem',
              fontWeight: '400',
            },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            thead: {
              backgroundColor: '#1e2128',
            },
          },
        },
      },
    },
  },
  plugins: [typography],
}
