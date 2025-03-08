import React from "react"
import "../styles/globals.css"
import { Inter } from "next/font/google"
import { Toaster } from "sonner"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        <div id="top"></div>
        <Navigation />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}
