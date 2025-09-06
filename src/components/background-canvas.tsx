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

    const polygons: Polygon[] = [];
    const polygonCount = isMobile ? 8 : 15;
    const pointsPerPolygon = 6;
    const baseRadius = 80;
    const maxRadiusVariation = 40;
    const maxSpeed = 0.2;
    const connectionDistance = isMobile ? 180 : 250;
    const pulseSpeed = 0.004;
    
    let animationFrameId: number;

    class Polygon {
      center: { x: number; y: number };
      radius: number;
      pointCount: number;
      points: { angle: number; radiusOffset: number }[];
      vx: number;
      vy: number;
      angleOffset: number;
      angularVelocity: number;
      pulsePhase: number;
      pulseAmount: number;

      constructor(centerX: number, centerY: number, radius: number, pointCount: number) {
        this.center = { x: centerX, y: centerY };
        this.radius = radius;
        this.pointCount = pointCount;
        this.points = [];
        this.vx = (Math.random() - 0.5) * maxSpeed;
        this.vy = (Math.random() - 0.5) * maxSpeed;
        this.angleOffset = Math.random() * 2 * Math.PI;
        this.angularVelocity = (Math.random() - 0.5) * 0.002;
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.pulseAmount = 5 + Math.random() * 15;

        for (let i = 0; i < pointCount; i++) {
          const angle = (i / pointCount) * 2 * Math.PI;
          this.points.push({
            angle: angle,
            radiusOffset: (Math.random() - 0.5) * 20,
          });
        }
      }

      update() {
        this.center.x += this.vx;
        this.center.y += this.vy;

        const padding = this.radius + 60;
        if (this.center.x < -padding) this.center.x = width + padding;
        if (this.center.x > width + padding) this.center.x = -padding;
        if (this.center.y < -padding) this.center.y = height + padding;
        if (this.center.y > height + padding) this.center.y = -padding;

        this.angleOffset += this.angularVelocity;
        this.pulsePhase = (this.pulsePhase + pulseSpeed) % (Math.PI * 2);
      }

      getPoints() {
        const currentPoints: { x: number; y: number }[] = [];
        const pulseEffect = Math.sin(this.pulsePhase) * this.pulseAmount;

        for (let i = 0; i < this.pointCount; i++) {
          const p = this.points[i];
          const angle = p.angle + this.angleOffset;
          const r = this.radius + p.radiusOffset + pulseEffect;
          const x = this.center.x + r * Math.cos(angle);
          const y = this.center.y + r * Math.sin(angle);
          currentPoints.push({ x, y });
        }
        return currentPoints;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.4)';
        ctx.shadowBlur = 10;
        
        const points = this.getPoints();

        ctx.beginPath();
        points.forEach((point, i) => {
          if (i === 0) ctx.moveTo(point.x, point.y);
          else ctx.lineTo(point.x, point.y);
        });
        ctx.closePath();
        ctx.stroke();

        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.shadowColor = 'rgba(255, 255, 255, 0.7)';
        ctx.shadowBlur = 15;
        points.forEach(point => {
          ctx.beginPath();
          ctx.arc(point.x, point.y, 2, 0, 2 * Math.PI);
          ctx.fill();
        });
        ctx.shadowBlur = 0;
      }
    }

    const init = () => {
      polygons.length = 0;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      for (let i = 0; i < polygonCount; i++) {
        const cx = Math.random() * width;
        const cy = Math.random() * height;
        const radius = baseRadius + Math.random() * maxRadiusVariation;
        polygons.push(new Polygon(cx, cy, radius, pointsPerPolygon));
      }
    };
    
    init();

    const drawConnections = (ctx: CanvasRenderingContext2D) => {
      ctx.lineWidth = 0.5;
      ctx.shadowBlur = 5;
      ctx.shadowColor = 'rgba(255, 255, 255, 0.2)';

      const allPoints = polygons.flatMap(poly => poly.getPoints());

      for (let i = 0; i < allPoints.length; i++) {
        for (let j = i + 1; j < allPoints.length; j++) {
          const p1 = allPoints[i];
          const p2 = allPoints[j];
          const distance = Math.hypot(p2.x - p1.x, p2.y - p1.y);

          if (distance < connectionDistance) {
            const opacity = 0.25 * (1 - distance / connectionDistance);
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      polygons.forEach(poly => {
        poly.update();
        poly.draw(ctx);
      });
      drawConnections(ctx);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener('resize', init);

    return () => {
      window.removeEventListener('resize', init);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile]);

  return <canvas ref={canvasRef} id="backgroundCanvas" className="fixed top-0 left-0 -z-10 bg-black" />;
}
