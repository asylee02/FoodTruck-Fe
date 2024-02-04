/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      height:{
        xxl: '92%',
        xxs: '8%',
      },
      colors:{
        info: '#EAD196',
        line: '#E52525',
        background : '#FF9999',
        progress : '#FFADAD'

      },
      borderWidth:{
        1: '1px'
      },
    },
  },
  plugins: [],
}

