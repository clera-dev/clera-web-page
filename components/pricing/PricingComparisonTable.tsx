'use client'

import { useState } from 'react'
import { pricingTable } from '@/data/pricing-table'
import { PricingTableRowMobile, PricingTableRowDesktop } from './PricingTableRow'
import { 
  ChevronDown, 
  LineChart, // For investment features
  Brain, // For AI capabilities
  HeadphonesIcon, // For support
  ShieldCheck // For security
} from 'lucide-react'

const categoryIcons = {
  investment: LineChart,
  ai: Brain,
  support: HeadphonesIcon,
  security: ShieldCheck
}

export default function PricingComparisonTable() {
  const [activeMobilePlan, setActiveMobilePlan] = useState('Free')

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-semibold text-white text-center mb-12">
        Compare Plans
      </h2>

      {/* Mobile View */}
      <div className="lg:hidden">
        <div className="bg-white/5 backdrop-blur-lg rounded-lg p-4 sticky top-20 z-10 mb-8">
          <select
            value={activeMobilePlan}
            onChange={(e) => setActiveMobilePlan(e.target.value)}
            className="w-full bg-white/10 text-white rounded-lg px-4 py-2 appearance-none cursor-pointer"
          >
            <option value="Free">Free Plan</option>
            <option value="Plus">Plus Plan</option>
            <option value="Pro">Pro Plan</option>
          </select>
          <ChevronDown className="absolute right-8 top-1/2 -translate-y-1/2 text-white pointer-events-none" />
        </div>

        {Object.entries(pricingTable).map(([key, category]) => (
          <PricingTableRowMobile
            key={key}
            category={category}
            activePlan={activeMobilePlan}
            icon={categoryIcons[key as keyof typeof categoryIcons]}
          />
        ))}
      </div>

      {/* Desktop View */}
      <div className="hidden lg:block">
        <div className="bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="w-1/4 p-6 text-left">
                  <span className="sr-only">Feature</span>
                </th>
                {['Free', 'Plus', 'Pro'].map((plan) => (
                  <th key={plan} className="w-1/4 p-6 text-left">
                    <div className="flex flex-col gap-1">
                      <span className="text-xl font-semibold text-white">{plan}</span>
                      <span className="text-slate-400">
                        {plan === 'Free' ? 'Get Started' : plan === 'Plus' ? '$10/month' : 'Coming Soon'}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {Object.entries(pricingTable).map(([key, category]) => (
                <PricingTableRowDesktop
                  key={key}
                  category={category}
                  icon={categoryIcons[key as keyof typeof categoryIcons]}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
} 