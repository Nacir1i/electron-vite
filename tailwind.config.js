/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#EDF2F7",
        secondary: "#FCFEFE",

        highlight: "#003432",
        "strong-contrast": "#111827",
        "weak-contrast": "#666E7D",
        "weakest-contrast": "#EFF0F6",
      },
      fontFamily: {
        asap: ["Asap", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        "open-sans": ["Open Sans", "sans-serif"],
      },
    },
    screens: {
      sm: "640px",
      md: "721px",
      lg: "1025px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  // plugins: [require("daisyui")],
};
