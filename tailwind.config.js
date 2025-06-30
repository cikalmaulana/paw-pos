/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: '#F2F2F2',
        primary: '#16B8A8',
        secondary: '#0E817A',
        primary_press: '#13a193',
        secondary_press: '#0c6b65',
        light: {
          100: '#D6C6FF',
          200: '#A8B5DB',
          300: '#9CA4AB'
        },
        dark: {
          100: '#221F3D',
          200: '#0F0D23'
        },
        accent: '#AB8BFF',
        danger: '#CF0F47',
        success: '#16B8A8',
        deact: '#B2C6D5'
      }
    },
  },
  plugins: [],
}

