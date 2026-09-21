"use client";

import { useSyncExternalStore } from "react";
import { getQualityConfig, qualityForWidth, type QualityConfig } from "@/lib/quality";

const desktop = getQualityConfig();

function tierOf(width: number) {
  if (width < 768) return "mobile";
  if (width < 1200) return "tablet";
  return "desktop";
}

let cachedTier = "";
let cached: QualityConfig = desktop;

function snapshot() {
  const tier = tierOf(window.innerWidth);
  if (tier !== cachedTier) {
    cachedTier = tier;
    cached = qualityForWidth(window.innerWidth);
  }
  return cached;
}

function subscribe(cb: () => void) {
  const queries = ["(max-width: 767px)", "(max-width: 1199px)"].map((query) =>
    window.matchMedia(query),
  );
  queries.forEach((query) => query.addEventListener("change", cb));
  window.addEventListener("resize", cb);
  return () => {
    queries.forEach((query) => query.removeEventListener("change", cb));
    window.removeEventListener("resize", cb);
  };
}

export function useQuality() {
  return useSyncExternalStore(subscribe, snapshot, () => desktop);
}
