module.exports = {
  purge: [
   './src/**/*.js',
   './src/**/*.vue',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
  },
  variants: {
    extend: {
      backgroundColor: ["checked"],
      borderColor: ["checked"],
      inset: ["checked"],
      zIndex: ["hover", "active"]
    },
  },
  plugins: [],
}
