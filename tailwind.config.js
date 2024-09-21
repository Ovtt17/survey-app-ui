/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'midnight-black': '#0b0e14'
      },
      backgroundColor: {
        body: '#F0F4F9',
        'midnight-black': '#0b0e14',
        'create-button': '#61DAFA'
      },
      boxShadowColor: {
        'create-button': '#61DAFA80'
      }
    },
  },
  plugins: [],
}

