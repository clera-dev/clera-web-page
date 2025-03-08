"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import dynamic from 'next/dynamic';
import { LucideIcon } from "lucide-react";

// Dynamically import the NewsGlobe component with SSR disabled
const NewsGlobe = dynamic(() => import('./NewsGlobe').then(mod => ({ default: mod.NewsGlobe })), { 
  ssr: false,
  loading: () => <div className="h-80 w-[140%] overflow-hidden rounded-lg opacity-0 absolute bottom-[-160px] left-[-20%]"></div>
});

export const NewsCard = ({
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
  
  return (
    <motion.div
      className={cn(
        "row-span-1 rounded-xl group/card hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-6 dark:bg-[#0a0a0f]/60 dark:border-white/[0.1] backdrop-blur-sm border border-white/5 justify-between flex flex-col relative overflow-hidden",
        className
      )}
      whileHover={{ 
        y: -5,
        boxShadow: '0 10px 30px -15px rgba(255, 235, 59, 0.2)',
        borderColor: 'rgba(255, 235, 59, 0.2)'
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Content */}
      <div className="z-10 flex flex-col h-full">
        <div className="flex items-center mb-5">
          <div className={`${isLarge ? 'w-14 h-14' : 'w-12 h-12'} rounded-lg flex items-center justify-center bg-transparent relative flex-shrink-0`}>
            {/* Base Background with subtle constant glow */}
            <div className="absolute inset-0 rounded-lg bg-[#FFEB3B]/3 group-hover/card:bg-[#FFEB3B]/5 transition-colors duration-300" />
            
            {/* Constant subtle glow effect */}
            <div className="absolute inset-0 rounded-lg shadow-[0_0_10px_rgba(255,235,59,0.15)] group-hover/card:shadow-[0_0_15px_rgba(255,235,59,0.25)] transition-all duration-300"></div>
            
            {/* Border - White outline, turns yellow on hover */}
            <div className="absolute inset-0 rounded-lg border border-white/20 transition-all duration-300 group-hover/card:border-[#FFEB3B]/40 group-hover/card:bg-[rgba(255,235,59,0.08)]" />
            
            {/* Pulsing Glow Effect - Only visible on hover */}
            <motion.div
              className="absolute inset-0 rounded-lg bg-[#FFEB3B]/0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"
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
            
            {/* The Icon - White initially, yellow on hover */}
            <div className="relative z-10 text-white/90 group-hover/card:text-[#FFEB3B]/90 transition-colors duration-300">
              {icon}
            </div>
          </div>
          <div className={`font-bold text-white ml-3 ${isLarge ? 'text-2xl' : 'text-xl'} flex-grow`}>
            {title}
          </div>
        </div>
        <div className={`font-normal text-slate-400 ${isLarge ? 'text-base leading-relaxed' : 'text-sm leading-relaxed'} mb-8`}>
          {description}
        </div>
        
        {/* Spacer that pushes content up to make room for globe */}
        <div className="flex-grow"></div>
      </div>
      
      {/* Globe background with stronger gradient overlay to ensure text readability */}
      <div className="absolute inset-0 w-full h-full opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 ease-in-out">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0a0a0f] to-[#0a0a0f]/20 z-[9]"></div>
        <NewsGlobe />
      </div>
    </motion.div>
  );
}; 