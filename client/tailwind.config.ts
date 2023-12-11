import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    {
      pattern: /animate-animate.+/,
    },
    {
      pattern: /translate-x-paginate-.+/,
    },
  ],
  theme: {
    screens: {
      'xl': {'max': '1280px'},

      'lg': {'max': '1024px'},

      'md': {'max': '768px'},

      'sm': {'max': '640px'},
    },
    extend: {
      translate: {
        'paginate-0': '0',
        'paginate-1': 'var(--pagination-shift)',
        'paginate-2': 'calc(var(--pagination-shift)*2)',
        'paginate-3': 'calc(var(--pagination-shift)*3)',
        'paginate-4': 'calc(var(--pagination-shift)*4)',
        'paginate-5': 'calc(var(--pagination-shift)*5)',
        'paginate-6': 'calc(var(--pagination-shift)*6)',
        'paginate-7': 'calc(var(--pagination-shift)*7)',
        'paginate-8': 'calc(var(--pagination-shift)*8)',
      },
      animation: {
        'move-bg': 'move-bg 5s ease infinite alternate',
        animate1: 'animate1 25s ease-in-out infinite',
        animate2: 'animate2 25s ease-in-out infinite',
        animate3: 'animate3 25s ease-in-out infinite',
        animate4: 'animate4 25s ease-in-out infinite',
        animate5: 'animate5 25s ease-in-out infinite',
      },
      keyframes: {
        'move-bg': {
          from: { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          to: { backgroundPosition: '0% 50%' },
        },
        animate1: {
          from: { transform: 'rotate(45deg) translateY(-15rem)' },
          '50%': { transform: 'rotate(45deg) translateY(-25rem)' },
          to: { transform: 'rotate(45deg) translateY(-15rem)' },
        },
        animate2: {
          from: { transform: 'rotate(45deg) translateY(20rem)' },
          '50%': { transform: 'rotate(45deg) translateY(0rem)' },
          to: { transform: 'rotate(45deg) translateY(20rem)' },
        },
        animate3: {
          from: { transform: 'rotate(45deg) translateY(20rem)' },
          '50%': { transform: 'rotate(45deg) translateY(10rem)' },
          to: { transform: 'rotate(45deg) translateY(20rem)' },
        },
        animate4: {
          from: { transform: 'rotate(45deg) translateY(20rem)' },
          '50%': { transform: 'rotate(45deg) translateY(10rem)' },
          to: { transform: 'rotate(45deg) translateY(20rem)' },
        },
        animate5: {
          from: { transform: 'rotate(45deg) translateY(30rem)' },
          '50%': { transform: 'rotate(45deg) translateY(20rem)' },
          to: { transform: 'rotate(45deg) translateY(30rem)' },
        }
      },
      backgroundSize: {
        '200%': '200%',
      },
      maxWidth: {
        screen: '100vw',
      },
      borderRadius: {
        '7xl': '3.5rem',
      },
    },
  },
  plugins: [],
};
export default config;
