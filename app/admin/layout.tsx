"use client"; // This is a client component

import '../globals.css'
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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>myUride</title>
      </head>
      <body>
        <Box style={{ display: 'flex' }}>
          {openNav && <NavBar />}
          <Box style={{ flexGrow: 1, width: "84%" }}>
            <Header handleNavBar={() => setOpenNav(!openNav)} />
            <main style={{ padding: '20px', marginTop: "65px", background: "#eee" }}>
              {children}
            </main>
          </Box>
        </Box>
      </body>
    </html>
  )
}
