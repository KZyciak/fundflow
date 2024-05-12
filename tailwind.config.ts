/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "#000000",
        darkGrey: "#121212",
        grey: "#232323",
        highlightGrey: "#1c1c1c",
        lightGrey: "#5A5959",
        textGrey: "#A7A7A7",
        textLight: "#FFFFFF",
        lightRed: "#E65F5C",
        mainBlue: "#B1DDF1",
        mainYellow: "#FCCB06",
      },
    },
  },
};
