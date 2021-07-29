module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'primary': '#73C0D8',
        'secondary': '#666666',
        'warning': '#FFF126',
        'danger': '#FFA573',
        'muted': '#A5A5A5',
        'dark': '#333333',
        'gray': '#B2B2B2',
      },
      inset: {
        '-16': '-4rem',
      }
    },
  },
  variants: {
    extend: {
      borderRadius: ['hover', 'focus'],
    },
  },
  plugins: [],
}
