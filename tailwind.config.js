module.exports = {
  purge: [
    "./components/**/*.{vue,js}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}"
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: "'Zen Kaku Gothic New', Helvetic, Arial, sans-serif"
      },
      opacity: {
        "15": "0.15"
      }
    }
  },
  variants: {
    extend: {
      animation: ["motion-safe", "motion-reduce"]
    }
  },
  plugins: []
};
