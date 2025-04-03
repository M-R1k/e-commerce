/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      primary: "Poiret One",
      secondary: "Thasadith",
    },
    extend: {
      colors: {
        "white-purple": "#ffecff",
        gold: "#ffc677",
        "light-purple": "#fea8ff",
        "light-purple-20": "rgba(205, 146, 242, 0.2)",
        "light-purple-50": "rgba(205, 146, 242, 0.5)",
        "light-blue": "rgba(196,174,246,255)",
        "dark-purple": "#d9a9ff",
        "dark-mode-purple": "#160438",
        "dark-mode-light-purple": "#6D4FAE",
        black: "#0C0910",
        white: "#F5F5F5",
        grey: "#DEDEE0",
        navbar: "#111827",
        greyy : "rgb(161 161 170)"
      },
      backgroundImage: {
        login: "url('./assets/login.jpg')",
        register: "url('./assets/register.jpg')",
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
      },
      transitionProperty: {
        "width-height": "width, height",
      },
      transform: {
        "translate-20p": "translateX(20%)",
        "translate-100n": "translateX(-100%)",
        "translate-0": "translateX(0)",
      },
      translate: {
        "-1/5": "-20%",
      },
      zIndex: {
        10: "10",
        20: "20",
      },
      boxShadow: { 
        myShadow1: "4.1px -5px 0 0 rgba(255,236,255,255)",
        myShadow2: "-4.1px -5px 0 0 rgba(255,236,255,255)",
        myShadow3: "4.1px -5px 0 0 rgba(21, 5, 54)",
        myShadow4: "-4.1px -5px 0 0 rgba(21, 5, 54)",
      },
    },
  },
  variants: {
    extend: {
      transform: ["responsive", "hover", "focus"],
      transitionProperty: ["responsive", "hover", "focus"],
      boxShadow: ["dark"],
    },
  },
  plugins: [],
};