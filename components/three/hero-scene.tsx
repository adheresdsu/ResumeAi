"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

const ACCENT_VIOLET = "#7c6cf0";
const ACCENT_CYAN = "#5fd4e0";

type CardConfig = {
  position: [number, number, number];
  rotation: [number, number, number];
  size: [number, number];
  accent: string;
};

const CARDS: CardConfig[] = [
  {
    position: [-0.95, 0.3, 0],
    rotation: [0.1, 0.35, -0.06],
    size: [1.3, 1.7],
    accent: ACCENT_VIOLET,
  },
  {
    position: [0.3, -0.2, -0.5],
    rotation: [-0.08, -0.25, 0.04],
    size: [1.3, 1.7],
    accent: ACCENT_CYAN,
  },
  {
    position: [1.15, 0.45, -1],
    rotation: [0.06, 0.5, 0.08],
    size: [1.1, 1.5],
    accent: ACCENT_VIOLET,
  },
  {
    position: [-0.45, -0.65, -1.3],
    rotation: [-0.05, -0.4, -0.05],
    size: [1.1, 1.5],
    accent: ACCENT_CYAN,
  },
];

const NODES: [number, number, number][] = [
  [-0.2, 0.65, 0.3],
  [0.7, -0.45, 0.1],
  [-1.1, -0.45, -0.3],
  [0.65, 0.8, -0.6],
];

const CONNECTIONS: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 0],
];

/** Draws a tiny procedural "resume" onto a canvas texture — no external assets. */
function useResumeTexture(accent: string) {
  return useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 340;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.fillStyle = "#eef0f6";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = accent;
    ctx.fillRect(0, 0, canvas.width, 14);

    ctx.fillStyle = "rgba(20, 22, 40, 0.75)";
    ctx.fillRect(24, 36, 96, 12);
    ctx.fillStyle = "rgba(20, 22, 40, 0.35)";
    ctx.fillRect(24, 56, 60, 8);

    const lineY = [96, 116, 136, 168, 188, 208, 240, 260, 280];
    lineY.forEach((y, i) => {
      ctx.fillStyle = i % 3 === 0 ? accent + "55" : "rgba(20, 22, 40, 0.18)";
      const width = 130 + ((i * 37) % 70);
      ctx.fillRect(24, y, width, 7);
    });

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, [accent]);
}

function ResumeCard({ config }: { config: CardConfig }) {
  const texture = useResumeTexture(config.accent);

  return (
    <group position={config.position} rotation={config.rotation}>
      <RoundedBox
        args={[config.size[0], config.size[1], 0.05]}
        radius={0.08}
        smoothness={4}
      >
        <meshStandardMaterial
          map={texture ?? undefined}
          color={texture ? "#ffffff" : config.accent}
          roughness={0.35}
          metalness={0.1}
        />
      </RoundedBox>
    </group>
  );
}

function GlowNodes() {
  const pulseRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!pulseRef.current) return;
    const t = clock.getElapsedTime();
    pulseRef.current.children.forEach((child, i) => {
      const scale = 1 + Math.sin(t * 1.4 + i) * 0.18;
      child.scale.setScalar(scale);
    });
  });

  return (
    <>
      <group ref={pulseRef}>
        {NODES.map((pos, i) => (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[0.05, 12, 12]} />
            <meshBasicMaterial color={i % 2 === 0 ? ACCENT_VIOLET : ACCENT_CYAN} />
          </mesh>
        ))}
      </group>
      {CONNECTIONS.map(([a, b], i) => (
        <Line
          key={i}
          points={[NODES[a], NODES[b]]}
          color={ACCENT_VIOLET}
          transparent
          opacity={0.28}
          lineWidth={1}
        />
      ))}
    </>
  );
}

function Scene({ reduceMotion }: { reduceMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const target = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    if (!reduceMotion) {
      groupRef.current.rotation.y += delta * 0.06;
      target.current.x = state.pointer.y * 0.12;
      target.current.y = state.pointer.x * 0.18;
    }

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      target.current.x,
      reduceMotion ? 1 : 0.04,
    );
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      target.current.y * 0.3,
      reduceMotion ? 1 : 0.04,
    );
  });

  return (
    <group ref={groupRef}>
      {CARDS.map((card, i) => (
        <ResumeCard key={i} config={card} />
      ))}
      {!reduceMotion && <GlowNodes />}
    </group>
  );
}

export function HeroScene({
  reduceMotion = false,
  paused = false,
}: {
  reduceMotion?: boolean;
  paused?: boolean;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.5], fov: 38 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      frameloop={paused ? "never" : "always"}
    >
      <ambientLight intensity={0.65} />
      <directionalLight position={[3, 3, 4]} intensity={0.9} color={ACCENT_VIOLET} />
      <directionalLight position={[-3, -2, -2]} intensity={0.4} color={ACCENT_CYAN} />
      <Scene reduceMotion={reduceMotion} />
    </Canvas>
  );
}

export default HeroScene;
