'use client'

import { useState, useEffect, useRef } from 'react'

interface PlasmaRingProps {
  children: React.ReactNode
}

interface Particle {
  angle: number
  speed: number
  size: number
  opacity: number
  breathePhase: number
  baseSize: number
  baseOpacity: number
}

export default function PlasmaRing({ children }: PlasmaRingProps) {
  const [isHovered, setIsHovered] = useState(false)
  const particlesRef = useRef<Particle[]>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const particleCount = 60
    particlesRef.current = Array.from({ length: particleCount }, () => {
      const baseSize = 2 + Math.random() * 2
      const baseOpacity = 0.3 + Math.random() * 0.4
      return {
        angle: Math.random() * Math.PI * 2,
        speed: 0.0002 + Math.random() * 0.0005,
        size: baseSize,
        opacity: baseOpacity,
        breathePhase: Math.random() * Math.PI * 2,
        baseSize,
        baseOpacity
      }
    })

    function drawParticles() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const radius = 362.5

      particlesRef.current.forEach(particle => {
        // Update particle position
        particle.angle += particle.speed
        
        // Update breathing effect when hovered
        if (isHovered) {
          particle.breathePhase += 0.02
          // Sine wave breathing effect
          const breatheFactor = Math.sin(particle.breathePhase) * 0.5 + 1
          particle.size = particle.baseSize * breatheFactor
          particle.opacity = particle.baseOpacity * breatheFactor
        } else {
          // Reset to base values when not hovered
          particle.size = particle.baseSize
          particle.opacity = particle.baseOpacity
        }

        // Calculate position
        const x = centerX + Math.cos(particle.angle) * radius
        const y = centerY + Math.sin(particle.angle) * radius

        // Draw particle with current size and opacity
        ctx.beginPath()
        ctx.arc(x, y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(185, 211, 255, ${particle.opacity})`
        ctx.fill()
      })

      requestAnimationFrame(drawParticles)
    }

    function handleResize() {
      canvas.width = 750
      canvas.height = 750
    }

    handleResize()
    drawParticles()

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isHovered])

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-[750px] h-[750px] overflow-visible">
        {/* Orbiting particles */}
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full"
          style={{ zIndex: 15 }}
        />

        <svg className="absolute -inset-16 w-[calc(100%+8rem)] h-[calc(100%+8rem)]">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          
          {/* More wave rings with varied delays and scales */}
          {!isHovered && (
            <>
              <circle
                cx="50%"
                cy="50%"
                r="362.5"
                fill="none"
                strokeWidth="2"
                stroke="rgba(185, 211, 255, 0.3)"
                className="sound-wave-1"
              />
              <circle
                cx="50%"
                cy="50%"
                r="362.5"
                fill="none"
                strokeWidth="2"
                stroke="rgba(185, 211, 255, 0.25)"
                className="sound-wave-2"
              />
              <circle
                cx="50%"
                cy="50%"
                r="362.5"
                fill="none"
                strokeWidth="2"
                stroke="rgba(185, 211, 255, 0.2)"
                className="sound-wave-3"
              />
              <circle
                cx="50%"
                cy="50%"
                r="362.5"
                fill="none"
                strokeWidth="1.5"
                stroke="rgba(185, 211, 255, 0.15)"
                className="sound-wave-4"
              />
              <circle
                cx="50%"
                cy="50%"
                r="362.5"
                fill="none"
                strokeWidth="1.5"
                stroke="rgba(185, 211, 255, 0.1)"
                className="sound-wave-5"
              />
              <circle
                cx="50%"
                cy="50%"
                r="362.5"
                fill="none"
                strokeWidth="1"
                stroke="rgba(185, 211, 255, 0.05)"
                className="sound-wave-6"
              />
            </>
          )}
        </svg>
        
        <div className="absolute inset-0 flex items-center justify-center z-30">
          {children}
        </div>
      </div>
    </div>
  )
} 