import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#f7f6f2', // 落ち着いたベージュ系の背景色
        surface: '#ffffff',    // カードや要素の背景色 (白)
        foreground: '#1c1c1c', // 真っ黒ではない文字色
        border: '#e5e7eb',     // 控えめなボーダー色 (グレー)
        accent: '#232323',     // ホバー時などに使う濃いグレー
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
    },
  },
  plugins: [],
}
export default config