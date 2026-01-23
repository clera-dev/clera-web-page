'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logo from './Logo'
import { motion } from 'framer-motion'

export default function Navigation() {
  const pathname = usePathname()
  const [hasScrolled, setHasScrolled] = useState(false)
  const [isLargeDisplay, setIsLargeDisplay] = useState(false)

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      if (scrollPosition > 10) {
        setHasScrolled(true)
      } else {
        setHasScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Check for large display
  useEffect(() => {
    const checkIsLargeDisplay = () => {
      setIsLargeDisplay(window.innerWidth > 1920)
    }
    
    // Check on mount and when window resizes
    checkIsLargeDisplay()
    window.addEventListener('resize', checkIsLargeDisplay)
    
    return () => window.removeEventListener('resize', checkIsLargeDisplay)
  }, [])

  return (
    <nav className={`${
        hasScrolled || pathname !== "/" || isLargeDisplay
          ? "bg-black py-2"
          : "bg-black py-4"
      } sticky top-0 z-50 transition-all duration-300 ${isLargeDisplay ? 'py-3 border-b border-gray-900' : ''}`}>
      {/* This div controls the width constraints and centers the content, matching main page */}
      <div className="mx-auto" style={{ maxWidth: "84rem" }}>
        {/* This div aligns with the vertical lines from the page layout */}
        <div className="mx-auto flex justify-between items-center px-6 sm:px-8 md:px-12 lg:px-16">
          <Link href="/" className="flex items-center">
            <Logo className="my-1" />
          </Link>
          
          {/* Try it button - always visible */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#4299e1]/40 to-[#4299e1]/40 rounded-lg blur opacity-0 group-hover:opacity-60 transition duration-300"></div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="https://app.askclera.com/"
                className="relative inline-flex items-center justify-center rounded-md border border-[#4299e1] bg-transparent px-4 py-1 text-sm text-[#4299e1] transition-all duration-300 ease-in-out transform group-hover:scale-102 hover:text-white hover:bg-[#4299e1]"
              >
                Try it
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </nav>
  )
} 