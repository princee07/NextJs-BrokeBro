"use client"

import React, { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Box, OrbitControls, Environment } from '@react-three/drei'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import * as THREE from 'three'

// Individual 3D Block with animation
const Block = ({ color, position, size, delay, rotation }) => {
  const meshRef = useRef()
  const [active, setActive] = useState(false)
  const [startPos] = useState([position[0], position[1] + 15, position[2]])
  const [startRotation] = useState([
    rotation[0] * 2 + Math.random() * 0.5, 
    rotation[1] * 2 + Math.random() * 0.5, 
    rotation[2] * 2 + Math.random() * 0.5
  ])
  
  // Define block colors matching the wooden blocks in the reference image
  const colors = {
    red: '#e74c3c',
    blue: '#3498db',
    green: '#2ecc71',
    yellow: '#f1c40f',
    purple: '#9b59b6',
    orange: '#e67e22'
  }
  
  const blockColor = colors[color] || color
  
  // Start animation after delay
  useEffect(() => {
    const timer = setTimeout(() => setActive(true), delay * 1000)
    return () => clearTimeout(timer)
  }, [delay])
  
  // Animation frame logic
  useFrame((_, delta) => {
    if (!meshRef.current || !active) return
    
    // Current position and target position
    const currentPos = meshRef.current.position
    const targetPos = new THREE.Vector3(position[0], position[1], position[2])
    
    // Current rotation and target rotation
    const currentRot = meshRef.current.rotation
    const targetRot = new THREE.Euler(rotation[0], rotation[1], rotation[2])
    
    // Smoothly interpolate position (spring-like effect)
    const positionLerpFactor = 2.5 * delta
    currentPos.x = THREE.MathUtils.lerp(currentPos.x, targetPos.x, positionLerpFactor)
    currentPos.y = THREE.MathUtils.lerp(currentPos.y, targetPos.y, positionLerpFactor)
    currentPos.z = THREE.MathUtils.lerp(currentPos.z, targetPos.z, positionLerpFactor)
    
    // Smoothly interpolate rotation (spring-like effect)
    const rotationLerpFactor = 2.0 * delta
    currentRot.x = THREE.MathUtils.lerp(currentRot.x, targetRot.x, rotationLerpFactor)
    currentRot.y = THREE.MathUtils.lerp(currentRot.y, targetRot.y, rotationLerpFactor)
    currentRot.z = THREE.MathUtils.lerp(currentRot.z, targetRot.z, rotationLerpFactor)
  })
  
  return (
    <mesh 
      ref={meshRef}
      position={startPos} 
      rotation={startRotation}
      castShadow 
      receiveShadow
    >
      <boxGeometry args={size} />
      <meshStandardMaterial 
        color={blockColor}
        roughness={0.8}
        metalness={0.1}
      />
    </mesh>
  )
}

// Ground plane to catch shadows
const Ground = () => (
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
    <planeGeometry args={[50, 50]} />
    <shadowMaterial opacity={0.2} />
  </mesh>
)

// Scene setup
const BlockScene = ({ startAnimation }) => {
  const { camera } = useThree()
  
  useEffect(() => {
    camera.position.set(0, 7, 13)
    camera.lookAt(0, 0, 0)
  }, [camera])
  
  // Block configurations for stacking
  const blocks = [
    // Bottom layer
    { 
      color: 'red', 
      position: [-1.2, 0, -0.5], 
      size: [1.9, 1.9, 1.9], 
      delay: 0.2,
      rotation: [-0.1, 0.05, -0.02]
    },
    { 
      color: 'yellow', 
      position: [1.1, 0, 1.5], 
      size: [1.7, 1.7, 1.7], 
      delay: 0.4,
      rotation: [0.02, -0.07, 0.03] 
    },
    { 
      color: 'green', 
      position: [-1.5, 0, 1.8], 
      size: [1.8, 1.8, 1.8], 
      delay: 0.1,
      rotation: [0.03, 0.02, -0.05] 
    },
    { 
      color: 'blue', 
      position: [2.2, 0, -1], 
      size: [1.85, 1.85, 1.85], 
      delay: 0.3,
      rotation: [-0.04, -0.03, 0.04]
    },
    
    // Second layer
    { 
      color: 'purple', 
      position: [0.3, 2, 0.4], 
      size: [1.75, 1.75, 1.75], 
      delay: 0.8,
      rotation: [0.05, -0.02, -0.03]
    },
    { 
      color: 'orange', 
      position: [-0.8, 2, 1], 
      size: [1.8, 1.8, 1.8], 
      delay: 0.9,
      rotation: [-0.03, 0.04, 0.05]
    },
    { 
      color: 'red', 
      position: [1.7, 2, 0], 
      size: [1.7, 1.7, 1.7], 
      delay: 1.0,
      rotation: [0.02, 0.03, -0.04]
    },
    
    // Third layer
    { 
      color: 'green', 
      position: [0.2, 4, 0.5], 
      size: [1.75, 1.75, 1.75], 
      delay: 1.3,
      rotation: [-0.02, -0.03, 0.02]
    },
    { 
      color: 'blue', 
      position: [1.1, 4, 0.3], 
      size: [1.7, 1.7, 1.7], 
      delay: 1.4,
      rotation: [0.03, -0.02, 0.04]
    },
    
    // Top block
    { 
      color: 'red', 
      position: [0.6, 6, 0.4], 
      size: [1.65, 1.65, 1.65], 
      delay: 1.8,
      rotation: [-0.04, 0.05, -0.02]
    },
  ]
  
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight 
        position={[10, 15, 10]} 
        intensity={1} 
        castShadow 
        shadow-mapSize-width={2048} 
        shadow-mapSize-height={2048}
      />
      
      <Ground />
      
      {startAnimation && blocks.map((block, index) => (
        <Block 
          key={index}
          color={block.color}
          position={block.position}
          size={block.size}
          delay={block.delay}
          rotation={block.rotation}
        />
      ))}
    </>
  )
}

