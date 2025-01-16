"use client";

import React, { useEffect, useRef } from "react";

let innerSweep = 0.75;
let outerSweep = 0.4;

export default function CursorArcs() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const centre = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const lineWidth = window.innerWidth * 0.25;
    const startAngle = -Math.PI / 2;

    const drawArc = (radius: number, sweep: number) => {
      ctx.beginPath();
      ctx.arc(
        centre.x,
        centre.y,
        radius,
        startAngle,
        startAngle + Math.PI * 2 * sweep
      );
      ctx.stroke();
      ctx.closePath();
    };

    const render = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = "white";
      ctx.lineCap = "butt";
      ctx.lineWidth = lineWidth;

      drawArc(lineWidth * 0.5, innerSweep);
      ctx.strokeStyle = "black";
      drawArc(lineWidth * 1.5, outerSweep);
    };

    const handleMouseMove = (e: MouseEvent) => {
      innerSweep = e.pageX / window.innerWidth;
      outerSweep = e.pageY / window.innerHeight;
      render();
    };

    render();
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", render);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", render);
    };
  }, []);

  return <canvas ref={canvasRef} width={"100%"} height={"100%"} />;
}
