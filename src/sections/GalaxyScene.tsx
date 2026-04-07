 
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function FloatingOrb() {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    ref.current.rotation.y += 0.003;
    ref.current.position.y = Math.sin(state.clock.elapsedTime) * 0.3;
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <mesh ref={ref}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshStandardMaterial
          color="#7c3aed"
          emissive="#22d3ee"
          emissiveIntensity={1.5}
        />
      </mesh>
    </Float>
  );
}

export default function GalaxyScene() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 6] }}>
        <color attach="background" args={["#020617"]} />
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={2} />

        <Stars radius={100} depth={50} count={5000} factor={4} fade speed={1} />

        <FloatingOrb />
      </Canvas>
    </div>
  );
}