'use client';
import { useEffect, useRef, useState, Suspense } from 'react';
import { useThree, useFrame, extend } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import { createNoise2D } from 'simplex-noise';
import { useTheme } from 'next-themes';

import cardGLB from "@/assets/lanyard/card.glb";

import * as THREE from 'three';

extend({ MeshLineGeometry, MeshLineMaterial });

export default function Lanyard({ position = [0, 0, 30], gravity = [0, -40, 0] }) {
  const [oscillation, setOscillation] = useState(0);
  const [windStarted, setWindStarted] = useState(false);
  const animationRef = useRef();
  const noise2D = useRef(createNoise2D());
  const startTime = useRef(Date.now());
  const [isTabVisible, setIsTabVisible] = useState(true);

  useEffect(() => {
    // delay wind start by 2 seconds
    const windTimeout = setTimeout(() => {
      setWindStarted(true);
    }, 2000);

    const animate = () => {
      setOscillation(prev => (prev + 0.002) % (Math.PI * 2));
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      clearTimeout(windTimeout);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  useEffect(() => {
    // Handle tab visibility changes
    const handleVisibilityChange = () => {
      setIsTabVisible(!document.hidden);
      setWindStarted(false); // Reset wind state

      // If becoming visible, restart wind after a short delay
      if (!document.hidden) {
        setTimeout(() => {
          setWindStarted(true);
        }, 500);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // generate random wind movements
  const time = (Date.now() - startTime.current) / 1000;
  const noise1 = noise2D.current(time * 0.1, 0) * 1.5;
  const noise2 = noise2D.current(time * 0.2, 100) * 0.8;
  const noise3 = noise2D.current(time * 0.4, 200) * 0.3;

  // gradually increase wind strength
  const windIntensity = windStarted ? Math.min((time - 2) * 0.2, 1) : 0;
  const swayStrength = 2.5;

  const dynamicGravity = [
    windStarted ? (noise1 + noise2 + noise3) * swayStrength * windIntensity : 0,
    -40,
    windStarted ? Math.cos(oscillation) * swayStrength * 0.05 * windIntensity : 0,
  ];

  return (
    <Physics
      interpolate={isTabVisible}
      gravity={dynamicGravity}
      timeStep={1 / 60}
      paused={!isTabVisible}
    >
      <ambientLight intensity={Math.PI} />
      <Suspense fallback={null}>
        <Band />
      </Suspense>
      <Environment blur={0.75}>
        <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
        <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
        <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
        <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
      </Environment>
    </Physics>
  );
}

function Band({ maxSpeed = 50, minSpeed = 8 }) { // Adjusted minSpeed
  const { resolvedTheme } = useTheme();
  const band = useRef(), fixed = useRef(), j1 = useRef(), j2 = useRef(), j3 = useRef(), card = useRef();
  const vec = new THREE.Vector3(), ang = new THREE.Vector3(), rot = new THREE.Vector3(), dir = new THREE.Vector3();
  const segmentProps = {
    type: 'dynamic',
    canSleep: false, // prevent physics from sleeping
    colliders: false,
    angularDamping: 5,
    linearDamping: 6
  };
  const { nodes, materials } = useGLTF(cardGLB, true, true, (error) => {
    console.error('Error loading GLB:', error);
  });
  const texture = useTexture(
    resolvedTheme === 'dark' ? '/images/lanyard.png' : '/images/lanyard-light.png',
    (texture) => {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    },
    undefined,
    (error) => {
      console.error('Error loading lanyard texture:', error);
    }
  );
  const { width, height } = useThree((state) => state.size);
  const [hovered, hover] = useState(false);
  const [dragged, drag] = useState(false);

  const [curve] = useState(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(),
    new THREE.Vector3(),
    new THREE.Vector3(),
    new THREE.Vector3()
  ]));

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    // Skip frame updates if tab is not visible
    if (document.hidden) return;

    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z
      });
    }

    if (fixed.current) {
      [j1, j2].forEach((ref) => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(0.05, Math.min(0.6, ref.current.lerped.distanceTo(ref.current.translation())));
        // interpolation
        const lerpSpeed = delta * (minSpeed + Math.pow(clampedDistance, 1.5) * (maxSpeed - minSpeed));
        ref.current.lerped.lerp(ref.current.translation(), lerpSpeed);
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(32));
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());

      if (!dragged) {
        const time = state.clock.getElapsedTime();
        const noise2D = createNoise2D();

        // random micro-movements
        const microX = noise2D(time * 0.5, 0) * 0.0008;
        const microZ = noise2D(time * 0.7, 100) * 0.0008;

        const rotationDamping = 0.08;
        const naturalRotation = {
          x: ang.x * 1.01 + microX,
          y: ang.y - rot.y * rotationDamping,
          z: ang.z * 1.01 + microZ
        };

        // rotation variations
        const randomVariation = {
          x: (Math.random() - 0.5) * 0.0005,
          y: (Math.random() - 0.5) * 0.0003,
          z: (Math.random() - 0.5) * 0.0005
        };

        card.current.setAngvel({
          x: naturalRotation.x + randomVariation.x,
          y: naturalRotation.y + randomVariation.y,
          z: naturalRotation.z + randomVariation.z
        });
      }
    }

    // Reset positions if physics seems unstable
    if (fixed.current && !dragged) {
      const cardPos = card.current?.translation();
      if (cardPos && (Math.abs(cardPos.x) > 10 || Math.abs(cardPos.y) > 10)) {
        // Reset to default positions
        card.current?.setTranslation({ x: 2, y: 0, z: 0 });
        j1.current?.setTranslation({ x: 0.5, y: 0, z: 0 });
        j2.current?.setTranslation({ x: 1, y: 0, z: 0 });
        j3.current?.setTranslation({ x: 1.5, y: 0, z: 0 });
      }
    }
  });

  curve.curveType = 'chordal';

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => {
              e.target.releasePointerCapture(e.pointerId)
              drag(false)
            }}
            onPointerDown={(e) => {
              e.target.setPointerCapture(e.pointerId)
              const point = new THREE.Vector3(e.point.x, e.point.y, e.point.z)
              drag(point.sub(vec.copy(card.current.translation())))
            }}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={materials.base.map}
                map-anisotropy={16}
                clearcoat={1}
                clearcoatRoughness={0.15}
                roughness={0.9}
                metalness={0.8}
              />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          lineWidth={1}
          repeat={[-4, 1]}
          map={texture}
          useMap
          resolution={[width, height]}
        />
      </mesh>
    </>
  );
}

useGLTF.preload(cardGLB); // Pre-load the model
