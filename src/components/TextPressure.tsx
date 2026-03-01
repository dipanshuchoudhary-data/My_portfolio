import { useEffect, useRef, useState } from "react";

type TextPressureProps = {
  text: string;
  className?: string;
};

type Point = { x: number; y: number };

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export default function TextPressure({ text, className = "" }: TextPressureProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [pointer, setPointer] = useState<Point>({ x: 0.5, y: 0.5 });
  const [active, setActive] = useState(false);
  const letters = text.split("");

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      setPointer({ x: clamp(x, 0, 1), y: clamp(y, 0, 1) });
      setActive(true);
    };

    const handleLeave = () => {
      setActive(false);
      setPointer({ x: 0.5, y: 0.5 });
    };

    container.addEventListener("pointermove", handleMove);
    container.addEventListener("pointerleave", handleLeave);

    return () => {
      container.removeEventListener("pointermove", handleMove);
      container.removeEventListener("pointerleave", handleLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className={`text-pressure ${className}`}>
      {letters.map((letter, idx) => {
        const anchor = idx / Math.max(letters.length - 1, 1);
        const distance = Math.abs(anchor - pointer.x);
        const influence = clamp(1 - distance * 3.3, 0, 1);
        const scaleY = 1 + influence * 0.5;
        const scaleX = 1 - influence * 0.18;
        const lift = influence * -8;
        const letterSpacing = 0.08 - influence * 0.03;
        const glow = active ? influence * 0.9 : 0.3;

        return (
          <span
            key={`${letter}-${idx}`}
            style={{
              transform: `translateY(${lift}px) scaleX(${scaleX}) scaleY(${scaleY})`,
              letterSpacing: `${letterSpacing}em`,
              textShadow: `0 0 ${20 + influence * 20}px rgba(125, 211, 252, ${glow})`
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </span>
        );
      })}
    </div>
  );
}
