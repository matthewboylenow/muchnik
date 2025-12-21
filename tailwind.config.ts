import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1a365d',
          dark: '#0f2442',
          light: '#2c4a7c',
        },
        gold: {
          DEFAULT: '#b8860b',
          light: '#d4a732',
          dark: '#8b6914',
        },
        cream: {
          DEFAULT: '#faf9f6',
          dark: '#f5f3ed',
        },
        sage: {
          DEFAULT: '#7c9082',
          light: '#a3b5a8',
        },
        burgundy: '#722f37',
        'warm-gray': {
          DEFAULT: '#6b7280',
          light: '#9ca3af',
        },
        charcoal: '#374151',
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'Georgia', 'serif'],
        body: ['var(--font-body)', '-apple-system', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#374151', // charcoal
            maxWidth: 'none',
            a: {
              color: '#b8860b', // gold
              textDecoration: 'underline',
              '&:hover': {
                color: '#8b6914', // gold-dark
              },
            },
            h1: {
              color: '#1a365d', // navy
              fontFamily: 'var(--font-heading)',
            },
            h2: {
              color: '#1a365d', // navy
              fontFamily: 'var(--font-heading)',
            },
            h3: {
              color: '#1a365d', // navy
              fontFamily: 'var(--font-heading)',
            },
            h4: {
              color: '#1a365d', // navy
              fontFamily: 'var(--font-heading)',
            },
            strong: {
              color: '#1a365d', // navy
            },
            blockquote: {
              color: '#374151', // charcoal
              borderLeftColor: '#b8860b', // gold
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;
