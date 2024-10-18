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
        },

        secondary: {
          10: "#F0F6FF",
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
        },
        sucess: {
          10: "#F2FFFA",
        },
        blue: {
          10: "#EBF3FF",
        },

        // Add the font colors here
        neutral: {
          10: "#1C1C1C",
          15: "rgba(28, 28, 28, 0.6)",
          20: "#76B59E",
          25: "#4186F3",
          30: "",
          35: "",
          40: "",
          45: "",
          55: "",
          60: "",
          70: "",
          80: "",
        },
      },
      boxShadow: {
        tableShadow: "0px 1px 0px 0px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
