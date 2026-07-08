"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import type { MotionValue } from "motion/react";

/* ---------------------------------------------------------------
   A stylised, GPU-light walkthrough of the barbershop:
   outside the door → through it → settling on the barber chair.
   Warm amber fog + gold dust + gold bloom. Re-themed from the
   space/cosmos reference into Nunus Barber's world.
--------------------------------------------------------------- */

const GOLD = "#c9a96e";
const BRICK = "#4a352b";
const WALNUT = "#3a2a1e";
const CHROME = "#cfd3d8";

function damp(current: number, target: number, lambda: number, dt: number) {
  return THREE.MathUtils.damp(current, target, lambda, dt);
}

/** Floating gold dust particles caught in the shop light. */
function GoldDust({ count = 260 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 1] = Math.random() * 8 - 1;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 34 - 6;
    }
    return arr;
  }, [count]);

  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y += dt * 0.02;
    ref.current.position.y = Math.sin(performance.now() / 3000) * 0.2;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color={GOLD} transparent opacity={0.85} sizeAttenuation depthWrite={false} />
    </points>
  );
}

/** One wall lined with framed mirrors / shelves (stylised boxes). */
function Wall({ side }: { side: -1 | 1 }) {
  const x = side * 4.2;
  const frames = [4, -2, -8, -14];
  return (
    <group>
      {/* brick wall slab */}
      <mesh position={[x, 2, -8]} rotation={[0, side === 1 ? -Math.PI / 2 : Math.PI / 2, 0]}>
        <planeGeometry args={[34, 9]} />
        <meshStandardMaterial color={BRICK} roughness={1} metalness={0} />
      </mesh>
      {/* walnut mirror frames */}
      {frames.map((z) => (
        <mesh key={z} position={[x - side * 0.15, 2.2, z]} rotation={[0, side === 1 ? -Math.PI / 2 : Math.PI / 2, 0]}>
          <boxGeometry args={[2, 3, 0.15]} />
          <meshStandardMaterial color={WALNUT} roughness={0.6} metalness={0.1} emissive={GOLD} emissiveIntensity={0.04} />
        </mesh>
      ))}
      {/* walnut counter */}
      <mesh position={[x - side * 0.5, 0.1, -8]} rotation={[0, side === 1 ? -Math.PI / 2 : Math.PI / 2, 0]}>
        <boxGeometry args={[34, 0.6, 1]} />
        <meshStandardMaterial color={WALNUT} roughness={0.5} metalness={0.2} />
      </mesh>
    </group>
  );
}

/** The doorway the camera pushes through, warm light glowing behind. */
function Doorway() {
  return (
    <group position={[0, 1.6, 6]}>
      {/* frame */}
      <mesh position={[-1.4, 0, 0]}>
        <boxGeometry args={[0.3, 5, 0.4]} />
        <meshStandardMaterial color={WALNUT} roughness={0.5} />
      </mesh>
      <mesh position={[1.4, 0, 0]}>
        <boxGeometry args={[0.3, 5, 0.4]} />
        <meshStandardMaterial color={WALNUT} roughness={0.5} />
      </mesh>
      <mesh position={[0, 2.6, 0]}>
        <boxGeometry args={[3.1, 0.35, 0.4]} />
        <meshStandardMaterial color={WALNUT} roughness={0.5} />
      </mesh>
      {/* warm glow spilling out */}
      <mesh position={[0, 0, -0.4]}>
        <planeGeometry args={[2.6, 4.6]} />
        <meshBasicMaterial color={GOLD} transparent opacity={0.28} />
      </mesh>
      <pointLight position={[0, 0, -1]} color={GOLD} intensity={9} distance={12} />
    </group>
  );
}

/** A stylised barber chair the journey settles on. */
function BarberChair() {
  return (
    <group position={[0, -0.4, -9]}>
      {/* chrome base */}
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.9, 1.1, 0.3, 32]} />
        <meshStandardMaterial color={CHROME} metalness={1} roughness={0.25} />
      </mesh>
      <mesh position={[0, 0.7, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 1, 20]} />
        <meshStandardMaterial color={CHROME} metalness={1} roughness={0.25} />
      </mesh>
      {/* leather seat */}
      <mesh position={[0, 1.25, 0]}>
        <boxGeometry args={[1.7, 0.4, 1.7]} />
        <meshStandardMaterial color="#161311" roughness={0.7} metalness={0.1} />
      </mesh>
      {/* backrest */}
      <mesh position={[0, 2.2, -0.75]}>
        <boxGeometry args={[1.7, 1.9, 0.35]} />
        <meshStandardMaterial color="#161311" roughness={0.7} metalness={0.1} />
      </mesh>
      {/* warm spotlight over the chair */}
      <spotLight position={[0, 6, 1]} angle={0.55} penumbra={0.8} intensity={30} color={"#ffd9a0"} distance={16} target-position={[0, 1, 0]} />
    </group>
  );
}

/** Reads scroll progress each frame and eases the camera along the journey. */
function CameraRig({ progress }: { progress: MotionValue<number> }) {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useFrame((_, dt) => {
    const p = progress.get(); // 0 (outside) → 1 (at the chair)
    const targetZ = 14 - p * 22; // 14 → -8
    const targetY = 1.7 - p * 0.4;
    camera.position.z = damp(camera.position.z, targetZ, 3, dt);
    camera.position.y = damp(camera.position.y, targetY, 3, dt);
    camera.position.x = damp(camera.position.x, mouse.current.x * 0.6, 2.5, dt);
    camera.lookAt(mouse.current.x * 0.4, 1.2 - p * 0.3, targetZ - 8);
  });

  // gentle cursor parallax
  useMemo(() => {
    if (typeof window === "undefined") return;
    const onMove = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return null;
}

export default function Scene3D({ progress }: { progress: MotionValue<number> }) {
  return (
    <Canvas
      dpr={[1, 1.6]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 1.7, 14], fov: 55, near: 0.1, far: 60 }}
      onCreated={({ scene }) => {
        scene.fog = new THREE.Fog(new THREE.Color("#1a1108"), 6, 34);
        scene.background = new THREE.Color("#0b0b0c");
      }}
    >
      <ambientLight intensity={0.35} color={"#ffdfae"} />
      <directionalLight position={[4, 8, 6]} intensity={0.5} color={"#ffe9c8"} />
      <pointLight position={[0, 4, -8]} intensity={6} color={GOLD} distance={20} />

      <CameraRig progress={progress} />
      <Wall side={-1} />
      <Wall side={1} />
      {/* floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, -6]}>
        <planeGeometry args={[12, 40]} />
        <meshStandardMaterial color="#211a15" roughness={0.9} metalness={0.1} />
      </mesh>
      {/* ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 6.5, -6]}>
        <planeGeometry args={[12, 40]} />
        <meshStandardMaterial color="#0e0b09" roughness={1} />
      </mesh>
      <Doorway />
      <BarberChair />
      <GoldDust />

      <EffectComposer>
        <Bloom intensity={0.9} luminanceThreshold={0.55} luminanceSmoothing={0.9} mipmapBlur radius={0.7} />
        <Vignette eskil={false} offset={0.25} darkness={0.85} />
      </EffectComposer>
    </Canvas>
  );
}
