module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './node_modules/catalyst/**/*.{js,jsx,ts,tsx}', // Add this if `catalyst` is external
  ],
  mode: 'jit', // Enable JIT mode
  // darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Invariable', 'system-ui', 'sans-serif'], // Set Invariable as the primary font
      },
      borderWidth: {
        '0.5': '0.5px', // Custom border width
      },
      boxShadow: {
        "blue-glow": "0 0 20px 10px rgba(0, 0, 255, 0.8)", // Custom blue glow shadow
      },
      colors: {
        "form-background": "rgb(38 38 38)", // Your custom color
        "input-background-color": "rgb(82 82 82)",
        "input-text-color": "rgb(245 245 245)",
        "red": "rgb(255, 107, 107)", 
        "yellow": "rgb(255, 217, 61)", 
        "green": "rgb(107, 203, 119)", 
        "sky-blue": "rgb(77, 150, 255)", 
        "pink": "rgb(255, 110, 255)", 
        "indigo-blue": "rgb(76, 76, 255)", 
        "loop-blue": "#05acd8",
        'brand-dark': '#232122',
        'brand-gold': '#f4d03c',
        'brand-light': '#f3f3f3',
        'brand-blue': '#05acd8',
        'brand-red': '#e8433d',
        'brand-pink': '#e2416b',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/line-clamp"), // Line clamp plugin
    require('tailwind-scrollbar-hide'), // Scrollbar hide plugin
  ],
};