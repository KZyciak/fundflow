/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        backgroundColor: "#161616",
        elementBackgroundColor: "#1C1C1C",
        borderColor: "#242424",
        lightBorderColor: "#393939",
        activeElementBackgroundColor: "#2C2C2C",
        grayColor: "#858585",
        textWhiteColor: "#F6F6F6",
        textBlackColor: "#161616",
        AccentLimeColor: "#B6FF1B",
        AccentPurpleColor: "#8B1BFF",
      },
      fontFamily: {
        inter: "var(--font-inter)",
        "ibm-plex-serif": "var(--font-ibm-plex-serif)",
      },
    },
  },
};
