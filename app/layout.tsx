'use client'
import { Inter } from 'next/font/google'

import './globals.css'
import "bootstrap-material-design/dist/css/bootstrap-material-design.min.css";
import { TopNav } from '@/components/nav/TopNav';
import { Toaster } from "react-hot-toast"
import { SessionProvider } from "next-auth/react"
const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <SessionProvider>
        <body className={inter.className}>
          <TopNav />
          <Toaster />
          {children}
        </body>
      </SessionProvider>
    </html>
  )
}
