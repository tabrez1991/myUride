"use client"; // This is a client component

import './globals.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import 'remixicon/fonts/remixicon.css';
import React from 'react';
import NavBar from '@/components/navbar';
import Header from '@/components/Header';
import { Box } from '@mui/material';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [openNav, setOpenNav] = React.useState<boolean>(true);

  return (
    <html lang="en">
      <body>
        <Box style={{ display: 'flex' }}>
          {openNav && <NavBar />}
          <Box style={{ flexGrow: 0 }}>
            <Header handleNavBar={() => setOpenNav(!openNav)} />
            <main style={{ padding: '20px' }}>
              {children}
            </main>
          </Box>
        </Box>
      </body>
    </html>
  )
}
