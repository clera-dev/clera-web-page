'use client'

import { useEffect, useRef } from 'react'

interface BackgroundChartProps {
  animationProgress: number
}

// Add easing function for smoother animation
function easeOutCubic(x: number): number {
  return 1 - Math.pow(1 - x, 3)
}

export default function BackgroundChart({ animationProgress }: BackgroundChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointsRef = useRef<{ x: number; y: number }[]>([])
  const currentProgressRef = useRef(0)
  const targetProgressRef = useRef(animationProgress)

  useEffect(() => {
    targetProgressRef.current = animationProgress
  }, [animationProgress])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    function generatePoints() {
      if (!canvas) return []
      const points: { x: number; y: number }[] = []
      let currentX = 0
      let currentY = canvas.height / 2 + 100

      points.push({ x: currentX, y: currentY })

      while (currentX < canvas.width + 60) {
        const segmentWidth = 60 + (Math.random() * 100 - 50)
        const amplitude = 60 + (Math.random() * 120 - 60)
        
        const direction = Math.random() > 0.5 ? 
          1 + (Math.random() * 0.5) :
          -1 - (Math.random() * 0.5)
        
        const midX = currentX + segmentWidth/2
        const endX = currentX + segmentWidth
        const midY = currentY - (amplitude * direction)
        const endY = currentY - (segmentWidth * 0.25)
        
        points.push({ x: midX, y: midY }, { x: endX, y: endY })
        
        currentX = endX
        currentY = endY
      }

      return points
    }

    function drawChart() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Smoother progress transition
      const progressDiff = targetProgressRef.current - currentProgressRef.current
      if (Math.abs(progressDiff) > 0.001) {
        currentProgressRef.current += progressDiff * 0.05
      }

      const easedProgress = easeOutCubic(currentProgressRef.current)

      if (pointsRef.current.length === 0) {
        pointsRef.current = generatePoints()
      }

      // Draw the full chart first
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, 'rgba(66, 153, 225, 0.15)')
      gradient.addColorStop(1, 'rgba(66, 153, 225, 0.05)')
      
      ctx.beginPath()
      pointsRef.current.forEach((point, index) => {
        if (index === 0) {
          ctx.moveTo(point.x, point.y)
        } else {
          ctx.lineTo(point.x, point.y)
        }
      })

      ctx.lineTo(canvas.width, canvas.height)
      ctx.lineTo(0, canvas.height)
      ctx.closePath()

      ctx.fillStyle = gradient
      ctx.fill()

      ctx.beginPath()
      pointsRef.current.forEach((point, index) => {
        if (index === 0) {
          ctx.moveTo(point.x, point.y)
        } else {
          ctx.lineTo(point.x, point.y)
        }
      })
      ctx.strokeStyle = 'rgba(66, 153, 225, 0.4)'
      ctx.lineWidth = 3
      ctx.stroke()

      // Create gradient mask for smooth fade
      const maskWidth = canvas.width * 0.2
      const fadePosition = canvas.width * easedProgress
      const maskGradient = ctx.createLinearGradient(
        fadePosition - maskWidth,
        0,
        fadePosition,
        0
      )
      maskGradient.addColorStop(0, 'rgba(0, 0, 0, 1)')
      maskGradient.addColorStop(1, 'rgba(0, 0, 0, 0)')

      // Apply mask
      ctx.globalCompositeOperation = 'destination-in'
      ctx.fillStyle = maskGradient
      ctx.fillRect(0, 0, fadePosition, canvas.height)
      ctx.globalCompositeOperation = 'source-over'

      requestAnimationFrame(drawChart)
    }

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      pointsRef.current = generatePoints()
    }

    handleResize()
    drawChart()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-[-1]"
    />
  )
} 