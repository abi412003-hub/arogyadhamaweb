"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Html, Float } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";

export type Modality = { name: string; href: string; color: string };

const ORBIT_RADIUS = 3;
const FOREST = "#1B4332";

function Blob({ color }: { color: string }) {
  const mesh = useRef<THREE.Mesh>(null!);
  const target = useMemo(() => new THREE.Color(color), []);

  useFrame((state, delta) => {
    const m = mesh.current;
    if (!m) return;
    m.rotation.y += delta * 0.15;
    m.rotation.x = THREE.MathUtils.lerp(m.rotation.x, state.pointer.y * 0.35, 0.04);
    m.rotation.z = THREE.MathUtils.lerp(m.rotation.z, state.pointer.x * 0.25, 0.04);
    target.set(color);
    const mat = m.material as THREE.MeshStandardMaterial;
    if (mat?.color) mat.color.lerp(target, 0.06);
  });

  return (
    <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.6}>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1.5, 16]} />
        <MeshDistortMaterial
          color={color}
          distort={0.42}
          speed={2.2}
          roughness={0.35}
          metalness={0.45}
        />
      </mesh>
    </Float>
  );
}

function Orb({
  data,
  position,
  active,
  onHover,
}: {
  data: Modality;
  position: [number, number, number];
  active: boolean;
  onHover: (leaving: boolean) => void;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  const v = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    const s = active ? 1.7 : 1;
    ref.current?.scale.lerp(v.set(s, s, s), 0.15);
  });

  return (
    <group position={position}>
      <mesh
        ref={ref}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(false);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          onHover(true);
        }}
      >
        <sphereGeometry args={[0.17, 32, 32]} />
        <meshStandardMaterial
          color={data.color}
          emissive={data.color}
          emissiveIntensity={active ? 1.4 : 0.5}
          roughness={0.25}
          metalness={0.2}
        />
      </mesh>
      <Html center distanceFactor={9} position={[0, 0.36, 0]} zIndexRange={[20, 0]}>
        <a
          href={data.href}
          onMouseEnter={() => onHover(false)}
          className={`block whitespace-nowrap rounded-full px-3 py-1 font-body text-[11px] font-semibold transition-all duration-200 ${
            active ? "bg-gold text-forest-dark scale-110" : "bg-cream/90 text-forest"
          }`}
          style={{ boxShadow: "0 2px 12px hsl(150 50% 6% / 0.3)" }}
        >
          {data.name}
        </a>
      </Html>
    </group>
  );
}

function Orbits({
  modalities,
  active,
  setActive,
}: {
  modalities: Modality[];
  active: number | null;
  setActive: (i: number | null) => void;
}) {
  const group = useRef<THREE.Group>(null!);
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.08;
  });

  const positions = useMemo<[number, number, number][]>(
    () =>
      modalities.map((_, i) => {
        const a = (i / modalities.length) * Math.PI * 2;
        return [
          Math.cos(a) * ORBIT_RADIUS,
          Math.sin(i * 1.7) * 0.75,
          Math.sin(a) * ORBIT_RADIUS,
        ];
      }),
    [modalities],
  );

  return (
    <group ref={group}>
      {modalities.map((m, i) => (
        <Orb
          key={m.name}
          data={m}
          position={positions[i]}
          active={active === i}
          onHover={(leaving) => setActive(leaving ? null : i)}
        />
      ))}
    </group>
  );
}

export default function ModalitiesBlob({ modalities }: { modalities: Modality[] }) {
  const [active, setActive] = useState<number | null>(null);
  const color = active != null ? modalities[active].color : FOREST;

  return (
    <Canvas
      camera={{ position: [0, 0, 7.8], fov: 42 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true }}
      style={{ touchAction: "pan-y" }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 5]} intensity={1.1} />
      <pointLight position={[-5, -3, -4]} intensity={0.9} color="#C9A961" />
      <Blob color={color} />
      <Orbits modalities={modalities} active={active} setActive={setActive} />
    </Canvas>
  );
}
