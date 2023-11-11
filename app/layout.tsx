'use client'
import { Inter } from 'next/font/google'

import './globals.css'
import "bootstrap-material-design/dist/css/bootstrap-material-design.min.css";
import { TopNav } from '@/components/nav/TopNav';
import { Toaster } from "react-hot-toast"
import { SessionProvider } from "next-auth/react"
import { CategoryProvider } from '@/context/category';
import { TagProvider } from '@/context/tag';
import { ProductProvider } from '@/context/product';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <SessionProvider>
        <CategoryProvider>
          <TagProvider>
            <ProductProvider>
              <body className={inter.className}>
                <TopNav />
                <Toaster />
                {children}
              </body>
            </ProductProvider>
          </TagProvider>
        </CategoryProvider>
      </SessionProvider>
    </html>
  )
}
