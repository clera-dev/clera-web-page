'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logo from './Logo'
import { NoiseBackground } from './ui/noise-background'

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
          
          {/* Try it button - noise background style */}
          <NoiseBackground
            containerClassName="w-fit p-1.5 rounded-full"
            gradientColors={[
              "rgb(66, 153, 225)",
              "rgb(99, 179, 237)",
              "rgb(144, 205, 244)",
            ]}
          >
            <Link
              href="https://app.askclera.com/"
              className="inline-flex items-center justify-center cursor-pointer rounded-full bg-gradient-to-r from-neutral-900 via-neutral-900 to-black px-4 py-1.5 text-sm font-medium text-white shadow-[0px_1px_0px_0px_var(--color-neutral-950)_inset,0px_1px_0px_0px_var(--color-neutral-800)] transition-all duration-150 active:scale-98"
            >
              Try it
            </Link>
          </NoiseBackground>
        </div>
      </div>
    </nav>
  )
} 