import type { PointerEvent as ReactPointerEvent } from "react";
import { useRef, useState } from "react";

type ProfileCard3DProps = {
  name: string;
  title: string;
  subtitle: string;
  avatarUrl: string;
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export default function ProfileCard3D({ name, title, subtitle, avatarUrl }: ProfileCard3DProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    const rx = clamp((0.5 - py) * 16, -8, 8);
    const ry = clamp((px - 0.5) * 20, -10, 10);
    setTilt({ x: rx, y: ry });
  };

  const onLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <div className="profile-shell">
      <div
        ref={cardRef}
        className="profile-card"
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
      >
        <div className="profile-shine" style={{ opacity: 0.22 + Math.abs(tilt.y) / 45 }} />
        <img src={avatarUrl} alt={name} className="profile-avatar" />
        <div className="profile-content">
          <p className="profile-name">{name}</p>
          <p className="profile-title">{title}</p>
          <p className="profile-subtitle">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}
