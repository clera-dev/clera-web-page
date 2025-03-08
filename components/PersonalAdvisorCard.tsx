"use client";
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import React, { useState, useEffect, useRef } from 'react';
import { UserPlus, ArrowRight } from "lucide-react";
import Image from "next/image";

export const PersonalAdvisorCard = ({
  className,
  title,
  description,
  icon,
  iconBg,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  icon?: React.ReactNode;
  iconBg?: string;
}) => {
  const isLarge = className?.includes('md:row-span-2');
  const [isHovered, setIsHovered] = useState(false);
  const [activeMessageIndex, setActiveMessageIndex] = useState(-1);
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [isConversationComplete, setIsConversationComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Simulate a conversation about technology stocks
  const conversation = [
    {
      user: "Hi Clera, why did my technology stocks drop today?",
      advisor: "Hi Julie, Tech stocks fell due to news about DeepSeek, a Chinese AI company. They showed that high-performing AI models can be built much cheaper, which impacted tech companies investing heavily in AI hardware."
    },
    {
      user: "Can you help me switch to safer investments?",
      advisor: "Of course! Let me analyze your portfolio and find ways to reduce risk while moving away from tech stocks..."
    }
  ];

  // Show chat interface after a delay when hovered
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isHovered) {
      timeout = setTimeout(() => {
        setIsChatVisible(true);
        // Start the message sequence
        setActiveMessageIndex(0);
      }, 300);
    } else {
      setIsChatVisible(false);
      setActiveMessageIndex(-1);
      setIsConversationComplete(false);
    }
    
    return () => clearTimeout(timeout);
  }, [isHovered]);

  // Advance through messages
  useEffect(() => {
    if (activeMessageIndex >= 0 && activeMessageIndex < conversation.length * 2) {
      const timer = setTimeout(() => {
        setActiveMessageIndex(prev => prev + 1);
      }, 2000); // Show next message after 2 seconds

      return () => clearTimeout(timer);
    } else if (activeMessageIndex === conversation.length * 2) {
      setIsConversationComplete(true);
    }
  }, [activeMessageIndex, conversation.length]);
  
  // Generate animated particles for the background
  const generateParticles = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 0.8,
      opacity: Math.random() * 0.6 + 0.2,
      hoverOffset: Math.random() * 5 + 2, // Smaller offset (2-7px) for gentler movement
      hoverDuration: Math.random() * 8 + 12, // Much longer duration (12-20s) for slower movement
    }));
  };
  
  const [particles] = useState(generateParticles(80));

  // Function to determine if a message should be shown
  const shouldShowMessage = (messageIndex: number) => {
    return activeMessageIndex >= messageIndex;
  };
  
  return (
    <motion.div
      className={cn(
        "row-span-1 rounded-xl group/card hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-6 dark:bg-[#0a0a0f]/60 dark:border-white/[0.1] backdrop-blur-sm border border-white/5 justify-between flex flex-col relative overflow-hidden",
        className
      )}
      whileHover={{ 
        y: -5,
        boxShadow: '0 10px 30px -15px rgba(66, 153, 225, 0.3)',
        borderColor: 'rgba(66, 153, 225, 0.3)'
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      ref={containerRef}
    >
      {/* Content */}
      <div className="z-10 flex flex-col h-full">
        <div className="flex items-center mb-5">
          <div className={`${isLarge ? 'w-14 h-14' : 'w-12 h-12'} rounded-lg flex items-center justify-center bg-transparent relative flex-shrink-0`}>
            {/* Base Background with subtle constant glow */}
            <div className="absolute inset-0 rounded-lg bg-[#4299e1]/5 group-hover/card:bg-[#4299e1]/10 transition-colors duration-300" />
            
            {/* Constant subtle glow effect */}
            <div className="absolute inset-0 rounded-lg shadow-[0_0_10px_rgba(66,153,225,0.15)] group-hover/card:shadow-[0_0_15px_rgba(66,153,225,0.25)] transition-all duration-300"></div>
            
            {/* Border - White outline, turns blue on hover */}
            <div className="absolute inset-0 rounded-lg border border-white/20 transition-all duration-300 group-hover/card:border-[#4299e1]/40 group-hover/card:bg-[rgba(66,153,225,0.08)]" />
            
            {/* Pulsing Glow Effect - Only visible on hover */}
            <motion.div
              className="absolute inset-0 rounded-lg bg-[#4299e1]/0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"
              animate={{ 
                scale: [0.85, 1.05, 0.85], 
                opacity: [0, 0.15, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "loop"
              }}
            />
            
            {/* The Icon - White initially, blue on hover */}
            <div className="relative z-10 text-white/90 group-hover/card:text-[#4299e1]/90 transition-colors duration-300">
              {icon}
            </div>
          </div>
          <div className={`font-bold text-white ml-3 ${isLarge ? 'text-2xl' : 'text-xl'} flex-grow`}>
            {title}
          </div>
        </div>
        <div className={`font-normal text-slate-400 ${isLarge ? 'text-base leading-relaxed' : 'text-sm leading-relaxed'} mb-4`}>
          {description}
        </div>
        
        {/* Spacer that pushes content up to make room for chat interface */}
        <div className="flex-grow"></div>
      </div>
      
      {/* Redesigned Chat Interface that matches the image */}
      <motion.div 
        className="absolute inset-0 w-full h-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: isChatVisible ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0a0a0f] to-[#0a0a0f]/20 z-[9]"></div>
        
        {/* Particles in the background */}
        <div className="absolute inset-0 overflow-hidden">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full bg-blue-400"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                opacity: particle.opacity,
              }}
              animate={{
                y: [0, -particle.hoverOffset, 0, particle.hoverOffset, 0],
              }}
              transition={{
                duration: particle.hoverDuration,
                repeat: Infinity,
                ease: "easeInOut",
                repeatType: "mirror"
              }}
            />
          ))}
        </div>
        
        {/* Chat Interface that matches the image - with adjusted height and overflow handling */}
        <div className="absolute bottom-0 left-0 right-0 w-full max-w-full h-[400px] flex flex-col justify-between p-4 z-[10] mt-[120px] overflow-x-hidden">
          {/* Chat messages area - increased height and fixed horizontal overflow */}
          <div className="flex-grow flex flex-col space-y-4 overflow-y-auto overflow-x-hidden pb-2 max-h-[340px]">
            {conversation.map((exchange, index) => (
              <React.Fragment key={index}>
                {/* User message */}
                <AnimatePresence>
                  {shouldShowMessage(index * 2) && (
                    <motion.div 
                      className="flex justify-end"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="bg-gray-500/60 text-white rounded-3xl px-4 py-2 max-w-[90%] text-sm">
                        {exchange.user}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Advisor message */}
                <AnimatePresence>
                  {shouldShowMessage(index * 2 + 1) && (
                    <motion.div 
                      className="flex justify-start"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="bg-[#1d1d1d] text-white rounded-3xl px-4 py-2 max-w-[90%] text-sm">
                        {exchange.advisor}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </React.Fragment>
            ))}
          </div>
          
          {/* Separator line */}
          <div className="w-full h-px bg-gray-600/50 mb-3"></div>
          
          {/* Input area with Clera icon, sound wave and arrow */}
          <div className="flex items-center w-full overflow-hidden">
            {/* Clera circle icon - using correct filename with hyphen */}
            <div className="w-8 h-8 flex-shrink-0">
              <img 
                src="/clera-circle.png" 
                alt="Clera"
                className="w-full h-full object-contain"
              />
            </div>
            
            {/* Sound wave visualization */}
            <div className="flex items-center h-6 mx-2 flex-shrink-0">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-[3px] bg-[#4299e1] mx-[2px] rounded-full"
                  animate={{
                    height: [6, 10 + Math.random() * 8, 6],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                    delay: i * 0.2,
                  }}
                ></motion.div>
              ))}
            </div>
            
            {/* "Ask Clera..." text with glow effect when conversation is complete */}
            <motion.div 
              className="text-gray-400 text-sm flex-grow truncate"
              animate={isConversationComplete ? {
                textShadow: [
                  "0 0 0px rgba(66, 153, 225, 0)",
                  "0 0 10px rgba(66, 153, 225, 0.5)",
                  "0 0 0px rgba(66, 153, 225, 0)"
                ]
              } : {}}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              Ask Clera....
            </motion.div>
            
            {/* Arrow icon */}
            <div className="text-[#4299e1] flex-shrink-0">
              <ArrowRight size={20} />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}; 