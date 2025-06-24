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
      {/* classNameに "font-sans" が指定されていることを確認 */}
      <body className="font-sans antialiased flex flex-col min-h-screen relative">
        <Header />
        <main className="flex-grow pt-16 sm:pt-24">{children}</main>
        <Footer />
      </body>
    </html>
  )
}