module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: 'class',
    theme: {
        extend: {
            minWidth: {
                '12': '3rem',
                '52': '13rem',
                '36': '9rem',
                '80': '20rem',
                '86': '21.5rem',
            },
            screens: {
                'xs': '320px',
                'ss': '440px'
            },
            maxWidth: {
                '100': '25.833rem'
            },
            width: {
                '27': '6.375rem',
                '46': '11.25rem',
                '50': '12.5rem',
                '100': '25.833rem',
                '122': '30.5rem'
            },
            height: {
                '45': '11.25rem'
            },
            flexGrow: {
                '1': 1,
                '2': 2
            },
            fontFamily: {
                serif: ['Roboto', 'serif'],
            },
            fontSize: {
                '2xs': ['0.563rem', {
                    letterSpacing: '0px',
                }],
                'sm': ['0.875rem', {
                    letterSpacing: '0px',
                }],
                'xl': ['1.25rem', {
                    lineHeight: '2rem'
                }],
                '4xl': ['2.5rem', {
                    lineHeight: '2.5rem'
                }]
            },
            colors: {
                'blue': {
                    500: '#0e23e3',
                    600: '#235397',
                    700: '#5742fb',
                    800: '#1a204a',
                    900: '#071A2D',
                    950: '#01092c',
                },
                navy: {
                    500: '#273457',
                    700: '#131832',
                    800: '#1D335A'
                },
                pink: {
                    500: '#f668e1',
                    700: '#eb1b8a',
                },
                red: {
                    800: '#A91E1E',
                    900: '#1E0F0F'
                },
                'orange': {
                    500: '#F2A555',
                },
                green: {
                    500: '#66D69B',
                },
                gray: {
                    500: '#B1BAD7',
                    700: '#6C799B',
                    900: '#374565'
                }
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}