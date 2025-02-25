'use client'

import { useEffect, useState } from 'react'

export default function ComingSoon() {
  const [dots, setDots] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.')
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black/50 to-[#0a0a0f]/50">
      {/* Dot spinner */}
      <div className="relative w-24 h-24 mb-8">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 rounded-full bg-[#4299e1]"
            style={{
              top: '50%',
              left: '50%',
              transform: `rotate(${i * 30}deg) translate(0, -150%) scale(${1 - (i * 0.07)})`,
              opacity: 1 - (i * 0.07),
              transformOrigin: '50% 150%',
              animation: `dotSpin 6s linear infinite ${i * -0.5}s`
            }}
          />
        ))}
      </div>

      {/* Message */}
      <div className="text-center max-w-2xl px-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
          Clera and her team are still building here{dots}
        </h2>
        <p className="text-slate-300">
          Check back later for all the juicy details
        </p>
      </div>
    </div>
  )
} 