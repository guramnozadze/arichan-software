"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from "react";
import * as THREE from "three";

type ProgressRef = RefObject<number>;

function buildMonogramGeometry() {
  // Bold condensed "A" drawn as a flat shape, then extruded and chiseled.
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.lineTo(0.36, 1);
  shape.lineTo(0.64, 1);
  shape.lineTo(1, 0);
  shape.lineTo(0.78, 0);
  shape.lineTo(0.665, 0.3);
  shape.lineTo(0.335, 0.3);
  shape.lineTo(0.22, 0);
  shape.closePath();

  const counter = new THREE.Path();
  counter.moveTo(0.5, 0.82);
  counter.lineTo(0.585, 0.44);
  counter.lineTo(0.415, 0.44);
  counter.closePath();
  shape.holes.push(counter);

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 0.34,
    bevelEnabled: true,
    bevelThickness: 0.045,
    bevelSize: 0.03,
    bevelSegments: 5,
    curveSegments: 8,
  });
  geometry.center();
  return geometry;
}

function Monogram({ progress }: { progress: ProgressRef }) {
  const group = useRef<THREE.Group>(null);
  const geometry = useMemo(() => buildMonogramGeometry(), []);
  const viewport = useThree((state) => state.viewport);
  // The monogram floats on the left so it never covers the headline;
  // on narrow screens it rises above the type where the dark metal stays visible.
  const isNarrow = viewport.width < viewport.height;
  const scale = isNarrow
    ? viewport.width * 0.5
    : Math.min(1.9, viewport.width * 0.3);
  const xOffset = -viewport.width * (isNarrow ? 0.2 : 0.26);
  const yOffset = isNarrow ? viewport.height * 0.2 : 0;

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const p = progress.current ?? 0;
    // Full 360° orbit across the hero scroll, damped for a buttery scrub.
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, p * Math.PI * 2, 5, delta);
    g.rotation.x = THREE.MathUtils.damp(
      g.rotation.x,
      Math.sin(p * Math.PI) * 0.16,
      5,
      delta,
    );
    g.rotation.z = THREE.MathUtils.damp(
      g.rotation.z,
      state.pointer.x * 0.05,
      4,
      delta,
    );
    g.position.y = yOffset + Math.sin(state.clock.elapsedTime * 0.8) * 0.05;
  });

  return (
    <group ref={group} position-x={xOffset}>
      <mesh geometry={geometry} scale={scale}>
        <meshPhysicalMaterial
          color="#15121c"
          metalness={0.9}
          roughness={0.24}
          clearcoat={0.8}
          clearcoatRoughness={0.3}
          envMapIntensity={1.4}
        />
      </mesh>
    </group>
  );
}

// Generated at module scope: render functions must stay pure (react-hooks/purity).
const DUST_POSITIONS = (() => {
  const arr = new Float32Array(350 * 3);
  for (let i = 0; i < arr.length; i += 3) {
    arr[i] = (Math.random() - 0.5) * 9;
    arr[i + 1] = (Math.random() - 0.5) * 5;
    arr[i + 2] = (Math.random() - 0.5) * 4;
  }
  return arr;
})();

function Dust() {
  const points = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[DUST_POSITIONS, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#be7cff"
        transparent
        opacity={0.45}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export default function MonogramCanvas({
  progress,
  className,
}: {
  progress: ProgressRef;
  className?: string;
}) {
  const wrapper = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = wrapper.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) =>
      setInView(entry.isIntersecting),
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapper} className={className} aria-hidden>
      <Canvas
        dpr={[1, 2]}
        frameloop={inView ? "always" : "never"}
        camera={{ position: [0, 0, 5.2], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.25} />
        <pointLight position={[0.5, 0.6, 4]} intensity={5} color="#9d7bd8" />
        <spotLight
          position={[-6, 3, -3]}
          intensity={30}
          color="#8b30e0"
          angle={0.5}
          penumbra={1}
        />
        <spotLight
          position={[6, -2, -3]}
          intensity={26}
          color="#be7cff"
          angle={0.5}
          penumbra={1}
        />
        <Monogram progress={progress} />
        <Dust />
        <Environment resolution={256} frames={1}>
          <Lightformer
            intensity={5}
            color="#8b30e0"
            position={[-4, 1, 2]}
            rotation-y={Math.PI / 2}
            scale={[9, 2, 1]}
          />
          <Lightformer
            intensity={4}
            color="#be7cff"
            position={[4, -0.5, 1]}
            rotation-y={-Math.PI / 2}
            scale={[9, 2, 1]}
          />
          <Lightformer
            intensity={1.6}
            color="#f1ead8"
            position={[0, 4, 2]}
            rotation-x={-Math.PI / 2}
            scale={[5, 3, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
}
