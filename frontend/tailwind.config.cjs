module.exports = {
  content: ["./index.html", "./src/**/*.{html,js,jsx,ts,tsx,mjs}"],
  safelist: ["btn","card","input","glass","brand-badge","bg-brand-500","bg-brand-600"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f5fbff",
          100: "#e6f4ff",
          200: "#bfebff",
          300: "#99e2ff",
          400: "#66d4ff",
          500: "#33c6ff",
          600: "#18a6d9",
          700: "#127a9f",
          800: "#0c4f66",
          900: "#062633"
        }
      }
    }
  },
  plugins: []
}