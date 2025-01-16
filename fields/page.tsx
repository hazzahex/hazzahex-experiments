"use client";

import React, { useEffect, useRef } from "react";

export default function Fields() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  const lineNumber = 100;
  const widthPercentBottom = 0.9;
  const widthPercentTop = 0.5;
  const fullCircle = Math.PI * 2;

  const fieldStartY = 0.9;
  const fieldMiddleY = 0.5;
  const fieldEndY = 0.1;

  const wiggleTop = 0.05;
  const wiggleBottom = 0.2;

  // Animation speed control
  const waveSpeed = 0.001;
  const waveAmplitude = 0.2;

  function getWavey(v: number, time: number) {
    // Add time-based movement to the wave
    return (
      Math.sin((fullCircle * v * 0.8) / lineNumber + time) * waveAmplitude
    );
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const render = (timestamp: number) => {
      // Update time for animation
      if (!timeRef.current) timeRef.current = timestamp;
      timeRef.current = timestamp;

      // Make canvas responsive to window size
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      ctx.fillStyle = "#2b2b2b";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "white";

      let xTop = canvas.width / 2 - canvas.width * widthPercentTop * 0.5;
      let xBottom = canvas.width / 2 - canvas.width * widthPercentBottom * 0.5;

      for (let i = 0; i < lineNumber; i++) {
        // Calculate control points for the curve
        const wave = getWavey(i, timestamp * waveSpeed);

        const controlY1 = canvas.height * fieldMiddleY + canvas.height * wave;
        const controlY2 = canvas.height * fieldMiddleY + canvas.height * wave;
        const startY = canvas.height * fieldStartY;
        const endY = canvas.height * fieldEndY;

        // Calculate actual points for gradient
        const startPoint = {
          x: xBottom,
          y:
            startY +
            wiggleBottom * canvas.height * getWavey(i, timestamp * waveSpeed),
        };
        const controlPoint1 = {
          x:
            xBottom +
            wiggleBottom * canvas.width * getWavey(i, timestamp * waveSpeed),
          y: controlY1,
        };
        const controlPoint2 = {
          x:
            xTop -
            wiggleTop * canvas.width * getWavey(i, timestamp * waveSpeed),
          y: controlY2,
        };
        const endPoint = {
          x: xTop,
          y:
            endY -
            wiggleTop * canvas.height * getWavey(i, timestamp * waveSpeed),
        };

        // Create gradient that follows the curve
        const lineGradient = ctx.createLinearGradient(
          startPoint.x,
          startPoint.y,
          endPoint.x,
          endPoint.y
        );

        // Calculate colors based on position
        const startColor = "#C3D246"; // Red
        const midColor = "#426217"; // Cyan
        const endColor = "#3b4f12"; // Blue

        // Calculate the middle color stop position based on the wave
        const totalLength = Math.sqrt(
          Math.pow(endPoint.x - startPoint.x, 2) +
            Math.pow(endPoint.y - startPoint.y, 2)
        );

        // Calculate the control point's relative position along the line length
        const midPointY = canvas.height * fieldMiddleY + canvas.height * wave;
        const midPointDistance = Math.sqrt(
          Math.pow(xBottom + (xTop - xBottom) / 2 - startPoint.x, 2) +
            Math.pow(midPointY - startPoint.y, 2)
        );

        const midStopPosition = midPointDistance / totalLength;

        lineGradient.addColorStop(0.1, startColor);
        lineGradient.addColorStop(midStopPosition, midColor);
        lineGradient.addColorStop(0.9, endColor);

        // Draw the curve
        ctx.beginPath();
        ctx.strokeStyle = lineGradient;
        ctx.lineWidth = 8;
        ctx.lineCap = "round";

        ctx.moveTo(startPoint.x, startPoint.y);
        ctx.bezierCurveTo(
          controlPoint1.x,
          controlPoint1.y,
          controlPoint2.x,
          controlPoint2.y,
          endPoint.x,
          endPoint.y
        );
        ctx.stroke();

        xTop += (canvas.width * widthPercentTop) / lineNumber;
        xBottom += (canvas.width * widthPercentBottom) / lineNumber;
      }

      // Continue animation loop
      animationRef.current = requestAnimationFrame(render);
    };

    animationRef.current = requestAnimationFrame(render);

    const handleResize = () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      animationRef.current = requestAnimationFrame(render);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [getWavey]);

  return <canvas ref={canvasRef} width={"100%"} height={"100%"} />;
}
