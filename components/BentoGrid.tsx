import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import { useState, useRef, useEffect } from "react";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  iconBg,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  iconBg?: string;
}) => {
  const isLarge = className?.includes('md:row-span-2');
  const [isMobile, setIsMobile] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  
  // Detect if on mobile device
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check on mount and when window resizes
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);
  
  return (
    <motion.div
      ref={ref}
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-6 dark:bg-[#0a0a0f]/60 dark:border-white/[0.1] backdrop-blur-sm border border-white/5 justify-between flex flex-col space-y-4",
        className,
        (isMobile && isInView) ? "mobile-in-view" : "",
        isTouched ? "mobile-touched" : ""
      )}
      whileHover={{ 
        y: -5,
        boxShadow: '0 10px 30px -15px rgba(66, 153, 225, 0.2)',
        borderColor: 'rgba(66, 153, 225, 0.3)'
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={
        (isMobile && isInView) || (!isMobile) 
          ? { opacity: 1, y: 0 } 
          : { opacity: 0, y: 20 }
      }
      transition={{ duration: 0.5 }}
      onTouchStart={() => setIsTouched(true)}
      onTouchEnd={() => {
        // Keep touched state for a while to allow animations to complete
        setTimeout(() => setIsTouched(false), 4000);
      }}
    >
      {header}
      <div className={`group-hover/bento:translate-x-2 transition duration-200 ${(isMobile && isTouched) ? 'translate-x-2' : ''}`}>
        <div className="flex items-center mb-5">
          <div className={`${isLarge ? 'w-14 h-14' : 'w-12 h-12'} rounded-lg flex items-center justify-center ${iconBg || 'bg-[#4299e1]/10'} flex-shrink-0`}>
            {icon}
          </div>
          <div className={`font-bold text-white ml-3 ${isLarge ? 'text-2xl' : 'text-xl'} flex-grow`}>
            {title}
          </div>
        </div>
        <div className={`font-normal text-slate-400 ${isLarge ? 'text-base leading-relaxed' : 'text-sm leading-relaxed'}`}>
          {description}
        </div>
      </div>
    </motion.div>
  );
}; 