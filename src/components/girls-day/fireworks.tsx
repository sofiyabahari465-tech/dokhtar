"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  life: number;
  maxLife: number;
  size: number;
}

interface Firework {
  x: number;
  y: number;
  exploded: boolean;
  particles: Particle[];
  trail: { x: number; y: number }[];
  color: string;
}

const COLORS = [
  "#ff6b9d",
  "#ff8fb1",
  "#c44569",
  "#f8b500",
  "#ffd700",
  "#ff8c69",
  "#ffb3c6",
  "#ff4d8d",
];

export function Fireworks() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const fireworks: Firework[] = [];
    let lastLaunch = 0;
    const launchInterval = 1200 + Math.random() * 1500;

    const launch = () => {
      const x = Math.random() * canvas.width;
      const targetY = canvas.height * (0.15 + Math.random() * 0.35);
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      fireworks.push({
        x,
        y: canvas.height,
        exploded: false,
        particles: [],
        trail: [],
        color,
      });
      // store targetY on the firework via a custom approach
      (fireworks[fireworks.length - 1] as Firework & { targetY: number }).targetY = targetY;
    };

    const explode = (fw: Firework & { targetY?: number }) => {
      const particleCount = 50 + Math.floor(Math.random() * 30);
      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount;
        const speed = 2 + Math.random() * 4;
        fw.particles.push({
          x: fw.x,
          y: fw.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: fw.color,
          life: 0,
          maxLife: 60 + Math.random() * 30,
          size: 2 + Math.random() * 2,
        });
      }
      fw.exploded = true;
    };

    let frame = 0;
    let animationId: number;

    const animate = (timestamp: number) => {
      frame++;
      // semi-transparent fade for trails
      ctx.fillStyle = "rgba(20, 8, 18, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // launch new fireworks
      if (timestamp - lastLaunch > launchInterval) {
        launch();
        lastLaunch = timestamp;
      }

      for (let i = fireworks.length - 1; i >= 0; i--) {
        const fw = fireworks[i] as Firework & { targetY?: number };
        if (!fw.exploded) {
          // rising rocket
          fw.y -= 6;
          fw.trail.push({ x: fw.x, y: fw.y });
          if (fw.trail.length > 8) fw.trail.shift();

          // draw trail
          ctx.fillStyle = fw.color;
          for (let t = 0; t < fw.trail.length; t++) {
            const point = fw.trail[t];
            const alpha = (t / fw.trail.length) * 0.8;
            ctx.globalAlpha = alpha;
            ctx.beginPath();
            ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.globalAlpha = 1;

          // head glow
          ctx.shadowBlur = 12;
          ctx.shadowColor = fw.color;
          ctx.beginPath();
          ctx.arc(fw.x, fw.y, 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;

          if (fw.targetY !== undefined && fw.y <= fw.targetY) {
            explode(fw);
          }
        } else {
          // draw particles
          for (let p = fw.particles.length - 1; p >= 0; p--) {
            const particle = fw.particles[p];
            particle.life++;
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vy += 0.05; // gravity
            particle.vx *= 0.99;
            particle.vy *= 0.99;

            const alpha = 1 - particle.life / particle.maxLife;
            if (alpha <= 0) {
              fw.particles.splice(p, 1);
              continue;
            }

            ctx.globalAlpha = alpha;
            ctx.fillStyle = particle.color;
            ctx.shadowBlur = 10;
            ctx.shadowColor = particle.color;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.globalAlpha = 1;
          ctx.shadowBlur = 0;

          if (fw.particles.length === 0) {
            fireworks.splice(i, 1);
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[2]"
      aria-hidden="true"
    />
  );
}
