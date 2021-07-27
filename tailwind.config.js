module.exports = {
  purge: [
    './src/**/*.vue',
    './src/**/*.js'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        '1/10': '10%'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
