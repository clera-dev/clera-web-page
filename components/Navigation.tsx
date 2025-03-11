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
      <nav className={`${
          hasScrolled || pathname !== "/"
            ? "bg-black py-2"
            : "bg-black py-4"
        } sticky top-0 z-50 transition-all duration-300`}>
        {/* This div controls the total max width and centers the content */}
        <div className="mx-auto px-4 md:px-8" style={{ maxWidth: "84rem" }}>
          {/* This div aligns with the vertical lines from the page layout */}
          <div className="mx-auto flex justify-between items-center" style={{ maxWidth: "calc(84rem - 4rem)", margin: "0 auto" }}>
            <Link href="/" className="flex items-center">
              <Logo className="my-1" />
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
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
            
            {/* Mobile Navigation */}
            <div className="flex md:hidden items-center">
              <div className="flex space-x-4 items-center">
                <Link 
                  href="/" 
                  className={`${pathname === '/' ? 'text-[#4299e1] font-medium' : 'text-slate-200'} text-sm my-auto flex items-center`}
                >
                  Ask
                </Link>
                <Link 
                  href="/pricing" 
                  className={`${pathname === '/pricing' ? 'text-[#4299e1] font-medium' : 'text-slate-200'} text-sm my-auto flex items-center`}
                >
                  Pricing
                </Link>
                <Button 
                  variant="outline" 
                  onClick={() => setIsContactOpen(true)}
                  className="bg-[#4299e1] text-white text-xs px-3 py-1 rounded-md h-auto min-h-0"
                >
                  Join
                </Button>
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