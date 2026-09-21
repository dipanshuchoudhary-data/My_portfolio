"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import StarField from "./StarField";
import SolarSystem from "./SolarSystem";
import ScrollCamera from "./ScrollCamera";
import { useQuality } from "@/hooks/useQuality";

function SceneReadySignal() {
  const fired = useRef(false);
  useFrame(() => {
    if (!fired.current) {
      fired.current = true;
      window.dispatchEvent(new Event("scene-ready"));
    }
  });
  return null;
}

export default function GalaxyCanvas() {
  const q = useQuality();
  const [frameloop, setFrameloop] = useState<"always" | "never">("always");
  const inView = useRef(true);

  useEffect(() => {
    const zone = document.querySelector(".project-journey");
    const sync = () => {
      const hidden = document.hidden;
      const visible = inView.current && !hidden;
      setFrameloop(visible ? "always" : "never");
    };
    const onVis = () => sync();
    document.addEventListener("visibilitychange", onVis);

    let observer: IntersectionObserver | null = null;
    if (zone) {
      observer = new IntersectionObserver(
        ([entry]) => {
          inView.current = entry.isIntersecting;
          sync();
        },
        { rootMargin: "20% 0px" },
      );
      observer.observe(zone);
    }

    return () => {
      document.removeEventListener("visibilitychange", onVis);
      observer?.disconnect();
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-0"
      aria-hidden="true"
      role="presentation"
      style={
        !q.postProcessing
          ? { boxShadow: "inset 0 0 200px rgba(0,0,0,0.5)" }
          : undefined
      }
    >
      <Canvas
        camera={{ position: [0, 3, 16], fov: 75, near: 0.1, far: 1000 }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={q.dpr}
        frameloop={frameloop}
        style={{ background: "#14110e" }}
      >
        <Suspense fallback={null}>
          <SceneReadySignal />
          <ScrollCamera />
          <StarField />
          <SolarSystem />
          {q.postProcessing && (
            <EffectComposer>
              <Bloom
                intensity={q.bloomIntensity}
                luminanceThreshold={0.8}
                luminanceSmoothing={0.7}
                mipmapBlur={q.mipmapBlur}
              />
              <Vignette offset={0.25} darkness={0.5} />
            </EffectComposer>
          )}
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
