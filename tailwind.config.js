/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        flamingBlack: "#1F1F1F",
        flamingRed : "#EC1C24",
        flamingYellow:"#FBBC05",
        flamingGrey: "#292929",
        flamingAsh: "#313131"
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
        ".no-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
        // Add your custom scrollbar styles here
        ".custom-scrollbar::-webkit-scrollbar": {
          width: "5px",
          opacity: "0%",
          display: "hidden"
          // transition: "opacity 0.3s", 
          /* Add transition for smooth appearance */
        },
        ".custom-scrollbar:hover::-webkit-scrollbar": {
          
        },
        ".custom-scrollbar::-webkit-scrollbar-track": {
          background: "#888", // Set the background color of the track
        },
        ".custom-scrollbar::-webkit-scrollbar-thumb": {
          background: "#EC1C24", // Set the color of the thumb
        },
        ".custom-scrollbar::-webkit-scrollbar-thumb:hover": {
          background: "#f00", // Set the color of the thumb on hover
        },
      });
    }),
  ]
};
