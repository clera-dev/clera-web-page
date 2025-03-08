"use client";
import { useMotionValue } from "framer-motion";
import React, { useState, useEffect } from "react";
import { useMotionTemplate, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Shield } from "lucide-react";

export const SecurityCard = ({
  title,
  description,
  className,
}: {
  title: string;
  description: string;
  className?: string;
}) => {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);
  const [randomString, setRandomString] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const str = generateRandomString(1500);
    setRandomString(str);
    
    // Periodically update the random string even without mouse movement
    const interval = setInterval(() => {
      setRandomString(generateRandomString(1500));
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  function onMouseMove({ currentTarget, clientX, clientY }: any) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);

    const str = generateRandomString(1500);
    setRandomString(str);
  }

  return (
    <div
      className={cn(
        "p-0.5 bg-transparent w-full h-full relative rounded-xl overflow-hidden",
        className
      )}
    >
      <motion.div
        onMouseMove={onMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group/card rounded-xl w-full relative overflow-hidden bg-[#0a0a0f]/60 backdrop-blur-sm border border-white/5 h-full"
        whileHover={{ 
          y: -5,
          boxShadow: '0 10px 30px -15px rgba(220, 38, 38, 0.4)',
          borderColor: 'rgba(220, 38, 38, 0.3)'
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <CardPattern
          mouseX={mouseX}
          mouseY={mouseY}
          randomString={randomString}
        />
        
        <div className="relative z-10 p-6 h-full flex flex-col">
          <div className="flex items-center mb-5 relative z-20">
            <motion.div 
              className="w-12 h-12 rounded-lg bg-transparent/10 backdrop-blur-sm flex items-center justify-center border border-white/40 group-hover/card:bg-red-600/90 group-hover/card:border-red-500 transition-all duration-500 ease-in-out"
              animate={isHovered ? {
                boxShadow: ['0 0 0px rgba(220, 38, 38, 0.6)', '0 0 20px rgba(220, 38, 38, 0.6)', '0 0 0px rgba(220, 38, 38, 0.6)'],
              } : {}}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            >
              <Shield 
                size={24} 
                className={`text-transparent fill-transparent stroke-white/80 group-hover/card:text-white group-hover/card:fill-red-500/10 group-hover/card:stroke-white transition-all duration-700 ease-in-out ${!isHovered ? 'pulse-outline' : ''}`}
                strokeWidth={2}
              />
            </motion.div>
            <h3 className="font-bold text-white ml-3 text-xl group-hover/card:text-red-50 transition-colors duration-500">{title}</h3>
          </div>
          
          <div className="font-normal text-slate-400 text-sm leading-relaxed relative z-20">
            {description}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export function CardPattern({ mouseX, mouseY, randomString }: any) {
  let maskImage = useMotionTemplate`radial-gradient(250px at ${mouseX}px ${mouseY}px, white, transparent)`;
  let style = { maskImage, WebkitMaskImage: maskImage };

  return (
    <div className="pointer-events-none">
      <div className="absolute inset-0 rounded-xl [mask-image:linear-gradient(white,transparent)] group-hover/card:opacity-30"></div>
      <motion.div
        className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-800/40 to-red-900/30 opacity-0 group-hover/card:opacity-70 backdrop-blur-sm transition duration-500"
        style={style}
      />
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 mix-blend-overlay group-hover/card:opacity-60"
        style={style}
      >
        <p className="absolute inset-x-0 text-xs h-full break-words whitespace-pre-wrap text-white/70 font-mono font-bold transition duration-500">
          {randomString}
        </p>
      </motion.div>
    </div>
  );
}

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:'\"<>,.?/~`";

// Enhance with encryption-themed characters and symbols
const encryptionCharacters = [
  ...characters.split(""),
  "🔒", "🔑", "🛡️", "🔐", "🔏", "🔓", "🛑", "⚠️", "✓", "✗",
  "█", "▓", "▒", "░", "■", "□", "▢", "▣", "▤", "▥", "▦", "▧", "▨", "▩",
  "◆", "◇", "◈", "◉", "◊", "○", "◌", "◍", "◎", "●", "◐", "◑", "◒", "◓",
  "⌘", "⌥", "⇧", "⌫", "↵", "⌦", "↩", "↪", "↻", "↺", "⇄", "⇆", "⇅", "⇵"
];

export const generateRandomString = (length: number) => {
  let result = "";
  const charArray = encryptionCharacters;
  
  // Add spaces to make the pattern more sparse
  for (let i = 0; i < length; i++) {
    // Add more spaces to make the pattern less dense (about 40% characters, 60% spaces)
    if (Math.random() > 0.4) {
      result += " ";
    } else {
      result += charArray[Math.floor(Math.random() * charArray.length)];
    }
  }
  return result;
}; 