"use client";

import React, { useEffect, useRef } from "react";

const N_ANIM = 200; // how long the whole animation lasts
const N_TRANSITION = N_ANIM / 2; // how long a transition of 1 element lasts
const N_WAIT = 100; // how long the wait is between 2 animation phases
const N_FRAMES = 2 * (N_ANIM + N_WAIT); // how long the whole loop lasts

// const N_FRAMES_PATTERN = N_FRAMES / 3; // how long the pattern animation loop is (the waves)

const rStep = 5;
const rMin = rStep * 15;
const nSteps = 100;
const nDivs = 120;

type Dot = {
  x: number;
  y: number;
  r: number;
  theta: number;
  dMin: number;
  dMax: number;
};

export default function AnimatedDots() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dotsRef = useRef<Dot[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dots: Dot[] = [];
    let j0 = 0;

    for (let i = 0; i < nSteps; i++) {
      const r = rMin + i * rStep;
      const d1 = 2 * rStep;
      const d2 = 2 * r * Math.sin((2 * Math.PI) / nDivs);
      const d3 = Math.sqrt(
        Math.pow(r - (r + rStep) * Math.cos((2 * Math.PI) / nDivs), 2) +
          Math.pow((r + rStep) * Math.sin((2 * Math.PI) / nDivs), 2)
      );
      const d4 = Math.sqrt(
        Math.pow(r - (r - rStep) * Math.cos((2 * Math.PI) / nDivs), 2) +
          Math.pow((r - rStep) * Math.sin((2 * Math.PI) / nDivs), 2)
      );
      const dMin = 0;
      const dMax = Math.min(d1, d2, d3, d4) * 0.5;

      for (let j = j0; j < nDivs; j += 2) {
        const theta = (j * 2 * Math.PI) / nDivs;
        const x = canvas.width / 2 + r * Math.cos(theta);
        const y = canvas.height / 2 + r * Math.sin(theta);
        dots.push({ x, y, r, theta, dMin, dMax });
      }
      j0 = 1 - j0;
    }

    dotsRef.current = dots;

    let frameCount = 0;

    const render = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#1e807b";

      const animBlock = (N_ANIM - N_TRANSITION) / (dots.length - 1);

      dots.forEach((dot, i) => {
        const { x, y, r, dMin, dMax } = dot;

        let t;
        const frameInCycle = frameCount % N_FRAMES;

        if (frameInCycle < N_WAIT) t = 0;
        else if (frameInCycle < N_WAIT + N_ANIM) {
          const startTransition = i * animBlock;
          const endTransition = startTransition + N_TRANSITION;
          const f = frameInCycle - N_WAIT;

          if (f < startTransition) t = 0;
          else if (f < endTransition) t = (f - startTransition) / N_TRANSITION;
          else t = 1;
        } else if (frameInCycle < 2 * N_WAIT + N_ANIM) t = 1;
        else {
          const startTransition = (dots.length - i - 1) * animBlock;
          const endTransition = startTransition + N_TRANSITION;
          const f = frameInCycle - 2 * N_WAIT - N_ANIM;

          if (f < startTransition) t = 1;
          else if (f < endTransition)
            t = 1 - (f - startTransition) / N_TRANSITION;
          else t = 0;
        }

        // const tPattern = (frameCount % N_FRAMES_PATTERN) / N_FRAMES_PATTERN;
        // const val1 =
        //   (Math.sin(2 * Math.PI * tPattern - r / 18 - 2 * theta) + 1) / 2;
        // const val2 =
        //   (Math.sin(2 * Math.PI * tPattern + r / 18 - 2 * theta) + 1) / 2;
        const val =
          t * (1 - Math.pow((2 * (r - rMin)) / (rStep * nSteps) - 1, 2));
        const d = dMin + val * (dMax - dMin);

        ctx.beginPath();
        ctx.arc(x, y, d, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
      });

      frameCount++;
      requestAnimationFrame(render);
    };

    render();

    return () => {
      // Cleanup
      dotsRef.current = [];
    };
  }, []);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />;
}
