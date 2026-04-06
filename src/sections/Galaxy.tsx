// galaxy.tsx
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import * as THREE from "three";
import { Stars } from "@react-three/drei";

// ==================== Scene Lights ====================
function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[-5, -5, -5]} intensity={0.5} />
    </>
  );
}

// ==================== Galaxy Sphere ====================
function GalaxySphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    // Smooth rotation
    meshRef.current.rotation.y += 0.002;
    meshRef.current.rotation.x += 0.0005;

    // Floating effect
    meshRef.current.position.y =
      Math.sin(state.clock.elapsedTime * 0.8) * 0.2;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.5, 64, 64]} />
      <meshStandardMaterial
        color="#7c3aed"
        emissive="#7c3aed"
        emissiveIntensity={0.6}
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  );
}

// ==================== Stars Field ====================
function StarsField() {
  return (
    <Stars radius={50} depth={100} count={5000} factor={4} fade speed={1} />
  );
}

// ==================== Galaxy Scene ====================
function GalaxyScene() {
  return (
    <>
      <SceneLights />
      <StarsField />
      <GalaxySphere />
    </>
  );
}

// ==================== Main Canvas Component ====================
export default function GalaxyCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 60 }} className="absolute inset-0 z-0">
      <Suspense fallback={null}>
        <GalaxyScene />
      </Suspense>
    </Canvas>
  );
}