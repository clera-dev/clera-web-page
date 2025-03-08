'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Logo from './Logo'
import ContactSlideout from './ContactSlideout'
import { motion } from 'framer-motion'

export default function Navigation() {
  const pathname = usePathname()
  const [isContactOpen, setIsContactOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)

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

  // Listen for custom event to open waitlist slideout
  useEffect(() => {
    const handleOpenWaitlist = () => {
      setIsContactOpen(true)
    }

    window.addEventListener('openWaitlistSlideout', handleOpenWaitlist)
    return () => window.removeEventListener('openWaitlistSlideout', handleOpenWaitlist)
  }, [])

  const isActive = (path: string) => {
    return pathname === path ? 
      "text-[#4299e1] font-medium text-sm" : 
      "text-slate-200 hover:text-[#4299e1] transition-colors text-sm"
  }

  return (
    <>
      <nav className={`sticky top-0 left-0 right-0 z-50 bg-black transition-all duration-200 
        ${hasScrolled ? 'border-b border-white/10' : 'border-b border-transparent'}`}>
        <div className="w-full">
          <div className="flex items-center justify-between h-14 max-w-7xl mx-auto px-6">
            {/* Left side logo - positioned near left edge */}
            <div className="flex-shrink-0 flex items-center h-full pb-[3px] -ml-4">
              <div className="transform scale-[0.7]">
                <Link href="/">
                  <Logo />
                </Link>
              </div>
            </div>

            {/* Right side nav items - positioned near right edge */}
            <div className="flex items-center space-x-6">
              <Link 
                href="/" 
                className={isActive('/')}
              >
                Ask Clera
              </Link>
              <Link 
                href="/pricing" 
                className={isActive('/pricing')}
              >
                Pricing
              </Link>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#4299e1]/40 to-[#4299e1]/40 rounded-lg blur opacity-0 group-hover:opacity-60 transition duration-300"></div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    variant="outline" 
                    onClick={() => setIsContactOpen(true)}
                    className={`relative px-4 py-1 text-sm transition-all duration-300 ease-in-out transform group-hover:scale-102
                      ${isContactOpen 
                        ? 'bg-[#4299e1] text-white border-[#4299e1]' 
                        : 'bg-transparent border-[#4299e1] text-[#4299e1] hover:text-white hover:bg-[#4299e1]'
                      }`}
                  >
                    Join Waitlist
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <ContactSlideout 
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </>
  )
} 