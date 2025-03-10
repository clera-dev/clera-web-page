'use client'

import { useEffect, useState, useCallback } from 'react'
import { Check } from 'lucide-react'
import { plans } from '@/data/pricing'
import { Particles, initParticlesEngine } from "@tsparticles/react"
import { type Container, type ISourceOptions, MoveDirection, OutMode } from "@tsparticles/engine"
import { loadSlim } from "@tsparticles/slim"

const ParticleBackground = () => {
  const [init, setInit] = useState(false);

  // Initialize the particles engine (should be done once)
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = useCallback(async (container?: Container) => {
    console.log("Particles container loaded", container);
  }, []);

  // Particle configuration
  const options: ISourceOptions = {
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 120,
    particles: {
      color: {
        value: "#4299e1",
      },
      links: {
        enable: false,
        color: "#4299e1",
        distance: 150,
        opacity: 0.3,
        width: 1,
      },
      move: {
        direction: MoveDirection.none,
        enable: true,
        outModes: {
          default: OutMode.out,
        },
        random: false,
        speed: 0.8,
        straight: false,
        attract: {
          enable: true,
          rotate: {
            x: 600,
            y: 1200
          }
        },
      },
      number: {
        density: {
          enable: true,
          value_area: 800,
        },
        value: 80,
      },
      opacity: {
        value: 0.5,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 3 },
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "grab",
          parallax: {
            enable: true,
            force: 60,
            smooth: 10
          }
        },
        resize: {
          enable: true,
          delay: 0
        },
      },
      modes: {
        grab: {
          distance: 200,
          links: {
            opacity: 0,
          },
        },
      },
    },
    detectRetina: true,
  } as unknown as ISourceOptions; // Type assertion to bypass type checking for value_area property

  if (!init) {
    return null;
  }

  return (
    <Particles
      id="tsparticles"
      className="absolute inset-0 -z-10"
      particlesLoaded={particlesLoaded}
      options={options}
    />
  );
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black/50 to-[#0a0a0f]/50">
      <ParticleBackground />
      
      <main className="relative z-10 pt-20 pb-32">
        {/* Header */}
        <div className="text-center mb-32">
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
                    {plan.name === 'Plus' ? 'Recommended' : plan.nameBadge}
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
                      {plan.priceMonthly === '0' ? '$0' : plan.priceMonthly}
                    </span>
                    {(//plan.priceMonthly !== '4' && (
                      <span className="ml-2 text-slate-300">{plan.costUnit}</span>
                    )}
                  </div>

                  <button
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200
                      transform hover:scale-[1.02] active:scale-[0.98]
                      ${plan.name === 'Plus'
                        ? 'bg-[#4299e1] text-white hover:bg-[#63b3ff]'
                        : 'bg-white/10 text-white hover:bg-white/20'}`}
                    onClick={() => {
                      // Trigger the ContactSlideout to open
                      const event = new CustomEvent('openWaitlistSlideout');
                      window.dispatchEvent(event);
                    }}
                  >
                    Join Waitlist
                  </button>
                </div>

                <div className="p-8 border-t border-white/10 flex-1">
                  <h4 className="text-white font-medium mb-4">Included in this plan:</h4>
                  <ul className="space-y-4">
                    {plan.features.map((feature) => (
                      <li key={typeof feature === 'string' ? feature : feature[0]} className="flex">
                        <Check className="h-6 w-6 text-[#4299e1] flex-shrink-0" />
                        <div className="ml-3">
                          <p className="text-white">
                            {typeof feature === 'string' ? feature : feature[0]}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* No comparison table */}
      </main>
    </div>
  )
} 