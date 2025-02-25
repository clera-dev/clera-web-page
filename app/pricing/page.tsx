'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import { plans } from '@/data/pricing'
import Navigation from '@/components/Navigation'
import Particles from '@/components/Particles'
import PricingComparisonTable from '@/components/pricing/PricingComparisonTable'

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black/50 to-[#0a0a0f]/50">
      <Particles />
      <Navigation />
      
      <main className="relative z-10 pt-32 pb-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-semibold text-white mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Choose the perfect plan for your investment needs
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden
                  transform transition-all duration-300 ease-in-out hover:scale-105 hover:z-10
                  hover:shadow-[0_0_30px_rgba(66,153,225,0.3)]
                  ${plan.name === 'Plus' ? 
                    'border-2 border-[#4299e1] md:-my-8' : 
                    'border border-white/10 hover:border-[#4299e1]/50'}`}
              >
                {plan.nameBadge && (
                  <div className="absolute top-4 right-4 bg-[#4299e1] text-white text-sm px-3 py-1 rounded-full">
                    {plan.nameBadge}
                  </div>
                )}

                <div className="p-8">
                  <h3 className="text-2xl font-semibold text-white mb-2">{plan.name}</h3>
                  <p className="text-slate-300 mb-6">{plan.description}</p>
                  
                  <div className="flex items-baseline mb-8">
                    {plan.priceMonthly !== '0' && (
                      <span className="text-4xl font-bold text-white">$</span>
                    )}
                    <span className="text-5xl font-bold text-white">
                      {plan.priceMonthly === '0' ? 'Free' : plan.priceMonthly}
                    </span>
                    {plan.priceMonthly !== '0' && (
                      <span className="ml-2 text-slate-300">{plan.costUnit}</span>
                    )}
                  </div>

                  <button
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200
                      transform hover:scale-[1.02] active:scale-[0.98]
                      ${plan.name === 'Plus'
                        ? 'bg-[#4299e1] text-white hover:bg-[#63b3ff]'
                        : 'bg-white/10 text-white hover:bg-white/20'}`}
                  >
                    {plan.cta}
                  </button>
                </div>

                <div className="p-8 border-t border-white/10 flex-1">
                  <ul className="space-y-4">
                    {plan.features.map((feature) => (
                      <li key={typeof feature === 'string' ? feature : feature[0]} className="flex">
                        <Check className="h-6 w-6 text-[#4299e1] flex-shrink-0" />
                        <div className="ml-3">
                          <p className="text-white">
                            {typeof feature === 'string' ? feature : feature[0]}
                          </p>
                          {Array.isArray(feature) && (
                            <p className="text-slate-400 text-sm mt-1">{feature[1]}</p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add the comparison table */}
        <PricingComparisonTable />
      </main>
    </div>
  )
} 