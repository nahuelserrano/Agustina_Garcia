import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        crema: {
          DEFAULT: '#F4F0E7',
          50: '#FBF9F3',
          100: '#F4F0E7',
          200: '#EBE5D7',
          300: '#E0D8C4',
        },
        verde: {
          DEFAULT: '#37937E',
          50: '#EBF4F0',
          100: '#D4E8E0',
          500: '#37937E',
          600: '#2F8671',
          700: '#28725F',
          800: '#1F594B',
          900: '#163f36',
        },
        noche: {
          DEFAULT: '#222B3A',
          700: '#2A3446',
          800: '#222B3A',
          900: '#161D29',
        },
        durazno: '#F0DCAB',
        menta: '#C3E1D9',
        salvia: '#BAD6C2',
        arena: '#E4DCC8',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widecaps: '0.22em',
      },
      boxShadow: {
        card: '0 18px 40px -22px rgba(34, 43, 58, 0.30)',
        lift: '0 26px 55px -28px rgba(34, 43, 58, 0.38)',
      },
    },
  },
  plugins: [],
};

export default config;
