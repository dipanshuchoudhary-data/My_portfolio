import { useEffect, useRef } from "react";
import * as THREE from "three";

type ColorBendsProps = {
  className?: string;
  speed?: number;
  rotation?: number;
  colors?: string[];
  parallax?: number;
};

const MAX_COLORS = 6;

const vert = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

const frag = `
#define MAX_COLORS ${MAX_COLORS}
uniform vec2 uCanvas;
uniform float uTime;
uniform float uSpeed;
uniform vec2 uRot;
uniform int uColorCount;
uniform vec3 uColors[MAX_COLORS];
uniform vec2 uPointer;
uniform float uParallax;
varying vec2 vUv;

void main() {
  float t = uTime * uSpeed;
  vec2 p = vUv * 2.0 - 1.0;
  p += uPointer * uParallax * 0.08;
  vec2 rp = vec2(p.x * uRot.x - p.y * uRot.y, p.x * uRot.y + p.y * uRot.x);
  vec2 q = vec2(rp.x * (uCanvas.x / uCanvas.y), rp.y);
  q /= 0.45 + 0.2 * dot(q, q);
  q += 0.15 * cos(t) - 7.56;

  vec3 sumCol = vec3(0.0);
  for (int i = 0; i < MAX_COLORS; ++i) {
    if (i >= uColorCount) break;
    vec2 s = q - float(i) * 0.01;
    vec2 r = sin(1.5 * (s.yx * 1.1) + 2.0 * cos(s * 1.1));
    float m = length(r + sin(4.0 * r.y - 2.8 * t + float(i)) / 4.0);
    float w = 1.0 - exp(-6.0 / exp(6.0 * m));
    sumCol += uColors[i] * w;
  }

  vec3 col = clamp(sumCol, 0.0, 1.0);
  float alpha = max(max(col.r, col.g), col.b) * 0.65;
  gl_FragColor = vec4(col, alpha);
}
`;

export default function ColorBends({
  className = "",
  speed = 0.22,
  rotation = 28,
  colors = ["#3dd9ff", "#6e7cff", "#00ff99", "#ff9d5c"],
  parallax = 0.6
}: ColorBendsProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const pointerTargetRef = useRef(new THREE.Vector2(0, 0));
  const pointerRef = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geometry = new THREE.PlaneGeometry(2, 2);
    const colorUniforms = Array.from({ length: MAX_COLORS }, () => new THREE.Vector3(0, 0, 0));

    const material = new THREE.ShaderMaterial({
      vertexShader: vert,
      fragmentShader: frag,
      transparent: true,
      uniforms: {
        uCanvas: { value: new THREE.Vector2(1, 1) },
        uTime: { value: 0 },
        uSpeed: { value: speed },
        uRot: { value: new THREE.Vector2(1, 0) },
        uColorCount: { value: 0 },
        uColors: { value: colorUniforms },
        uPointer: { value: new THREE.Vector2(0, 0) },
        uParallax: { value: parallax }
      }
    });

    const hexToVec3 = (hex: string) => {
      const parsed = new THREE.Color(hex);
      return new THREE.Vector3(parsed.r, parsed.g, parsed.b);
    };
    const prepared = colors.slice(0, MAX_COLORS).map(hexToVec3);
    prepared.forEach((value, idx) => colorUniforms[idx].copy(value));
    material.uniforms.uColorCount.value = prepared.length;

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    host.appendChild(renderer.domElement);

    const resize = () => {
      const w = Math.max(host.clientWidth, 1);
      const h = Math.max(host.clientHeight, 1);
      renderer.setSize(w, h, false);
      material.uniforms.uCanvas.value.set(w, h);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    const radians = (rotation * Math.PI) / 180;
    material.uniforms.uRot.value.set(Math.cos(radians), Math.sin(radians));

    const onPointer = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
      pointerTargetRef.current.set(x, y);
    };
    host.addEventListener("pointermove", onPointer);

    let raf = 0;
    const clock = new THREE.Clock();
    const tick = () => {
      const elapsed = clock.getElapsedTime();
      material.uniforms.uTime.value = elapsed;
      pointerRef.current.lerp(pointerTargetRef.current, 0.06);
      material.uniforms.uPointer.value.copy(pointerRef.current);
      renderer.render(scene, camera);
      raf = window.requestAnimationFrame(tick);
    };
    raf = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(raf);
      host.removeEventListener("pointermove", onPointer);
      ro.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement === host) {
        host.removeChild(renderer.domElement);
      }
    };
  }, [speed, rotation, colors, parallax]);

  return <div ref={hostRef} className={`color-bends ${className}`} />;
}
