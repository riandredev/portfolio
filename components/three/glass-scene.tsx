'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useEffect } from 'react'
import { Vector3, Mesh, Group } from 'three'
import {
  MeshTransmissionMaterial,
  Environment,
  Float,
} from '@react-three/drei'
import { useGraphicsStore } from '@/store/graphics'

function Scene() {
  const mainMeshRef = useRef<Mesh>(null)
  const glowMeshRef = useRef<Mesh>(null)
  const groupRef = useRef<Group>(null)
  const scrollRef = useRef(0)
  const smoothedScrollRef = useRef(0)
  const baseRotationY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      // Calculate normalized scroll position (0 to 1)
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      scrollRef.current = Math.min(1, Math.max(0, window.scrollY / maxScroll))
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useFrame((state, delta) => {
    if (!groupRef.current) return

    // Smooth scroll interpolation
    smoothedScrollRef.current += (scrollRef.current - smoothedScrollRef.current) * 0.1

    // Update rotation with enhanced movement
    if (groupRef.current) {
      // Continuous self-rotation
      baseRotationY.current += delta * 0.2 // Increased base rotation speed

      // Calculate scroll-based rotation
      const scrollRotation = smoothedScrollRef.current * Math.PI * 2 // Doubled rotation range

      // Combine rotations
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2 + (scrollRotation * 0.3)
      groupRef.current.rotation.y = baseRotationY.current + (scrollRotation * 0.5) // Increased scroll influence
      groupRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1

      // Adjust position with more pronounced movement
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1 - (smoothedScrollRef.current * 0.5)
      groupRef.current.position.z = -0.5 + (smoothedScrollRef.current * 1.0) // Increased z-axis movement
    }

    // More dynamic material distortion
    if (mainMeshRef.current && mainMeshRef.current.material) {
      const material = mainMeshRef.current.material as any
      material.distortion = 0.8 + Math.sin(state.clock.getElapsedTime()) * 0.2 + smoothedScrollRef.current * 0.7
      material.transmission = 1 - smoothedScrollRef.current * 0.3
    }
  })

  return (
    <Float rotationIntensity={0.2} floatIntensity={0.2} speed={1.5}>
      <group ref={groupRef}>
        {/* Subtle glow mesh */}
        <mesh ref={glowMeshRef} scale={0.885}>
          <torusKnotGeometry args={[0.7, 0.3, 100, 16]} />
          <meshBasicMaterial
            color="#3B82F6"
            transparent
            opacity={0.03}
            side={2}
            depthWrite={false}
          />
        </mesh>

        {/* Main mesh with updated material settings */}
        <mesh ref={mainMeshRef} castShadow scale={0.8}>
          <torusKnotGeometry args={[0.7, 0.3, 100, 16]} />
          <MeshTransmissionMaterial
            samples={6}
            thickness={0.5}
            roughness={0}
            distortion={1}
            temporalDistortion={0.4}
            distortionScale={1}
            transmission={1}
            clearcoat={0.8} // Reduced for less intense reflection
            clearcoatRoughness={0.2}
            resolution={256}
            color="#60A5FA"
            attenuationDistance={0.5} // Increased for softer color spread
            attenuationColor="#93C5FD"
            chromaticAberration={1}
            transparent
            opacity={0.85} // Slightly reduced opacity
            ior={1.5}

            backside={true}
            backsideThickness={0.5}
          />
        </mesh>
      </group>
    </Float>
  )
}

export default function GlassScene() {
  const { setSceneLoaded } = useGraphicsStore()

  // Notify when scene is ready
  useEffect(() => {
    setSceneLoaded(true)
    return () => setSceneLoaded(false)
  }, [setSceneLoaded])

  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 45 }}
        style={{ background: 'none' }}
      >
        <ambientLight intensity={0.4} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1.2}
          castShadow
          color="#60A5FA"
        />
        <pointLight
          position={[-10, -10, -10]}
          intensity={0.4}
          color="#BFDBFE"
        />
        <Scene />
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}
