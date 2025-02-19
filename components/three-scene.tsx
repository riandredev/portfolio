'use client'
import { Canvas } from '@react-three/fiber'
import { MeshTransmissionMaterial } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

function GlassCube() {
  const meshRef = useRef<THREE.Mesh>(null)

  return (
    <mesh ref={meshRef} rotation={[Math.PI * 0.25, Math.PI * 0.25, 0]}>
      <boxGeometry args={[2, 2, 2]} />
      <MeshTransmissionMaterial
        backside
        samples={4}
        thickness={0.5}
        roughness={0}
        distortion={0.5}
        temporalDistortion={0.1}
        distortionScale={0.5}
        transmission={1}
      />
    </mesh>
  )
}

export default function Scene() {
  return (
    <div className="relative w-full h-full">
      <Canvas
        gl={{ antialias: true }}
        camera={{ position: [0, 0, 5], fov: 45 }}
      >
        <color attach="background" args={['transparent']} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <GlassCube />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-purple-500/10 pointer-events-none" />
    </div>
  )
}
