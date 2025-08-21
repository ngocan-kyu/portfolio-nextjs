"use client";

import React, {
  useEffect,
  useRef,
  useMemo,
  useCallback,
  memo,
  useLayoutEffect,
} from "react";
import { Renderer, Camera, Geometry, Program, Mesh } from "ogl";

// Types
interface ParticleProps {
  particleCount?: number;
  particleSpread?: number;
  speed?: number;
  particleColors?: string[];
  moveParticlesOnHover?: boolean;
  particleHoverFactor?: number;
  alphaParticles?: boolean;
  particleBaseSize?: number;
  sizeRandomness?: number;
  cameraDistance?: number;
  disableRotation?: boolean;
  className?: string;
}

// Defaults
const DEFAULT_COLORS: string[] = ["#ffffff", "#ffffff", "#ffffff"];
const DEFAULT_COUNT = 200;
const DEFAULT_SPREAD = 10;
const DEFAULT_SPEED = 0.1;
const DEFAULT_BASE_SIZE = 100;
const DEFAULT_SIZE_RANDOMNESS = 1;
const DEFAULT_CAMERA_DISTANCE = 20;

// GLSL
const VERTEX_SHADER = /* glsl */ `
  attribute vec3 position;
  attribute vec4 random;
  attribute vec3 color;

  uniform mat4 modelMatrix;
  uniform mat4 viewMatrix;
  uniform mat4 projectionMatrix;
  uniform float uTime;
  uniform float uSpread;
  uniform float uBaseSize;
  uniform float uSizeRandomness;

  varying vec4 vRandom;
  varying vec3 vColor;

  void main() {
    vRandom = random;
    vColor = color;

    vec3 pos = position * uSpread;
    pos.z *= 10.0;

    vec4 mPos = modelMatrix * vec4(pos, 1.0);
    float t = uTime;

    // Gentle organic drift per particle using random seeds
    mPos.x += sin(t * random.z + 6.2831853 * random.w) * mix(0.1, 1.5, random.x);
    mPos.y += sin(t * random.y + 6.2831853 * random.x) * mix(0.1, 1.5, random.w);
    mPos.z += sin(t * random.w + 6.2831853 * random.y) * mix(0.1, 1.5, random.z);

    vec4 mvPos = viewMatrix * mPos;
    // size falls off with distance; add some per-point variance
    gl_PointSize = (uBaseSize * (1.0 + uSizeRandomness * (random.x - 0.5))) / max(0.0001, length(mvPos.xyz));
    gl_Position = projectionMatrix * mvPos;
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform float uAlphaParticles; // 0: hard circle, 1: soft alpha
  varying vec4 vRandom;
  varying vec3 vColor;

  void main() {
    vec2 uv = gl_PointCoord.xy;
    float d = length(uv - vec2(0.5));

    // Soft circle edge for nicer blending
    float circle = smoothstep(0.5, 0.4, d);
    if (uAlphaParticles < 0.5) {
      // Hard circle (discard outside)
      if (circle <= 0.0) discard;
      gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.2831853), 1.0);
    } else {
      // Soft alpha falloff
      if (circle <= 0.0) discard;
      float a = circle * 0.8;
      gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.2831853), a);
    }
  }
`;

