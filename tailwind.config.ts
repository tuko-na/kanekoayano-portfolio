import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // 'sans' という名前で游明朝体のフォントセットを定義
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