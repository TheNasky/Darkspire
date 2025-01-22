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
          DEFAULT: '#10B981',  // Emerald-500
          dark: '#059669',    // Emerald-600
        },
        background: {
          dark: '#0A0B0F',
          darker: '#050507',
          lighter: '#1A1A23',
        },
        accent: {
          emerald: '#10B981',
          cyan: '#06B6D4',
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'cell-drop': 'cell-drop 0.4s ease-out forwards',
        'sprite-walk': 'sprite-walk 0.8s steps(4) infinite',
        'sprite-attack': 'sprite-attack 0.7s steps(7)',
        'sprite-idle': 'sprite-idle 1s ease-in-out infinite',
      },
      keyframes: {
        'cell-drop': {
          '0%': { 
            transform: 'translateY(-20px)',
            opacity: '0'
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1'
          }
        },
        'sprite-walk': {
          '0%': { backgroundPositionX: '0' },
          '25%': { backgroundPositionX: '-100%' },
          '50%': { backgroundPositionX: '-200%' },
          '75%': { backgroundPositionX: '-300%' },
        },
        'sprite-attack': {
          '0%': { backgroundPositionX: '0' },
          '14.28%': { backgroundPositionX: '-100%' },
          '28.57%': { backgroundPositionX: '-200%' },
          '42.85%': { backgroundPositionX: '-300%' },
          '57.14%': { backgroundPositionX: '-400%' },
          '71.42%': { backgroundPositionX: '-500%' },
          '85.71%': { backgroundPositionX: '-600%' },
        },
        'sprite-idle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-2px)' },
        }
      }
    },
  },
  plugins: [],
}

