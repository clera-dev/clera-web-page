'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

interface ContactSlideoutProps {
  isOpen: boolean
  onClose: () => void
}

export default function ContactSlideout({ isOpen, onClose }: ContactSlideoutProps) {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      // TODO: Implement actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 1000))
      setStatus('success')
      setEmail('')
      setMessage('')
      setTimeout(() => {
        onClose()
        setStatus('idle')
      }, 2000)
    } catch (error) {
      setStatus('error')
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 z-50
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Slideout Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a0f] shadow-xl transform transition-transform duration-300 ease-in-out z-50
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="h-full flex flex-col p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-white">Contact Us</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-slate-400" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
            <div className="space-y-6 flex-1">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-slate-700 
                    text-white placeholder-slate-400 
                    focus:outline-none focus:ring-2 focus:ring-[#4299e1]
                    transition-all duration-200"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full h-48 px-4 py-2 rounded-lg bg-white/5 border border-slate-700 
                    text-white placeholder-slate-400 
                    focus:outline-none focus:ring-2 focus:ring-[#4299e1]
                    transition-all duration-200 resize-none"
                  placeholder="How can we help you?"
                  required
                />
              </div>
            </div>

            <div className="mt-6">
              <Button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-[#4299e1] text-white py-3 rounded-lg
                  hover:bg-[#63b3ff] transition-colors duration-200
                  disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Sending...</span>
                  </div>
                ) : status === 'success' ? (
                  'Message Sent!'
                ) : (
                  'Send Message'
                )}
              </Button>

              {status === 'error' && (
                <p className="mt-3 text-red-400 text-sm text-center">
                  Something went wrong. Please try again.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  )
} 