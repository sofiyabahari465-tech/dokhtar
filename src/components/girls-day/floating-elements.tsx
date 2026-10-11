"use client";

import { useEffect, useState } from "react";
import { Heart, Flower2, Sparkles } from "lucide-react";

interface FloatingItem {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  type: "heart" | "flower" | "sparkle";
  color: string;
  opacity: number;
}

const COLORS = [
  "#ff6b9d",
  "#ff8fb1",
  "#c44569",
  "#f8b500",
  "#ffd700",
  "#ff8c69",
  "#ffb3c6",
];

const ICONS = {
  heart: Heart,
  flower: Flower2,
  sparkle: Sparkles,
} as const;

export function FloatingElements() {
  const [items, setItems] = useState<FloatingItem[]>([]);

  useEffect(() => {
    const generate = () => {
      const arr: FloatingItem[] = [];
      for (let i = 0; i < 24; i++) {
        const types: FloatingItem["type"][] = ["heart", "flower", "sparkle"];
        arr.push({
          id: i,
          left: Math.random() * 100,
          size: 12 + Math.random() * 24,
          duration: 12 + Math.random() * 14,
          delay: Math.random() * 10,
          drift: (Math.random() - 0.5) * 200,
          type: types[Math.floor(Math.random() * types.length)],
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          opacity: 0.3 + Math.random() * 0.4,
        });
      }
      setItems(arr);
    };
    generate();
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-[1]"
      aria-hidden="true"
    >
      {items.map((item) => {
        const Icon = ICONS[item.type];
        return (
          <div
            key={item.id}
            className="absolute -top-10"
            style={
              {
                left: `${item.left}%`,
                animation: `fall ${item.duration}s linear ${item.delay}s infinite`,
                "--drift": `${item.drift}px`,
              } as React.CSSProperties
            }
          >
            <Icon
              style={{
                width: item.size,
                height: item.size,
                color: item.color,
                opacity: item.opacity,
                filter: `drop-shadow(0 0 8px ${item.color}80)`,
              }}
              fill={item.type === "heart" ? "currentColor" : "none"}
            />
          </div>
        );
      })}
    </div>
  );
}
