/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
      'xs': '375px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
     fontFamily: {
        'great-vibes': ['"Great Vibes"', 'cursive'],
        'pacifico': ['Pacifico', 'cursive'],
        'dancing-script': ['"Dancing Script"', 'cursive'],
        'cormorant': ['"Cormorant Garamond"', 'serif'],
      },
    },
    
  },
  plugins: [],
};