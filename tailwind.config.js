export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Inter: ["Inter", "serif"],
      },

      colors: {
        primary: {
          10: "#921B1D",
          20: "#730B0D",
          30: "#D94535",
          40: "#FFEDEB",
          50: '#5C9A11'
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
          125: '#921B1D',
          130: '#FFD8CC',
          135: '#E2E2E2',
          140: '#E0E2E7',
          145: '#E2E8F0',
          150: '#4186F3',
          155: '#F2F2F2',
          160: '#FAFAFA',
          165: '#EFFAE1',
          170:"#FFF8F7",
          175:"#0000001A"
        },
        black : "#000",
  
        // Add the font colors here
        neutral: {
          5 : '#1C1C1C',
          10: "#F0F6FF",
          15: '#4186F30F',
          20: "#FFFBF0",
          30: "#FFFBF0",
          40: "#F5F5FF",
          45: "#F9FFF2",
          50: "#F2FFFA",
          55: "#F2FAFF",
          60: "#F7F9FB",
          65: "#EFEFEF",
          70: "rgba(0, 0, 0, 0.05)",
          80: "#E2E8F0",
          85:"#1c1c1c99",
          90:"#76B59E",
          95:"#1C1C1C66",
          100:"#637381"
        },
        sucess: {
          10: "#F2FFFA",
          20:"#F4FFE5"
        },
        customBlue: {
          10: "#EBF3FF",
          20:"#4186F3"
        },
      },
      boxShadow: {
        tableShadow: "0px 1px 0px 0px rgba(0, 0, 0, 0.1)",
        dropdown: '0px 1px 3px 0px rgba(166, 175, 195, 0.4)',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none', 
          'scrollbar-width': 'none', 
        },
        '.scrollbar-hide::-webkit-scrollbar': {
          'display': 'none', 
        },
       '.scrollbar-y-visible': {
      overflowX: 'scroll',  // Hide the X-axis scrollbar
      overflowY: 'scroll',  // Enable scrolling only on the Y-axis
    },
    '.scrollbar-y-visible::-webkit-scrollbar': {
      width: '6px',   // Width for Y-axis scrollbar only
      height: '0px',  // Set height to 0 to prevent X-axis scrollbar
    },
    '.scrollbar-y-visible::-webkit-scrollbar-thumb': {
      backgroundColor: '#9A9A9A',
      borderRadius: '6px',
    },
    '.scrollbar-y-visible::-webkit-scrollbar-track': {
      backgroundColor: 'transparent',
    },
      };

      addUtilities(newUtilities, ['responsive']);
    },
  ],
};