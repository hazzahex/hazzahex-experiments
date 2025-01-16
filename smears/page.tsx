/* eslint-disable  @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useRef } from "react";

export default function Smears() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Main render function that initializes and draws the entire artwork
    const render = () => {
      // Make canvas responsive to window size
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Array to store all shapes and color palette
      const shapes: any[] = [];
      const colors = ["#ec4632", "#f19126", "#4ba3be", "#9b49d4"];

      // Helper function to generate random number within a range
      function random(min: number, max: number) {
        return Math.random() * (max - min) + min;
      }

      // Helper function to clamp a value between min and max
      function constrain(value: number, min: number, max: number) {
        return Math.min(Math.max(value, min), max);
      }

      // Perlin noise implementation for organic, smooth randomness
      const noise = (function () {
        // Create permutation table for noise calculation
        const permutation = new Array(256)
          .fill(0)
          .map(() => Math.floor(Math.random() * 256));
        // Double the permutation table to avoid overflow
        const p = new Array(512).fill(0).map((_, i) => permutation[i % 256]);

        // Smoothing function for noise interpolation
        function fade(t: number) {
          return t * t * t * (t * (t * 6 - 15) + 10);
        }

        // Linear interpolation between two values
        function lerp(t: number, a: number, b: number) {
          return a + t * (b - a);
        }

        // Generate gradient vector for noise calculation
        function grad(hash: number, x: number, y: number) {
          const h = hash & 15;
          const u = h < 8 ? x : y;
          const v = h < 4 ? y : h === 12 || h === 14 ? x : 0;
          return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
        }

        // Return the noise function that generates 2D Perlin noise
        return function (x: number, y: number) {
          const X = Math.floor(x) & 255;
          const Y = Math.floor(y) & 255;

          // Get relative coordinates within grid cell
          x -= Math.floor(x);
          y -= Math.floor(y);

          // Calculate fade curves
          const u = fade(x);
          const v = fade(y);

          // Hash coordinates of the 4 corners of the grid cell
          const A = p[X] + Y;
          const B = p[X + 1] + Y;

          // Interpolate between grid point gradients
          return (
            lerp(
              v,
              lerp(u, grad(p[A], x, y), grad(p[B], x - 1, y)),
              lerp(u, grad(p[A + 1], x, y - 1), grad(p[B + 1], x - 1, y - 1))
            ) *
              0.5 +
            0.5
          );
        };
      })();

      // Check if two rectangles collide
      function checkRectCollision(a: any, b: any) {
        return (
          a.x - a.w / 2 < b.x + b.w / 2 &&
          a.x + a.w / 2 > b.x - b.w / 2 &&
          a.y - a.h / 2 < b.y + b.h / 2 &&
          a.y + a.h / 2 > b.y - b.h / 2
        );
      }

      // Check if two circles collide
      function checkCircleCollision(a: any, b: any) {
        const distSq = Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2);
        const radiusSum = a.w / 2 + b.w / 2;
        return distSq < Math.pow(radiusSum, 2);
      }

      // Check if a circle and rectangle collide
      function checkCircleRectCollision(circle: any, rect: any) {
        // Find the closest point on the rectangle to the circle
        const nearestX = constrain(
          circle.x,
          rect.x - rect.w / 2,
          rect.x + rect.w / 2
        );
        const nearestY = constrain(
          circle.y,
          rect.y - rect.h / 2,
          rect.y + rect.h / 2
        );
        // Check if the closest point is within the circle's radius
        const distSq =
          Math.pow(circle.x - nearestX, 2) + Math.pow(circle.y - nearestY, 2);
        return distSq < Math.pow(circle.w / 2, 2);
      }

      // Generic collision detection between any two shapes
      function checkCollision(a: any, b: any) {
        if (a.t === 0 && b.t === 0) return checkRectCollision(a, b);
        if (a.t === 1 && b.t === 1) return checkCircleCollision(a, b);
        return a.t === 0
          ? checkCircleRectCollision(b, a)
          : checkCircleRectCollision(a, b);
      }

      // Draw a curved line using noise for organic movement
      function noiseCurveLine(x: number, y: number) {
        const c = 50; // Number of segments in the curve
        if (!ctx) return;
        ctx.beginPath();
        for (let i = 0; i < c; i++) {
          const scl = 0.001; // Scale of noise
          const str = noise(x * scl, y * scl) * 100; // Strength of noise
          const angle = noise(x * scl, y * scl) * str; // Direction of curve
          ctx.lineTo(x, y);
          // Move point based on noise
          x += Math.cos(angle) * 2;
          y += Math.sin(angle) * 2;
        }
        ctx.stroke();
      }

      // Create melting effect for rectangles
      function meltRect(
        x: number,
        y: number,
        w: number,
        h: number,
        clr: string
      ) {
        if (!ctx || !canvas) return;
        let px = -w / 2;
        let py = -h / 2;
        const step = canvas.width * 0.0003; // Space between drips
        ctx.strokeStyle = clr;

        // Draw vertical drips along top and bottom edges
        while (px < w / 2) {
          noiseCurveLine(x + px, y + h / 2);
          noiseCurveLine(x + px, y - h / 2);
          px += step;
        }

        // Draw vertical drips along left and right edges
        while (py < h / 2) {
          noiseCurveLine(x + w / 2, y + py);
          noiseCurveLine(x - w / 2, y + py);
          py += step;
        }
      }

      // Create melting effect for circles
      function meltCircle(x: number, y: number, d: number, clr: string) {
        if (!ctx || !canvas) return;
        let theta = 0;
        const step = (1 / d) * 2; // Angular step size
        ctx.strokeStyle = clr;

        // Draw drips around the circle's circumference
        while (theta < Math.PI * 2) {
          noiseCurveLine(
            x + d * 0.5 * Math.cos(theta),
            y + d * 0.5 * Math.sin(theta)
          );
          theta += step;
        }
      }

      // Draw dotted background grid
      function drawBackground() {
        if (!ctx || !canvas) return;
        // Fill white background
        ctx.fillStyle = "#2b2b2b";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Initialize and draw the artwork
      function init() {
        if (!ctx || !canvas) return;
        // Generate shapes with random properties
        for (let i = 0; i < 10000; i++) {
          const w = canvas.width * random(0.05, 0.1); // Width
          const h = w * random(0.5, 1.5); // Height
          // Position shapes around center with some spread
          const x =
            canvas.width / 2 + random(-1, 1) * (canvas.width - w / 2) * 0.36;
          const y =
            canvas.height / 2 + random(-1, 1) * (canvas.height - h / 2) * 0.36;
          const type = Math.floor(random(0, 2)); // 0 for rect, 1 for circle
          const clr = colors[Math.floor(random(0, colors.length))];

          const newShape = { x, y, w, h, t: type, clr };
          let overlap = false;

          // Check for collisions with existing shapes
          for (const s of shapes) {
            if (checkCollision(newShape, s)) {
              overlap = true;
              break;
            }
          }

          // Only add shapes that don't overlap
          if (!overlap) shapes.push(newShape);
        }

        // Draw background grid
        drawBackground();

        // Draw all shapes
        ctx.strokeStyle = "rgba(0, 0, 0, 0)";
        for (const s of shapes) {
          ctx.fillStyle = s.clr;
          if (s.t === 0) {
            // Draw rectangle
            ctx.fillRect(s.x - s.w / 2, s.y - s.h / 2, s.w, s.h);
          } else {
            // Draw circle
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.w / 2, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        // Apply melting effects to all shapes
        ctx.lineWidth = canvas.width * 0.0001;
        for (const s of shapes) {
          if (s.t === 0) {
            meltRect(s.x, s.y, s.w, s.h, s.clr);
          } else {
            meltCircle(s.x, s.y, s.w, s.clr);
          }
        }
      }

      // Start the application
      init();
    };

    const animationFrameId = requestAnimationFrame(render);

    window.addEventListener("resize", render);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", render);
    };
  }, []);
  return <canvas ref={canvasRef} width={"100%"} height={"100%"} />;
}