// Main component
const WoodenBlocks3D = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  
  const [startAnimation, setStartAnimation] = useState(false)
  
  useEffect(() => {
    if (inView) {
      // Start animation with a slight delay
      const timer = setTimeout(() => setStartAnimation(true), 500)
      return () => clearTimeout(timer)
    }
  }, [inView])

  return (
    <section 
      ref={ref} 
      className="relative w-full py-24 bg-black"
      style={{ minHeight: "800px" }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5" style={{ 
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M1 1h2v2H1V1z\'/%3E%3C/g%3E%3C/svg%3E")',
        backgroundSize: '20px 20px'
      }}></div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10"
          >
            <div className="flex items-center mb-6">
              <div className="flex space-x-1 mr-4">
                <div className="w-6 h-6 bg-orange-500 rounded"></div>
                <div className="w-6 h-6 bg-blue-500 rounded mt-1"></div>
                <div className="w-6 h-6 bg-green-500 rounded mt-2"></div>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Building <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">Your Future</span>
              </h2>
            </div>
            
            <h3 className="text-3xl font-bold text-white mb-6">
              One Block At A Time
            </h3>
            
            <p className="text-gray-300 mb-6 text-lg">
              At BrokeBro, we believe every student deserves access to the building blocks of modern education. Our mission is to make technology affordable for students, helping them build their academic and professional future.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="mt-1 mr-4 w-6 h-6 bg-orange-500/20 rounded-md flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-gray-300">
                  <span className="text-orange-400 font-medium">Foundation Block:</span> Verified student discounts on essential tech products.
                </p>
              </div>
              
              <div className="flex items-start">
                <div className="mt-1 mr-4 w-6 h-6 bg-blue-500/20 rounded-md flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-gray-300">
                  <span className="text-blue-400 font-medium">Support Block:</span> Expert guidance on choosing the right tech for your course.
                </p>
              </div>
              
              <div className="flex items-start">
                <div className="mt-1 mr-4 w-6 h-6 bg-green-500/20 rounded-md flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-gray-300">
                  <span className="text-green-400 font-medium">Growth Block:</span> Access to educational resources and student community.
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <motion.button 
                className="px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-medium rounded-lg transition-all shadow-lg hover:shadow-orange-500/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Building
              </motion.button>
              
              <motion.button 
                className="px-8 py-3 border border-blue-500/50 text-blue-400 hover:bg-blue-500/10 font-medium rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>
          
          {/* 3D Blocks Canvas */}
          <div className="h-[500px] w-full relative">
            <Canvas shadows dpr={[1, 2]} className="rounded-xl overflow-hidden bg-black/30">
              <BlockScene startAnimation={startAnimation} />
              <OrbitControls 
                enableZoom={false}
                enablePan={false}
                maxPolarAngle={Math.PI / 2.2}
                minPolarAngle={Math.PI / 4}
              />
              <Environment preset="city" />
            </Canvas>
          </div>
        </div>
      </div>
      
      {/* Bottom decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-blue-500 to-green-500"></div>
    </section>
  )
}

export default WoodenBlocks3D