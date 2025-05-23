import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      colors: {
        primary: '#D72638',
        secondary: '#E5E7E6',
        tertiary: '#B7B5B3',
        dark: '#141301',
        accent: '#211A1D'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Montserrat', 'sans-serif']
      }
    }
  },

  plugins: [typography, forms, containerQueries]
} satisfies Config;
