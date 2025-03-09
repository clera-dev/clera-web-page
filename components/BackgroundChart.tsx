'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function BackgroundChart() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Generate points for the chart immediately (not state dependent)
  const chartPoints = generateChartPoints()
  
  // Create SVG path from points immediately
  const pathString = createSvgPath(chartPoints)
  const areaPathString = pathString + ` L${chartPoints[chartPoints.length - 1]?.x || 0},${500} L0,${500} Z`
  
  // Generate points for a more dynamic upward trending chart
  function generateChartPoints() {
    const points = []
    const segments = 50
    // Adjust width to match navigation container
    const width = 1400 
    const height = 500
    const stepX = width / segments
    
    // Start at the bottom left
    let prevY = height * 0.8
    let volatility = 0.4
    
    // Define key change points for trend direction changes
    const trendChanges = [
      { point: Math.floor(segments * 0.2), volatility: 0.5, trend: -1.2 },
      { point: Math.floor(segments * 0.35), volatility: 0.7, trend: -0.8 },
      { point: Math.floor(segments * 0.5), volatility: 0.6, trend: -1.5 },
      { point: Math.floor(segments * 0.65), volatility: 0.9, trend: 0.7 }, // Small downward correction
      { point: Math.floor(segments * 0.8), volatility: 0.7, trend: -1.3 },
    ]
    
    for (let i = 0; i <= segments; i++) {
      const x = i * stepX
      
      // Find the current trend section
      let currentTrend = -0.8 // Default trend
      let currentVolatility = volatility
      
      for (const change of trendChanges) {
        if (i > change.point && i < change.point + 5) {
          // In a transition zone, swing more dramatically
          currentVolatility = change.volatility
          currentTrend = change.trend
          break
        }
      }
      
      // Generate a random movement with variable trend
      const randMove = (Math.random() * 2 - 1) * currentVolatility * height * 0.15
      const trendMove = currentTrend * (height / segments) * 1.2
      
      let y = prevY + randMove + trendMove
      
      // Keep it within bounds
      y = Math.max(height * 0.1, Math.min(height * 0.9, y))
      
      points.push({ x, y })
      prevY = y
    }
    
    return points
  }
  
  // Create SVG path from points
  function createSvgPath(points: { x: number, y: number }[]) {
    if (points.length === 0) return ''
    
    let path = `M${points[0].x},${points[0].y}`
    
    for (let i = 1; i < points.length; i++) {
      // Use bezier curves for smoother lines
      const controlX1 = points[i - 1].x + (points[i].x - points[i - 1].x) / 3
      const controlY1 = points[i - 1].y
      const controlX2 = points[i].x - (points[i].x - points[i - 1].x) / 3
      const controlY2 = points[i].y
      
      path += ` C${controlX1},${controlY1} ${controlX2},${controlY2} ${points[i].x},${points[i].y}`
    }
    
    return path
  }
  
  // Handle window resize without state changes
  useEffect(() => {
    function handleResize() {
      // Just trigger a re-render, no state changes that might interrupt animations
      containerRef.current?.classList.add('resized')
      setTimeout(() => {
        containerRef.current?.classList.remove('resized')
      }, 0)
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  return (
    <div 
      ref={containerRef}
      className="absolute top-56 left-1/2 transform -translate-x-1/2 w-full max-w-[1400px] h-[700px] z-0 pointer-events-none px-8 sm:px-12 md:px-16 lg:px-24"
    >
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 1400 500"
        preserveAspectRatio="xMidYMid meet"
        className="opacity-70"
      >
        {/* Horizontal grid lines */}
        {Array.from({ length: 10 }).map((_, i) => (
          <line 
            key={`grid-h-${i}`}
            x1="0" 
            y1={i * 50} 
            x2="1400" 
            y2={i * 50} 
            stroke="#4299e1" 
            strokeWidth="0.3" 
            strokeDasharray="5,5" 
            opacity="0.5"
          />
        ))}
        
        {/* Vertical grid lines - adjusted for new width */}
        {Array.from({ length: 28 }).map((_, i) => (
          <line 
            key={`grid-v-${i}`}
            x1={`${i * 50}`} 
            y1="0" 
            x2={`${i * 50}`} 
            y2="500" 
            stroke="#4299e1" 
            strokeWidth="0.3" 
            strokeDasharray="5,5" 
            opacity="0.5"
          />
        ))}
        
        {/* Area under the chart - simple, linear animation */}
        <motion.path
          d={areaPathString}
          fill="url(#gradient)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 2, ease: "linear" }}
        />
        
        {/* The chart line path - use simple, linear animation for smoothness */}
        <motion.path
          d={pathString}
          fill="none"
          stroke="#4299e1"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.5, ease: "linear" }}
          style={{
            filter: 'drop-shadow(0 0 8px rgba(66, 153, 225, 0.5))'
          }}
        />
        
        {/* Interactive data points - appear sequentially */}
        {chartPoints.filter((_, i) => i % 5 === 0).map((point, i) => (
          <motion.circle
            key={`point-${i}`}
            cx={point.x}
            cy={point.y}
            r="3"
            fill="#4299e1"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              delay: 1.5 + (i * 0.05),
              duration: 0.3,
              ease: "easeOut"
            }}
            style={{
              filter: 'drop-shadow(0 0 6px rgba(66, 153, 225, 0.8))'
            }}
          />
        ))}
        
        {/* Gradients */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4299e1" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#4299e1" stopOpacity="0.2" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
} 