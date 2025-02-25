'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Logo from './Logo'
import ContactSlideout from './ContactSlideout'

export default function Navigation() {
  const pathname = usePathname()
  const [isContactOpen, setIsContactOpen] = useState(false)

  const isActive = (path: string) => {
    return pathname === path ? 
      "text-[#4299e1] font-medium" : 
      "text-slate-200 hover:text-white transition-colors"
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40">
        <div className="w-full px-6">
          <div className="flex items-center justify-between h-16 max-w-[1920px] mx-auto">
            {/* Left side logo - positioned near left edge */}
            <div className="flex-shrink-0">
              <Link href="/">
                <Logo />
              </Link>
            </div>

            {/* Right side nav items - positioned near right edge */}
            <div className="flex items-center space-x-8">
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
              <Link 
                href="/team" 
                className={isActive('/team')}
              >
                About Our Team
              </Link>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#4299e1]/40 to-[#4299e1]/40 rounded-lg blur opacity-0 group-hover:opacity-60 transition duration-300"></div>
                <Button 
                  variant="outline" 
                  onClick={() => setIsContactOpen(true)}
                  className={`relative px-6 py-2 transition-all duration-300 ease-in-out transform group-hover:scale-102
                    ${isContactOpen 
                      ? 'bg-[#4299e1] text-white border-[#4299e1]' 
                      : 'bg-transparent border-[#4299e1] text-[#4299e1] hover:text-white hover:bg-[#4299e1]'
                    }`}
                >
                  Contact Us
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