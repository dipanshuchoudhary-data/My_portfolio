"use client";

// Single visual configuration — was a 3-tier system, but the auto-detection
// kept misclassifying mid-range machines and either tanked the look or the
// frame rate. The numbers below are tuned so the scene looks rich on a fast
// GPU and still runs on integrated Intel/AMD chips, paired with the runtime
// optimisations elsewhere (skip galaxy physics when invisible, pause render
// on hidden tabs, hard DPR cap).

export interface QualityConfig {
  particleCount: number;
  starCount1: number;
  starCount2: number;
  sphereSegments: number;
  atmosphereSegments: number;
  orbitRingPoints: number;
  dpr: [number, number] | number;
  postProcessing: boolean;
  mipmapBlur: boolean;
  bloomIntensity: number;
  showClouds: boolean;
  showCorona: boolean;
  mouseInteraction: "full" | "reduced" | "off";
  customCursor: "full" | "dot" | "off";
}

const DESKTOP: QualityConfig = {
  particleCount: 18000,
  starCount1: 5000,
  starCount2: 2000,
  sphereSegments: 32,
  atmosphereSegments: 24,
  orbitRingPoints: 80,
  dpr: [1, 1.25],
  postProcessing: true,
  mipmapBlur: false,
  bloomIntensity: 0.45,
  showClouds: true,
  showCorona: true,
  mouseInteraction: "full",
  customCursor: "full",
};

const TABLET: QualityConfig = {
  particleCount: 8000,
  starCount1: 2200,
  starCount2: 700,
  sphereSegments: 24,
  atmosphereSegments: 16,
  orbitRingPoints: 48,
  dpr: [1, 1.1],
  postProcessing: false,
  mipmapBlur: false,
  bloomIntensity: 0.3,
  showClouds: true,
  showCorona: false,
  mouseInteraction: "reduced",
  customCursor: "dot",
};

const MOBILE: QualityConfig = {
  particleCount: 2800,
  starCount1: 900,
  starCount2: 280,
  sphereSegments: 16,
  atmosphereSegments: 12,
  orbitRingPoints: 32,
  dpr: 1,
  postProcessing: false,
  mipmapBlur: false,
  bloomIntensity: 0,
  showClouds: false,
  showCorona: false,
  mouseInteraction: "off",
  customCursor: "off",
};

export function qualityForWidth(width: number): QualityConfig {
  if (width < 768) return MOBILE;
  if (width < 1200) return TABLET;
  return DESKTOP;
}

export function getQualityConfig(): QualityConfig {
  return DESKTOP;
}
