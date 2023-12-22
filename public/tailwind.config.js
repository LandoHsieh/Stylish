/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens:{
      'xl': '1280px',
      'xs': '480px ',
    },
    extend: {
      borderWidth:{
        '15': '15px'
      }
    },
  },
  plugins: [],
}

