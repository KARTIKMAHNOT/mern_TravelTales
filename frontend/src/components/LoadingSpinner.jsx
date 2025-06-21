/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 to-black backdrop-blur-sm">
      {/* Animated background elements */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${30 + Math.random() * 100}px`,
            height: `${30 + Math.random() * 100}px`,
            background: `radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)`
          }}
          animate={{
            x: [0, Math.random() * 200 - 100],
            y: [0, Math.random() * 200 - 100],
            scale: [1, 1.5, 1],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{
            duration: 3 + Math.random() * 5,
            repeat: Infinity,
            delay: i * 0.5
          }}
        />
      ))}
      
      {/* Main spinner container */}
      <div className="relative flex flex-col items-center justify-center">
        {/* Outer glow */}
        <div className="absolute w-48 h-48 rounded-full bg-emerald-500/10 blur-xl animate-pulse" />
        
        {/* Spinner rings */}
        <motion.div
          className="relative w-32 h-32 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        >
          {/* Emerald ring */}
          <div className="absolute inset-0 border-t-4 rounded-full border-emerald-500 border-opacity-70" />
          
          {/* Cyan ring */}
          <motion.div 
            className="absolute inset-0 border-b-4 border-opacity-50 rounded-full border-cyan-300"
            animate={{ rotate: [0, 180, 360] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Glowing dots */}
          <motion.div
            className="absolute top-0 left-1/2 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#10b981]"
            animate={{ 
              boxShadow: [
                "0 0 5px #10b981",
                "0 0 15px #10b981",
                "0 0 5px #10b981"
              ] 
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-0 left-1/2 w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_10px_#67e8f9]"
            animate={{ 
              boxShadow: [
                "0 0 5px #67e8f9",
                "0 0 15px #67e8f9",
                "0 0 5px #67e8f9"
              ] 
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              delay: 0.5
            }}
          />
        </motion.div>
        
        {/* Train icon with glow */}
        <motion.div
          className="absolute"
          animate={{ 
            y: [0, -5, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <svg 
            viewBox="0 0 24 24" 
            className="w-12 h-12 text-emerald-300 drop-shadow-[0_0_10px_rgba(110,231,183,0.8)]"
          >
            <path
              fill="currentColor"
              d="M12 2c-4 0-8 .5-8 4v9.5c0 .95.38 1.81 1 2.44V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-2.06c.62-.63 1-1.49 1-2.44V6c0-3.5-3.58-4-8-4M5.5 17c-.83 0-1.5-.67-1.5-1.5S4.67 14 5.5 14s1.5.67 1.5 1.5S6.33 17 5.5 17zm13 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5s1.5.67 1.5 1.5s-.67 1.5-1.5 1.5zm1.5-6H4V6h16v5z"
            />
          </svg>
        </motion.div>
        
        {/* Loading text */}
        <motion.div
          className="mt-16 text-center"
          animate={{ 
            opacity: [0.6, 1, 0.6],
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity 
          }}
        >
          <h1 className="text-xl font-light tracking-wider text-emerald-200">
            TravelTales
          </h1>
          
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingSpinner;