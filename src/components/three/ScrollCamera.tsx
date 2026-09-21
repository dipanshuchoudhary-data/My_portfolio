"use client";

import { useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { planetPositions } from "./SolarSystem";

function smootherstep(t: number): number {
  t = Math.max(0, Math.min(1, t));
  return t * t * t * (t * (t * 6 - 15) + 10);
}

// Solar system center (sun position)
const SC = { x: 30, y: 0, z: 0 };
const SUN = new THREE.Vector3(SC.x, SC.y, SC.z);
const UP = new THREE.Vector3(0, 1, 0);

// Dynamic offset: positions camera so the sun always stays on the LEFT side of screen
function getPlanetViewOffset(planetPos: THREE.Vector3): THREE.Vector3 {
  const radial = new THREE.Vector3().subVectors(planetPos, SUN).normalize();
  const tangent = new THREE.Vector3().crossVectors(UP, radial).normalize();
  return new THREE.Vector3(
    tangent.x * 4 + radial.x * 2,
    1.5,
    tangent.z * 4 + radial.z * 2,
  );
}

const APPROACH: { pos: [number, number, number]; look: [number, number, number] }[] = [
  { pos: [0, 4, 18], look: [0, 0, 0] },
  { pos: [0, 1.5, 7], look: [0, 0, 0] },
  { pos: [0, 0.2, -2], look: [5, 0, -10] },
  { pos: [SC.x, 28, SC.z + 10], look: [SC.x, 0, SC.z] },
];

const _targetPos = new THREE.Vector3();
const _targetLook = new THREE.Vector3();
const _fromPos = new THREE.Vector3();
const _toPos = new THREE.Vector3();
const _fromLook = new THREE.Vector3();
const _toLook = new THREE.Vector3();

function planetPose(index: number, pos: THREE.Vector3, look: THREE.Vector3) {
  const pp = planetPositions[index];
  if (!pp || pp.lengthSq() < 0.01) {
    pos.set(SC.x, 8, SC.z + 18);
    look.set(SC.x, 0, SC.z);
    return;
  }
  const offset = getPlanetViewOffset(pp);
  pos.set(pp.x + offset.x, pp.y + offset.y, pp.z + offset.z);
  look.copy(pp);
}

function poseAt(index: number, pos: THREE.Vector3, look: THREE.Vector3) {
  const shot = APPROACH[index];
  pos.set(shot.pos[0], shot.pos[1], shot.pos[2]);
  look.set(shot.look[0], shot.look[1], shot.look[2]);
}

// Camera follows the panels on screen, not a stored page fraction.
// A card's planet stays put while that panel covers the viewport, and the
// flight to the next planet happens only in the gap after the card leaves.
function frameFromSections() {
  const stage = document.getElementById("projects");
  const panels: HTMLElement[] = [];
  for (let i = 0; i < planetPositions.length; i++) {
    const el = document.getElementById(`project-${i}`);
    if (el) panels.push(el);
  }
  if (!stage || panels.length === 0) return false;

  const center = window.innerHeight * 0.5;
  const rects = panels.map((el) => el.getBoundingClientRect());

  if (rects[0].top > center) {
    const stageTop = stage.getBoundingClientRect().top;
    const span = Math.max(1, rects[0].top - stageTop);
    const u = Math.max(0, Math.min(1, (center - stageTop) / span));
    if (u < 0.7) {
      const scaled = (u / 0.7) * (APPROACH.length - 1);
      const step = Math.min(APPROACH.length - 2, Math.floor(scaled));
      const local = smootherstep(scaled - step);
      poseAt(step, _fromPos, _fromLook);
      poseAt(step + 1, _toPos, _toLook);
      _targetPos.lerpVectors(_fromPos, _toPos, local);
      _targetLook.lerpVectors(_fromLook, _toLook, local);
    } else {
      const local = smootherstep((u - 0.7) / 0.3);
      poseAt(APPROACH.length - 1, _fromPos, _fromLook);
      planetPose(0, _toPos, _toLook);
      _targetPos.lerpVectors(_fromPos, _toPos, local);
      _targetLook.lerpVectors(_fromLook, _toLook, local);
    }
    return true;
  }

  let index = 0;
  for (let i = 0; i < rects.length; i++) {
    if (rects[i].top <= center) index = i;
  }

  const rect = rects[index];
  const next = rects[index + 1];
  if (!next || rect.bottom >= center) {
    planetPose(index, _targetPos, _targetLook);
    return true;
  }

  const gap = next.top - rect.bottom;
  const local = gap > 1 ? smootherstep(Math.max(0, Math.min(1, (center - rect.bottom) / gap))) : 1;
  planetPose(index, _fromPos, _fromLook);
  planetPose(index + 1, _toPos, _toLook);
  _targetPos.lerpVectors(_fromPos, _toPos, local);
  _targetLook.lerpVectors(_fromLook, _toLook, local);
  return true;
}

export default function ScrollCamera() {
  const { camera } = useThree();
  const currentPos = useRef(new THREE.Vector3(0, 4, 18));
  const currentLook = useRef(new THREE.Vector3(0, 0, 0));
  const ready = useRef(false);

  useFrame(() => {
    if (!frameFromSections()) return;

    if (!ready.current) {
      currentPos.current.copy(_targetPos);
      currentLook.current.copy(_targetLook);
      ready.current = true;
    } else {
      currentPos.current.lerp(_targetPos, 0.28);
      currentLook.current.lerp(_targetLook, 0.28);
    }

    camera.position.copy(currentPos.current);
    camera.lookAt(currentLook.current);
  });

  return null;
}
