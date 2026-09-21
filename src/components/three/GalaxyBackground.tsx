"use client";

import dynamic from "next/dynamic";
import CanvasErrorBoundary from "@/components/three/CanvasErrorBoundary";

const GalaxyCanvas = dynamic(
  () => import("@/components/three/GalaxyCanvas"),
  {
    ssr: false,
    loading: () => null,
  }
);

export default function GalaxyBackground() {
  return (
    <CanvasErrorBoundary>
      <GalaxyCanvas />
    </CanvasErrorBoundary>
  );
}
