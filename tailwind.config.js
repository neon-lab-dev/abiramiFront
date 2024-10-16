export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Inter: ['Inter', 'serif'],
      },

      colors : {
        primary: {
          10: '#921B1D',
          20: '#730B0D',
          30: '#D94535',
        },
  
        secondary: {
          10: '#F0F6FF',
          20: '#FFFBF0',
          30: '#FFFBF0',
          40: '#F5F5FF',
          45: '#F9FFF2',
          50: '#F2FFFA',
          55: '#F2FAFF',
          60: '#F7F9FB',
        },
  
        // Add the font colors here
        neutral: {
          10 : '#1C1C1C',
          15: '',
          20: '',
          25: '',
          30: '',
          35: '',
          40: '',
          45: '',
          55: '',
          60: '',
          70 : '',
          80: '',
        },
      }
    },
  },
  plugins: [],
}