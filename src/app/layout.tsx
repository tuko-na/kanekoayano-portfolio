import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'カネコアヤノ Fan Site',
  description: 'カネコアヤノさんのファンサイトです。',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      {/* bodyのクラスを新しいカラーパレットに合わせて修正 */}
      <body className="font-sans antialiased flex flex-col min-h-screen relative bg-background text-foreground">
        <Header />
        <main className="flex-grow pt-20 sm:pt-24">{children}</main>
        <Footer />
      </body>
    </html>
  )
}