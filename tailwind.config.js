const {
  borderRadius,
  colors,
  screens,
  spacing,
} = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        ...borderRadius,
        "2xs": "4px",
        xs: "8px",
        sm: "12px",
        bs: "16px",
        md: "24px",
        lg: "36px",
        xl: "48px",
        "2xl": "72px",
      },
      colors: {
        gray: {
          ...colors.gray,
          100: "#f8f8f9",
          200: "#f1f2f3",
          300: "#e4e5e7",
          400: "#bdbdbd",
          700: "#828282",
          900: "#333333",
        },
        green: {
          ...colors.green,
          500: "#27ae60",
        },
        orange: {
          ...colors.orange,
          500: "#fa812f",
        },
        ruby: {
          100: "#ffeceb",
          200: "#fdb2ad",
          300: "#fc8c83",
          400: "#fb665b",
          500: "#fa4032",
          600: "#ea1505",
          700: "#af1004",
          800: "#750a02",
          900: "#3a0501",
        },
      },
      fontFamily: {
        sans: ["'Open Sans'", "sans-serif"],
      },
      screens: {
        ...screens,
        mobile: "480px",
      },
      spacing: {
        ...spacing,
        "2xs": "4px",
        xs: "8px",
        sm: "12px",
        bs: "16px",
        md: "24px",
        lg: "36px",
        xl: "48px",
        "2xl": "72px",
      },
    },
  },
};
