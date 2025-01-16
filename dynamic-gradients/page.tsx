"use client";

import React, { useEffect, useRef } from "react";

type GradientStop = {
  hex: string;
};

interface IGenerateGradient {
  ctx: CanvasRenderingContext2D;
  x: number;
  width: number;
  stops: GradientStop[];
}

const possibleHexValues = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
];

function generateRandomHexColor() {
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * possibleHexValues.length);
    color += possibleHexValues[randomIndex];
  }
  return color;
}

const generateGradient = ({ ctx, x, width, stops }: IGenerateGradient) => {
  const linearGradient = ctx.createLinearGradient(x, 0, x + width, 0);
  stops.forEach((stop, index) => {
    linearGradient.addColorStop(index / (stops.length - 1), stop.hex);
  });
  return linearGradient;
};

interface IDrawRoundedRectangle {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  height: number;
  width: number;
  stops: GradientStop[];
}

const drawRoundedRectangleWithShadow = ({
  ctx,
  x,
  y,
  width,
  height,
  stops,
}: IDrawRoundedRectangle) => {
  let radius = height / 2;
  if (width < 2 * radius) radius = width / 2;
  if (height < 2 * radius) radius = height / 2;

  // Generate gradient for the shadow and adjust opacity
  const shadowGradient = generateGradient({ ctx, x, width, stops });
  ctx.fillStyle = shadowGradient;
  ctx.globalAlpha = 1;
  ctx.shadowColor = stops[0].hex;
  ctx.shadowBlur = 8;
  ctx.shadowOffsetY = 0;

  // Draw shadow
  ctx.beginPath();
  ctx.moveTo(x + radius, y); // Offset shadow vertically by 5
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
  ctx.fill();

  // Reset shadow and global alpha for main shape
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;
  ctx.globalAlpha = 1;

  // Draw main rounded rectangle with fill and stroke
  const gradient = generateGradient({ ctx, x, width, stops });
  ctx.fillStyle = gradient;
  ctx.strokeStyle = generateGradient({ ctx, x, width, stops: stops.reverse() });
  ctx.lineWidth = 6;

  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();

  ctx.fill();
  ctx.stroke();
};

export default function DynamicGradients() {
  const rowOffset = {
    odd: 0,
    even: 0,
  };
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const RECT_HEIGHT = 80;
  const MIN_RECT_WIDTH = 200 + (100 + rowOffset.even);
  const MAX_RECT_WIDTH = 500;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const render = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const numRows = Math.floor(canvas.height / RECT_HEIGHT) + 1;

      for (let row = 0; row < numRows; row++) {
        let x = 0;

        while (x < canvas.width) {
          const rectWidth = Math.min(
            Math.floor(Math.random() * (MAX_RECT_WIDTH - MIN_RECT_WIDTH + 1)) +
              MIN_RECT_WIDTH,
            canvas.width - x
          );

          const stops: GradientStop[] = [
            { hex: generateRandomHexColor() },
            { hex: generateRandomHexColor() },
          ];

          drawRoundedRectangleWithShadow({
            ctx,
            x: x,
            y: row * RECT_HEIGHT,
            width: rectWidth,
            height: RECT_HEIGHT,
            stops,
          });

          x += rectWidth;
        }
      }
    };

    render();

    window.addEventListener("resize", render);

    return () => {
      window.removeEventListener("resize", render);
    };
  }, [MIN_RECT_WIDTH]);

  return <canvas ref={canvasRef} width={"100%"} height={"100%"} />;
}
