import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '旅途 - 探險遊戲',
  description: '一個有趣的探險遊戲，踏上奇妙的旅程',
  keywords: ['遊戲', '探險', 'RPG', '旅途'],
  openGraph: {
    title: '旅途 - 探險遊戲',
    description: '一個有趣的探險遊戲，踏上奇妙的旅程',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

