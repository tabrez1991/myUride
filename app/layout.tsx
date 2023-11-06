import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import 'remixicon/fonts/remixicon.css';
import React from 'react';
import Layout from '@/components/Layout';
import NavBar from '@/components/navbar';
import Header from '@/components/Header';

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
        <div style={{ display: 'flex' }}>
          <NavBar/>
          <div style={{ flexGrow: 0 }}>
            <Header />
            <main style={{ padding: '20px' }}>
              {children}
            </main>
          </div>
          </div>
      </body>
    </html>
  )
}
