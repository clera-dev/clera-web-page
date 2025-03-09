"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import BackgroundChart from '@/components/BackgroundChart'
import TickerBanner from '@/components/TickerBanner'
import { Button } from "@/components/ui/button"
import Link from "next/link"
import FeatureCard from "@/components/FeatureCard"
import { features } from "@/data/features"
import { ArrowRight, LucideIcon } from "lucide-react"
import { BentoGrid, BentoGridItem } from "@/components/BentoGrid"
import { SecurityCard } from "@/components/SecurityCard"
import { NewsCard } from '@/components/NewsCard'
import { FinancialCard } from '@/components/FinancialCard'
import { InvestmentCard } from '@/components/InvestmentCard'
import { PersonalAdvisorCard } from '@/components/PersonalAdvisorCard'

// Helper component to render feature icons
const FeatureIcon = ({ IconComponent, isLarge = false }: { IconComponent: LucideIcon; isLarge?: boolean }) => {
  return <IconComponent size={isLarge ? 28 : 24} className="text-white" />;
};

export default function Home() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ 
    target: containerRef,
    offset: ["start start", "end end"]
  })
  
  // Transform scroll progress to line height
  const lineHeight = useTransform(scrollYProgress, [0, 0.3], ["0%", "100%"])

  return (
    <>
      <main ref={containerRef} className="relative min-h-screen bg-gradient-to-b from-black/30 to-[#0a0a0f]/30 pt-16 overflow-x-hidden">
        <BackgroundChart />
        
        {/* Left vertical line - animated */}
        <div className="hidden md:block absolute left-[max(2rem,calc(50%-42rem))] top-0 bottom-0 w-[0.5px] h-full overflow-hidden">
          <motion.div 
            className="w-full bg-white opacity-40" 
            style={{ 
              height: lineHeight,
              originY: 0
            }}
          />
        </div>
        
        {/* Right vertical line - animated */}
        <div className="hidden md:block absolute right-[max(2rem,calc(50%-42rem))] top-0 bottom-0 w-[0.5px] h-full overflow-hidden">
          <motion.div 
            className="w-full bg-white opacity-40" 
            style={{ 
              height: lineHeight,
              originY: 0
            }}
          />
        </div>
        
        <div className="container relative z-10 mx-auto px-8 sm:px-12 md:px-16 lg:px-24 py-16 flex flex-col items-start justify-center">
          {/* Hero Section with motion animations */}
          <div className="text-left mb-96">            
            <motion.h2 
              className="text-5xl md:text-7xl font-semibold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              Meet <span className="text-[#4299e1]">Clera</span>, Your <span className="italic">Personal</span> AI Financial Advisor.
            </motion.h2>
            
            <motion.p 
              className="text-xl md:text-2xl text-slate-300 max-w-2xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1], 
                delay: 0.3
              }}
            >
              Investing made simple: Clera delivers personalized, Wall Street-level advice and manages your investments—all for one low, affordable monthly price.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1], 
                delay: 0.6
              }}
            >
              <Button 
                className="w-64 bg-white text-black border-2 border-black px-8 py-6 text-lg font-medium shadow-[0_0_0_2px_rgba(0,0,0,1)] transition-colors duration-300 hover:bg-black hover:text-white hover:border-white hover:shadow-[0_0_0_2px_rgba(255,255,255,1)]"
                style={{ borderRadius: '50px' }}
                onClick={() => {
                  // Find the ContactSlideout component and open it
                  const event = new CustomEvent('openWaitlistSlideout');
                  window.dispatchEvent(event);
                }}
              >
                Join Waitlist
              </Button>
            </motion.div>
          </div>
          
          {/* Add Ticker Banner below the hero section */}
          <div className="w-full -mt-[4.25rem] mb-32">
            <TickerBanner />
          </div>
          
          {/* Features section */}
          <div className="pt-16 pb-48 w-full">
            <div className="text-center max-w-4xl mx-auto mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 whitespace-nowrap tracking-tight leading-none mx-auto flex justify-center">
                Powerful and Smart Investing Made Simple
              </h1>
              <p className="text-xl text-slate-300 mb-10">
                Clera's AI-powered platform offers everything you need to make informed investment decisions at one low monthly fee.
              </p>
            </div>
            
            <BentoGrid className="px-4">
              {/* Personal Advisor - featured item spanning 2x2 */}
              <PersonalAdvisorCard 
                className="md:col-span-2 md:row-span-2"
                title={features[0].title}
                description={features[0].description}
                icon={<FeatureIcon IconComponent={features[0].icon} isLarge={true} />}
                iconBg={features[0].iconColor}
              />
              
              {/* Financial Analysis - now using FinancialCard */}
              <FinancialCard 
                title={features[2].title}
                description={features[2].description}
                icon={<FeatureIcon IconComponent={features[2].icon} />}
                iconBg={features[2].iconColor}
              />
              
              {/* News Analysis */}
              <NewsCard 
                title={features[3].title}
                description={features[3].description}
                icon={<FeatureIcon IconComponent={features[3].icon} />}
                iconBg={features[3].iconColor}
              />
              
              {/* Investment Management - now using InvestmentCard */}
              <InvestmentCard 
                className="md:col-span-2"
                title={features[1].title}
                description={features[1].description}
                icon={<FeatureIcon IconComponent={features[1].icon} />}
                iconBg={features[1].iconColor}
              />
              
              {/* Data Security - animated encryption card */}
              <div className="md:col-span-1 row-span-1 h-full aspect-auto">
                <SecurityCard
                  title={features[4].title}
                  description={features[4].description}
                  className="h-full"
                />
              </div>
            </BentoGrid>
          </div>
          
          {/* Waitlist section */}
          <div className="py-24 w-full bg-gradient-to-b from-transparent to-[#080810]">
            <div className="container mx-auto px-8">
              <div className="text-center max-w-4xl mx-auto mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Join the <span className="text-[#4299e1]">Clera</span> Waitlist
                </h2>
              </div>
              
              <div className="max-w-xl mx-auto">
                <div className="relative">
                  {/* Decorative elements */}
                  <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#4299e1]/20 rounded-full blur-3xl"></div>
                  <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#4299e1]/20 rounded-full blur-3xl"></div>
                  
                  {/* Waitlist Button */}
                  <div className="relative z-10 flex justify-center">
                    <Button 
                      className="w-64 bg-white text-black border-2 border-black px-8 py-6 text-lg font-medium shadow-[0_0_0_2px_rgba(0,0,0,0.5)] transition-all duration-300 hover:bg-black hover:text-white hover:border-white hover:shadow-[0_0_0_2px_rgba(255,255,255,0.5)]"
                      style={{ borderRadius: '50px' }}
                      onClick={() => {
                        // Find the ContactSlideout component and open it
                        const event = new CustomEvent('openWaitlistSlideout');
                        window.dispatchEvent(event);
                      }}
                    >
                      Join Waitlist
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap justify-center gap-6 mt-12">
                <div className="flex items-center gap-2 text-slate-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#4299e1]">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span>Early Access</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#4299e1]">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span>Exclusive Updates</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#4299e1]">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span>Priority Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

