"use client"

import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { IconType } from 'react-icons';
import { FaUserGraduate, FaStore, FaPercentage } from 'react-icons/fa';
import { BiRupee } from 'react-icons/bi';

const StudentBenefit = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const controls = useAnimation();
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  // Stats data with base and fluctuation values
  const stats = [
    {
      icon: FaUserGraduate,
      baseValue: 100000,
      displayValue: 100000,
      fluctuation: 500, // Fluctuates by this amount
      label: "Happy Students",
      color: "from-orange-500 to-red-500",
      speed: 1.5,
    },
    {
      icon: FaStore,
      baseValue: 500,
      displayValue: 500,
      fluctuation: 15,
      label: "Partner Brands",
      color: "from-orange-500 to-red-500",
      speed: 2.2,
    },
    {
      icon: FaPercentage,
      baseValue: 1000,
      displayValue: 1000,
      fluctuation: 25,
      label: "Active Deals",
      color: "from-orange-500 to-red-500",
      speed: 1.8,
    },
    {
      icon: BiRupee,
      baseValue: 5000,
      displayValue: 5000,
      fluctuation: 200,
      label: "Avg. Yearly Savings",
      color: "from-orange-500 to-red-500",
      speed: 1.3,
    }
  ];

  // State to manage the current stat values
  const [statValues, setStatValues] = useState(stats.map(stat => stat.baseValue));
  
  // Create dynamic fluctuations for each stat
  useEffect(() => {
    // Update each stat with a random fluctuation
    const updateStats = () => {
      setStatValues(prevValues => 
        prevValues.map((value, index) => {
          const fluctuation = stats[index].fluctuation;
          const randomChange = Math.floor(Math.random() * fluctuation * 2) - fluctuation;
          
          // Ensure value stays within reasonable bounds (never below base value)
          return Math.max(stats[index].baseValue, value + randomChange);
        })
      );
    };

    // Set different update intervals for each stat to create natural-looking changes
    const intervals = stats.map((stat, index) => {
      return setInterval(() => {
        setStatValues(prev => {
          const newValues = [...prev];
          const fluctuation = stat.fluctuation;
          const randomChange = Math.floor(Math.random() * fluctuation * 2) - fluctuation;
          newValues[index] = Math.max(stat.baseValue, newValues[index] + randomChange);
          return newValues;
        });
      }, stat.speed * 1000); // Different speeds for each counter
    });

    // Cleanup intervals
    return () => intervals.forEach(interval => clearInterval(interval));
  }, []);

  // Format large numbers with commas
  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

  return (
    <section 
      ref={ref}
      className="relative py-20 bg-black overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent"></div>
        <div className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent"></div>
        
        {/* Dynamic background particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-orange-500/30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
        
        {/* Abstract gradient blobs */}
        <motion.div 
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-20 blur-3xl bg-gradient-to-r from-orange-500 to-pink-600"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full opacity-15 blur-3xl bg-gradient-to-r from-red-600 to-orange-500"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="mb-14 text-center"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.6 }
            }
          }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-2">
            <span className="bg-gradient-to-r from-orange-500 to-pink-600 bg-clip-text text-transparent">
              Student Benefits by Numbers
            </span>
          </h2>
          <motion.div 
            className="w-24 h-1.5 bg-gradient-to-r from-orange-500 to-pink-600 mx-auto rounded-full my-4"
            animate={{
              width: ["0%", "100%", "30%", "100%"],
            }}
            transition={{
              duration: 3,
              ease: "easeInOut",
              times: [0, 0.4, 0.5, 1],
              repeat: Infinity,
              repeatDelay: 3
            }}
          />
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Real-time statistics showing how BrokeBro is changing student lives every day.
            Our numbers are constantly growing!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="relative overflow-hidden bg-gray-900/70 backdrop-blur-lg rounded-xl border border-gray-800 hover:border-orange-500/40 transition-all duration-300 p-6 hover:shadow-lg hover:shadow-orange-600/10 group"
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    duration: 0.6,
                    delay: 0.1 * index
                  }
                }
              }}
              whileHover="hover"
            >
              {/* Hover effects */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-orange-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                variants={{
                  hover: { opacity: 1 }
                }}
              />
              
              {/* Icon with animated background */}
              <div className="relative z-10 mb-6">
                <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-orange-600/20 to-pink-600/20 flex items-center justify-center">
                  <motion.div 
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 to-pink-600 opacity-20"
                    animate={{
                      scale: [1, 1.15, 1],
                    }}
                    transition={{
                      duration: 2 + (index * 0.5),
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  {React.createElement(stat.icon, {
                    className: "text-orange-500 text-2xl z-10"
                  })}
                </div>
              </div>
              
              {/* Dynamic number display with animations */}
              <div className="relative">
                <motion.h3 
                  className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent tracking-tight"
                  variants={{
                    hover: {
                      scale: 1.05,
                      transition: { duration: 0.3 }
                    }
                  }}
                >
                  {/* Live countup effect */}
                  <CountUp 
                    end={statValues[index]} 
                    formattingFn={formatNumber} 
                  />
                  
                  {/* Animated plus sign for continuously growing stats */}
                  <motion.span
                    className="text-orange-500 text-2xl absolute -right-3 -top-1"
                    animate={{
                      opacity: [0, 1, 0],
                      y: [0, -15],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 1 + (index * 0.5)
                    }}
                  >
                    +
                  </motion.span>
                </motion.h3>
                
                <p className="text-gray-400 mt-2">{stat.label}</p>
                
                {/* Animated progress bar */}
                <div className="mt-4 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${stat.color} rounded-full`}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{
                      duration: 2,
                      ease: "easeInOut",
                      delay: 0.3 * index
                    }}
                  />
                </div>
                
                {/* Live updates indicator */}
                <div className="flex items-center mt-3">
                  <motion.div 
                    className="w-2 h-2 rounded-full bg-green-500 mr-2"
                    animate={{
                      scale: [1, 1.5, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "loop"
                    }}
                  />
                  <span className="text-xs text-gray-500">Live updates</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Custom counter component with smooth animation
const CountUp = ({ end, formattingFn = (num: number) => num.toString() }) => {
  const [count, setCount] = useState(0);
  const prevEndRef = useRef(end);
  
  useEffect(() => {
    // Track if we're catching up to a new target
    let isCatchingUp = prevEndRef.current !== end;
    let startValue = count;
    
    if (isCatchingUp) {
      prevEndRef.current = end;
    }
    
    // Animate count to new value
    if (count !== end) {
      let animationFrame: number;
      let startTime: number;
      const duration = isCatchingUp ? 1000 : 300; // Faster for micro-adjustments
      
      const updateCount = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        
        // Easing function for smooth animation
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        
        const currentCount = Math.floor(startValue + (end - startValue) * easeOutCubic);
        setCount(currentCount);
        
        if (progress < 1) {
          animationFrame = requestAnimationFrame(updateCount);
        }
      };
      
      animationFrame = requestAnimationFrame(updateCount);
      
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [end, count]);
  
  return <>{formattingFn(count)}</>;
};

export default StudentBenefit;