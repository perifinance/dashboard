module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: 'class',
    theme: {
        minWidth: {
            '12': '3rem',
            '52': '13rem',
            '36': '9rem',
            '80': '20rem',
            '86': '21.5rem',
        },
        extend: {
            
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
                    500: '#1D86FE',
                    600: '#235397',
                    700: '#425dce',
                    800: '#4074BF',
                    900: '#071A2D'
                },
                navy: {
                    500: '#273457',
                    700: '#131832',
                    800: '#1D335A'
                },
                pink: {
                    500: '#F38488',
                    700: '#F95398',
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