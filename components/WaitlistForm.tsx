'use client'

import { useState } from 'react'
import confetti from 'canvas-confetti'

export default function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const triggerConfetti = () => {
    // First burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#4299e1', '#63b3ff', '#fff'],
    })

    // Second burst with slight delay
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#4299e1', '#63b3ff', '#fff'],
      })
    }, 200)

    // Third burst
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#4299e1', '#63b3ff', '#fff'],
      })
    }, 400)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    // TODO: Implement actual API endpoint for waitlist
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      triggerConfetti()
      setStatus('success')
      setEmail('')
    } catch (error) {
      setStatus('error')
    }
  }

  return (
    <div className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-lg p-6
      transition-all duration-500 ease-in-out
      hover:from-[#4299e1]/20 hover:to-[#63b3ff]/10 hover:scale-[1.02] 
      hover:shadow-[0_0_30px_rgba(66,153,225,0.2)]
      transform">
      <h3 className="text-xl text-white font-semibold mb-2 
        transition-colors duration-300 
        group-hover:text-[#63b3ff]">
        Join the waitlist:
      </h3>
      <p className="text-sm text-slate-300 mb-6 
        transition-colors duration-300 
        group-hover:text-[#63b3ff]/90">
        Be among the first to experience the future of investing
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="transform transition-transform duration-300 group-hover:translate-y-[-2px]">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-2 rounded-lg 
              bg-white/5 border border-slate-700 
              text-white placeholder-slate-400 
              transition-all duration-300
              focus:outline-none focus:ring-2 focus:ring-[#4299e1]
              group-hover:border-[#4299e1] group-hover:bg-[#4299e1]/10
              group-hover:placeholder-[#63b3ff]/70"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-[#4299e1] text-white font-semibold py-3 px-6 rounded-lg 
            transition-all duration-300 ease-in-out
            hover:bg-[#63b3ff] hover:scale-105 
            hover:shadow-[0_0_20px_rgba(66,153,225,0.4)]
            transform active:scale-95
            group-hover:bg-[#63b3ff]
            disabled:opacity-50 disabled:hover:scale-100 
            disabled:hover:bg-[#4299e1] disabled:hover:shadow-none"
        >
          {status === 'loading' ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Joining...</span>
            </div>
          ) : (
            'Join Waitlist'
          )}
        </button>

        {status === 'success' && (
          <p className="text-[#63b3ff] text-sm text-center animate-fadeIn">
            Thanks for joining! We'll keep you updated.
          </p>
        )}
        
        {status === 'error' && (
          <p className="text-red-400 text-sm text-center">
            Something went wrong. Please try again.
          </p>
        )}
      </form>
    </div>
  )
} 