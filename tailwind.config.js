/** @type {import('tailwindcss').Config} */
//import { nextui } from "@nextui-org/react";

import { nextui } from '@nextui-org/react';

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js, ts, jsx, tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: '#ffd700',
      },
      gridTemplateColumns: {
        custom: '50px 1fr',
        customized: '1fr 40px',
        customization: '1fr 1fr',
      },
      fontFamily: {
        custom: ['Playwrite CU'],
        customized: ['Nerko One'],
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
};
