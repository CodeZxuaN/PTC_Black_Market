"use client";

import { useIsMobile } from '@/hooks/use-mobile';
import React, { useRef, useEffect } from 'react';

export function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const points: Point[] = [];
    const pointCount = isMobile ? 30 : 60;
    const connectionDistance = isMobile ? 120 : 150;
    const maxSpeed = 0.2;

    class Point {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * maxSpeed;
        this.vy = (Math.random() - 0.5) * maxSpeed;
        this.radius = 1.5;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'hsla(182, 100%, 74%, 0.5)';
        ctx.fill();
      }
    }

    const init = () => {
      points.length = 0;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      for (let i = 0; i < pointCount; i++) {
        points.push(new Point());
      }
    };

    init();

    const drawConnections = () => {
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const p1 = points[i];
          const p2 = points[j];
          const distance = Math.hypot(p2.x - p1.x, p2.y - p1.y);

          if (distance < connectionDistance) {
            const opacity = 1 - distance / connectionDistance;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `hsla(182, 100%, 74%, ${opacity * 0.3})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
    };
    
    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      points.forEach(p => {
        p.update();
        // p.draw(); // We don't want to draw the points themselves
      });

      drawConnections();

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener('resize', init);

    return () => {
      window.removeEventListener('resize', init);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile]);

  return <canvas ref={canvasRef} id="backgroundCanvas" className="fixed top-0 left-0 -z-10" />;
}
