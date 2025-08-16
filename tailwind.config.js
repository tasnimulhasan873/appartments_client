/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    light: '#0891b2', // cyan-600
                    DEFAULT: '#2563eb', // blue-600
                    dark: '#9333ea', // purple-600
                },
                overlay: 'rgba(0, 0, 0, 0.2)',
                glow: 'rgba(255, 255, 255, 0.1)',
                blurPurple: 'rgba(168, 85, 247, 0.2)',
                ctaText: '#2563eb',
            },
            animation: {
                'spin-slow': 'spin 3s linear infinite',
                'pulse-slow': 'pulse 2s ease-in-out infinite',
                'float': 'float 2s ease-in-out infinite',
                'float-delay': 'float 2s ease-in-out infinite 0.3s',
                'float-delay-2': 'float 2s ease-in-out infinite 0.6s',
                'moveGradient': 'moveGradient 15s ease infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-8px)' },
                },
                moveGradient: {
                    '0%': { transform: 'translateX(-50%) translateY(-50%)' },
                    '50%': { transform: 'translateX(50%) translateY(50%)' },
                    '100%': { transform: 'translateX(-50%) translateY(-50%)' },
                },
            },
        },
    },
    plugins: [
        require('daisyui'),
    ],
    daisyui: {
        themes: ["light", "dark"],
    },
}
