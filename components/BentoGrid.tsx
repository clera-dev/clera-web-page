import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Mobile dots indicator component for the carousel
export const MobileDotsIndicator = ({ 
  totalSlides, 
  currentSlide 
}: { 
  totalSlides: number; 
  currentSlide: number 
}) => {
  return (
    <div className="flex justify-center gap-2 mt-4 md:hidden">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <div
          key={index}
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
            index === currentSlide ? "bg-[#4299e1] w-4" : "bg-gray-600"
          }`}
        />
      ))}
    </div>
  );
};

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const childrenArray = Array.isArray(children) ? children : [children];
  const totalSlides = childrenArray.length;

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

  // Navigation functions for arrow buttons
  const navigateToSlide = (slideIndex: number) => {
    if (!scrollContainerRef.current) return;
    
    // Keep the index within bounds
    const targetIndex = Math.max(0, Math.min(slideIndex, totalSlides - 1));
    
    // Calculate the scroll position - each card is (100vw - 32px) + 16px margin
    const cardWidth = window.innerWidth - 32 + 16; // card width + margin
    const scrollPosition = targetIndex * cardWidth;
    
    // Smooth scroll to that position
    scrollContainerRef.current.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
    
    setCurrentSlide(targetIndex);
  };

  const goToNextSlide = () => {
    navigateToSlide(currentSlide + 1);
  };

  const goToPrevSlide = () => {
    navigateToSlide(currentSlide - 1);
  };

  // Track scroll position to update current slide indicator
  useEffect(() => {
    if (!isMobile || !scrollContainerRef.current) return;

    const scrollContainer = scrollContainerRef.current;
    
    const handleScroll = () => {
      if (!scrollContainer) return;
      
      const cardWidth = window.innerWidth - 32 + 16; // card width + margin
      const scrollPosition = scrollContainer.scrollLeft;
      const newCurrentSlide = Math.round(scrollPosition / cardWidth);
      
      setCurrentSlide(Math.min(newCurrentSlide, totalSlides - 1));
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, [isMobile, totalSlides]);

  // On mobile: vertical stack layout
  // On desktop: standard grid layout
  return (
    <>
      <div
        ref={scrollContainerRef}
        className={cn(
          isMobile
          ? "flex flex-col gap-6 px-4"
          : "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto",
          className
        )}
      >
        {isMobile 
          ? childrenArray.map((child, index) => (
              <div 
                key={index} 
                className="w-full"
                style={{ 
                  height: 'auto',
                  minHeight: '280px',
                }}
              >
                {child}
              </div>
            ))
          : children
        }
      </div>
    </>
  );
};

// Add a style tag to hide scrollbars on mobile
export const MobileScrollbarStyle = () => (
  <style jsx global>{`
    .hide-scrollbar::-webkit-scrollbar {
      display: none;
    }
  `}</style>
);

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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
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
        "row-span-1 rounded-xl group/bento transition duration-200 shadow-input dark:shadow-none p-4 sm:p-6 dark:bg-[#0a0a0f]/60 dark:border-white/[0.1] backdrop-blur-sm border border-white/5 justify-between flex flex-col h-full",
        className
      )}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { 
          opacity: 0,
          y: 20
        },
        visible: { 
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: "easeOut"
          }
        }
      }}
      whileHover={!isMobile ? {
        y: -5,
        boxShadow: '0 10px 30px -15px rgba(66, 153, 225, 0.2)',
        borderColor: 'rgba(66, 153, 225, 0.3)'
      } : {}}
    >
      {header}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div 
            className={cn(
              "rounded-lg flex items-center justify-center flex-shrink-0",
              isLarge ? 'w-14 h-14' : 'w-12 h-12',
              iconBg || 'bg-[#4299e1]/10'
            )}
          >
            {icon}
          </div>
          <div className={cn(
            "font-bold text-white",
            isLarge ? 'text-2xl' : 'text-xl'
          )}>
            {title}
          </div>
        </div>
        <div className={cn(
          "font-normal text-slate-400",
          isLarge ? 'text-base leading-relaxed' : 'text-sm leading-relaxed'
        )}>
          {description}
        </div>
      </div>
    </motion.div>
  );
};