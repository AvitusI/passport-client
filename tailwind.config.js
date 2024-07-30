/** @type {import('tailwindcss').Config} */
//import { nextui } from "@nextui-org/react";

import { nextui } from "@nextui-org/react";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js, ts, jsx, tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: "#ffd700",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
