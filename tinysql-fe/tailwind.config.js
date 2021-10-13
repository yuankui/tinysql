module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
        borderWidth: {
            1: '1px',
        },
        transitionDuration: {
            2000: '2000ms',
        },
        flex: {
            2: '0 0 8px',
        },
        margin: {
            '-0.25': '-3px',
        },
        minHeight: {
            '4': '5rem',
        }
    },
},
variants: {
    extend: {
        backgroundColor: ['active'],
    },
},
  plugins: [],
}
