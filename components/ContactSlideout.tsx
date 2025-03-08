'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient'

interface ContactSlideoutProps {
  isOpen: boolean
  onClose: () => void
}

export default function ContactSlideout({ isOpen, onClose }: ContactSlideoutProps) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const formRef = useRef<HTMLFormElement>(null)
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real implementation, you would send this data to your backend
    console.log('Waitlist signup:', { name, email })
    setIsSubmitted(true)
    
    // Reset form after 5 seconds for demo purposes
    setTimeout(() => {
      setIsSubmitted(false)
      setName('')
      setEmail('')
      onClose()
    }, 5000)
  }
  
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])
  
  // Focus trap
  useEffect(() => {
    if (isOpen && formRef.current) {
      const focusableElements = formRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      
      if (focusableElements.length > 0) {
        (focusableElements[0] as HTMLElement).focus()
      }
    }
  }, [isOpen])
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50"
            onClick={onClose}
          />
          
          {/* Slideout panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[450px] bg-gradient-to-br from-[#0a0a0f] via-[#131320] to-[#1a1a2e] border-l border-white/5 shadow-xl z-50 overflow-auto"
          >
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]"></div>
            <div className="p-8 md:p-10 h-full flex flex-col relative">
              <div className="flex justify-between items-center mb-8">
                <div className="relative">
                  <h2 className="text-2xl font-bold text-white">Join Our Waitlist</h2>
                  <motion.div 
                    className="absolute h-[2px] bg-[#4299e1] bottom-[-8px] left-0"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ 
                      duration: 0.8, 
                      ease: "easeOut",
                      delay: 0.2
                    }}
                  />
                </div>
                <button 
                  onClick={onClose}
                  className="text-slate-400 hover:text-white transition-colors"
                  aria-label="Close"
                >
                  <X size={24} />
                </button>
              </div>
              
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form 
                    ref={formRef}
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col flex-grow"
                    onSubmit={handleSubmit}
                  >
                    <p className="text-slate-300 mb-8">
                      Be among the first to experience Clera, our AI-powered financial advisor. 
                      Sign up below for exclusive early access.
                    </p>
                    
                    <div className="mb-6">
                      <label htmlFor="name" className="block text-sm font-medium text-slate-200 mb-2">
                        Your Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 bg-[#1a1a24] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4299e1] focus:border-transparent text-white"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    
                    <div className="mb-10">
                      <label htmlFor="email" className="block text-sm font-medium text-slate-200 mb-2">
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-[#1a1a24] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4299e1] focus:border-transparent text-white"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    
                    <div className="mt-auto">
                      <HoverBorderGradient
                        as="button"
                        type="submit"
                        containerClassName="w-full rounded-xl"
                        className="w-full text-white font-medium py-2 rounded-xl"
                        duration={2}
                        clockwise={true}
                      >
                        Join Waitlist
                      </HoverBorderGradient>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center flex-grow text-center"
                  >
                    <div className="bg-[#4299e1]/10 rounded-full p-6 mb-6">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17L4 12" stroke="#4299e1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">You're on the list!</h3>
                    <p className="text-slate-300 mb-8">
                      Thanks for joining our waitlist. We'll notify you as soon as early access is available.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
} 