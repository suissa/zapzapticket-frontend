/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    /^bg-/,
    /^to-/,
    /^from-/,
  ],
  theme: {
      extend: {
        width: {
          '1/8': '12.5%',
          '1/10': '10%',
          '1/12': '8.333333%',
        },
      },
  },
  plugins: [],
}