// Utils
const hexToRgb = (hex: string): [number, number, number] => {
  let h = hex.replace(/^#/, "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  const int = parseInt(h, 16);
  return [((int >> 16) & 255) / 255, ((int >> 8) & 255) / 255, (int & 255) / 255];
};

// Memoized component to prevent unnecessary React re-renders
const Particles = memo(function Particles({
  particleCount = DEFAULT_COUNT,
  particleSpread = DEFAULT_SPREAD,
  speed = DEFAULT_SPEED,
  particleColors = DEFAULT_COLORS,
  moveParticlesOnHover = false,
  particleHoverFactor = 1,
  alphaParticles = false,
  particleBaseSize = DEFAULT_BASE_SIZE,
  sizeRandomness = DEFAULT_SIZE_RANDOMNESS,
  cameraDistance = DEFAULT_CAMERA_DISTANCE,
  disableRotation = false,
  className = "",
}: ParticleProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // OGL refs
  const rendererRef = useRef<Renderer | null>(null);
  const cameraRef = useRef<Camera | null>(null);
  const meshRef = useRef<Mesh | null>(null);

  // Runtime refs
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  // Live props in refs for stable animation loop (no re-binding)
  const speedRef = useRef(speed);
  const hoverRef = useRef(moveParticlesOnHover);
  const hoverFactorRef = useRef(particleHoverFactor);
  const rotationDisabledRef = useRef(disableRotation);

  useEffect(() => { speedRef.current = speed; }, [speed]);
  useEffect(() => { hoverRef.current = moveParticlesOnHover; }, [moveParticlesOnHover]);
  useEffect(() => { hoverFactorRef.current = particleHoverFactor; }, [particleHoverFactor]);
  useEffect(() => { rotationDisabledRef.current = disableRotation; }, [disableRotation]);

  // Precompute buffers when count/colors change
  const { positions, randoms, colors } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const rnd = new Float32Array(particleCount * 4);
    const col = new Float32Array(particleCount * 3);
    const palette = (particleColors?.length ? particleColors : DEFAULT_COLORS).map(hexToRgb);

    for (let i = 0; i < particleCount; i++) {
      // Random point within unit sphere (radial distribution biased towards center)
      let x: number, y: number, z: number, len: number;
      do {
        x = Math.random() * 2 - 1;
        y = Math.random() * 2 - 1;
        z = Math.random() * 2 - 1;
        len = x * x + y * y + z * z;
      } while (len > 1 || len === 0);
      const r = Math.cbrt(Math.random());
      pos.set([x * r, y * r, z * r], i * 3);

      rnd.set([Math.random(), Math.random(), Math.random(), Math.random()], i * 4);

      const [cr, cg, cb] = palette[Math.floor(Math.random() * palette.length)];
      col.set([cr, cg, cb], i * 3);
    }
    return { positions: pos, randoms: rnd, colors: col };
  }, [particleCount, particleColors]);

  // Canvas / WebGL setup
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Remove any previous canvas (safety in fast re-mount scenarios)
    while (container.firstChild) container.removeChild(container.firstChild);

    const renderer = new Renderer({ depth: false, alpha: true });
    // Guard: if WebGL context fails
    const gl = renderer.gl;
    if (!gl) {
      console.error("Failed to create WebGL context.");
      return;
    }
    rendererRef.current = renderer;

    // Add canvas
    container.appendChild(gl.canvas);
    gl.clearColor(0, 0, 0, 0);

    // DPR-aware sizing
    const setSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = container.clientWidth || 1;
      const height = container.clientHeight || 1;
      renderer.setSize(width * dpr, height * dpr);
      gl.canvas.style.width = `${width}px`;
      gl.canvas.style.height = `${height}px`;
      const cam = cameraRef.current;
      if (cam) cam.perspective({ aspect: width / height });
    };

    // Camera
    const camera = new Camera(gl, { fov: 15 });
    cameraRef.current = camera;
    camera.position.set(0, 0, cameraDistance);

    // Geometry & Program
    const geometry = new Geometry(gl, {
      position: { size: 3, data: positions },
      random: { size: 4, data: randoms },
      color: { size: 3, data: colors },
    });

    const program = new Program(gl, {
      vertex: VERTEX_SHADER,
      fragment: FRAGMENT_SHADER,
      uniforms: {
        uTime: { value: 0 },
        uSpread: { value: particleSpread },
        uBaseSize: { value: particleBaseSize },
        uSizeRandomness: { value: sizeRandomness },
        uAlphaParticles: { value: alphaParticles ? 1 : 0 },
      },
      transparent: true,
      depthTest: false,
    });

    const mesh = new Mesh(gl, { mode: gl.POINTS, geometry, program });
    meshRef.current = mesh;

    // ResizeObserver for container
    const ro = new ResizeObserver(() => setSize());
    ro.observe(container);
    setSize();

    lastTimeRef.current = performance.now();

    // RAF loop (stable, no deps)
    const tick = (t: number) => {
      const r = rendererRef.current;
      const c = cameraRef.current;
      const m = meshRef.current;
      if (!r || !c || !m) return;

      rafRef.current = requestAnimationFrame(tick);

      const delta = t - lastTimeRef.current;
      lastTimeRef.current = t;

      const time = m.program.uniforms.uTime;
      time.value += delta * speedRef.current * 0.001;

      // Hover offset
      if (hoverRef.current) {
        m.position.x = -mouseRef.current.x * hoverFactorRef.current;
        m.position.y = -mouseRef.current.y * hoverFactorRef.current;
      } else {
        m.position.x = 0;
        m.position.y = 0;
      }

      // Gentle rotation unless disabled
      if (!rotationDisabledRef.current) {
        m.rotation.x = Math.sin(time.value * 0.2) * 0.1;
        m.rotation.y = Math.cos(time.value * 0.5) * 0.15;
        m.rotation.z += 0.01 * speedRef.current;
      }

      r.render({ scene: m, camera: c });
    };
    rafRef.current = requestAnimationFrame(tick);

    // Pointer handling (only when enabled)
    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current.x = nx;
      mouseRef.current.y = ny;
    };
    const enablePointer = () => container.addEventListener("pointermove", onPointerMove, { passive: true });
    const disablePointer = () => container.removeEventListener("pointermove", onPointerMove);

    if (moveParticlesOnHover) enablePointer();

    // Cleanup
    return () => {
      ro.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      disablePointer();

      // Remove canvas safely
      if (container.contains(gl.canvas)) container.removeChild(gl.canvas);

      // Clear refs
      meshRef.current = null;
      cameraRef.current = null;
      rendererRef.current = null;
    };
  }, [
    // Rebuild WebGL graph only when these change
    positions,
    randoms,
    colors,
    particleSpread,
    particleBaseSize,
    sizeRandomness,
    alphaParticles,
    cameraDistance,
    moveParticlesOnHover, // to bind/unbind pointer listener
  ]);

  // If hover setting toggles after mount, attach/detach pointer listener without full rebuild
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current.x = nx;
      mouseRef.current.y = ny;
    };
    if (moveParticlesOnHover) {
      container.addEventListener("pointermove", onPointerMove, { passive: true });
      return () => container.removeEventListener("pointermove", onPointerMove);
    }
  }, [moveParticlesOnHover]);

  return <div ref={containerRef} className={`relative w-full h-full ${className || ""}`} />;
});

export default Particles;
