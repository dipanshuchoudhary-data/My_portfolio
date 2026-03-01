import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial, OrbitControls, Sphere, Stars } from "@react-three/drei";

function Orb({ position, color }: { position: [number, number, number]; color: string }) {
  return (
    <Float speed={2} rotationIntensity={1.2} floatIntensity={2.2}>
      <Sphere args={[0.75, 64, 64]} position={position}>
        <MeshDistortMaterial color={color} distort={0.45} speed={2.4} roughness={0.05} metalness={0.25} />
      </Sphere>
    </Float>
  );
}

export default function Hero3D() {
  return (
    <Canvas camera={{ position: [0, 0, 7], fov: 55 }} dpr={[1, 2]}>
      <color attach="background" args={["#04030c"]} />
      <fog attach="fog" args={["#04030c", 7, 14]} />
      <ambientLight intensity={0.45} />
      <directionalLight position={[3, 5, 4]} intensity={1.4} />
      <directionalLight position={[-4, -2, -3]} intensity={0.6} color="#00d4ff" />
      <Stars radius={90} depth={55} count={3500} factor={4} saturation={0} fade speed={1} />
      <Orb position={[-2.2, 0.6, 0]} color="#16e0ff" />
      <Orb position={[1.8, -0.9, -0.8]} color="#6d67ff" />
      <Orb position={[0.2, 1.4, -1.2]} color="#15ff9b" />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.8} enablePan={false} />
    </Canvas>
  );
}