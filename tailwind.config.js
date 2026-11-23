/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      colors: {
        background: { DEFAULT: 'var(--background)' },
        foreground: { DEFAULT: 'var(--foreground)' },
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
          secondary: 'var(--accent-secondary)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        border: { DEFAULT: 'var(--border)' },
        input: { DEFAULT: 'var(--input)' },
        ring: { DEFAULT: 'var(--ring)' },
        'dark-bg': { DEFAULT: 'var(--dark-bg)' },
        'dark-card': { DEFAULT: 'var(--dark-card)' },
        'dark-border': { DEFAULT: 'var(--dark-border)' },
        success: { DEFAULT: 'var(--success)' },
        warning: { DEFAULT: 'var(--warning)' },
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
        sm: 'calc(var(--radius) - 0.25rem)',
        lg: 'calc(var(--radius) + 0.25rem)',
        xl: 'calc(var(--radius) + 0.5rem)',
        '2xl': 'calc(var(--radius) + 1rem)',
      },
      fontFamily: {
        sans: ['var(--font-manrope)', 'sans-serif'],
        display: ['var(--font-manrope)', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '1rem' }],
      },
      fontWeight: {
        300: '300',
        500: '500',
        600: '600',
        700: '700',
        800: '800',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(15,23,42,0.06), 0 4px 12px rgba(15,23,42,0.06)',
        'card-hover': '0 8px 32px rgba(15,23,42,0.12)',
        'glow-accent': '0 0 32px rgba(37,99,235,0.2)',
        'glow-sm': '0 0 16px rgba(37,99,235,0.15)',
      },
      keyframes: {
        nodePulse: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.15)' },
        },
        floatGentle: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        'node-pulse': 'nodePulse 3s ease-in-out infinite',
        'float-gentle': 'floatGentle 4s ease-in-out infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};