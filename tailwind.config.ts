/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'media', // この行を追記
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#f7f6f2',
        surface: '#ffffff',
        foreground: '#1c1c1c',
        border: '#e5e7eb',
        accent: '#232323',
      },
      fontFamily: {
        sans: [
          'Yu Mincho',
          '游明朝体',
          '"Hiragino Mincho ProN"',
          '"ヒラギノ明朝 ProN"',
          'serif',
        ],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'marquee': 'marquee 40s linear infinite',
      },
      keyframes: {
        spin: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
    },
  },
  plugins: [],}
}