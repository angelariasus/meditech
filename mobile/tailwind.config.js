/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        meditech: {
          blue: '#0ea5e9',
          dark: '#0f172a',
          light: '#f1f5f9'
        }
      }
    },
  },
  plugins: [],
}
