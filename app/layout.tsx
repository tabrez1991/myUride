import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Header from '@/components/Header';
import NavBar from '@/components/navbar';
import 'remixicon/fonts/remixicon.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'myUride',
  description: 'myUride',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <NavBar />
        {children}
      </body>
    </html>
  )
}
