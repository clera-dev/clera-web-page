import React from "react"
import "../styles/globals.css"
import { Inter } from "next/font/google"
import { Toaster } from "sonner"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

// Add viewport export for proper mobile scaling
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark bg-black">
      <body className={`${inter.variable} font-sans antialiased bg-black overflow-x-hidden`}>
        <div id="top"></div>
        <Navigation />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}
