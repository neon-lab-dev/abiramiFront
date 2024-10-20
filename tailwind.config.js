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
          25 : "#fff5dc",
          30: '#FFFBF0',
          35: '#FFF5F2',
          40: '#F5F5FF',
          45: '#F9FFF2',
          50: '#F2FFFA',
          55: '#F2FAFF',
          60: '#F7F9FB',
          65: '#0063FF',
          70: '#FFC327',
          75: '#FF8F6B',
          80: '#F5F5FF',
          85: '#605BFF',
          90: '#8BC149',
          95: '#F9FFF2',
          100: '#A1E3CB',
          105: '#F2FFFA',
          110: '#A8C5DA',
          115: '#A5C1D6',
          120: '#FFEBEB',
          125: '#921B1D'
        },
        black : "#000",
  
        // Add the font colors here
        neutral: {
          10 : '#1C1C1C',
          15: '#4186F30F',
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