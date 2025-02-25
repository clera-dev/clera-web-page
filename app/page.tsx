"use client"

import React, { useState, useEffect } from "react"
import WaitlistForm from '@/components/WaitlistForm'
import Navigation from '@/components/Navigation'
import PlasmaRing from '@/components/PlasmaRing'
import BackgroundChart from '@/components/BackgroundChart'

export default function Home() {
  const [showDescription, setShowDescription] = useState(false)
  const [chartProgress, setChartProgress] = useState(0)

  useEffect(() => {
    // Start chart animation immediately
    setChartProgress(1)
    // Show description after a longer delay
    const timer = setTimeout(() => {
      setShowDescription(true)
    }, 1200) // Increased from 600ms to 1200ms

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative min-h-screen">
      <BackgroundChart animationProgress={chartProgress} />
      <Navigation />
      <main className="relative z-10 min-h-screen bg-gradient-to-b from-black/50 to-[#0a0a0f]/50 pt-16">
        <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center">
          {/* Hero Section */}
          <div className="text-center mb-16">            
            <h2 className="text-5xl md:text-7xl font-semibold text-white mb-6 animate-fade-in-up">
              Your Personal AI Financial Advisor.
            </h2>
            
            <p className={`text-xl text-slate-300 max-w-2xl mx-auto mb-8 transition-all duration-1000 ease-in-out
              ${showDescription ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} animate-fade-in-up-delay-1`}>
              Get personalized investment advice powered by AI and industry-grade analytics. 
              Professional portfolio management at a fraction of traditional costs.
            </p>
          </div>

          {/* Waitlist Section with Plasma Ring */}
          <PlasmaRing>
            <div className="w-full max-w-md">
              <WaitlistForm />
            </div>
          </PlasmaRing>
        </div>
      </main>
    </div>
  )
}

