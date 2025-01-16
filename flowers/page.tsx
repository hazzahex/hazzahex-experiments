"use client";

import React, { useEffect, useRef } from "react";
import { IShapeInput, LargeFlower } from "./shapes";

export default function Flowers() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // function shuffleColors(array: string[]) {
  //   let currentIndex = array.length;

  //   while (currentIndex != 0) {
  //     const randomIndex = Math.floor(Math.random() * currentIndex);
  //     currentIndex--;

  //     [array[currentIndex], array[randomIndex]] = [
  //       array[randomIndex],
  //       array[currentIndex],
  //     ];
  //   }
  // }

  useEffect(() => {
    // const shapes: ((props: IShapeInput) => void)[] = [LargeFlower];
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const colors = [
      "#ff68b6",
      //   "#f71735",
      "#067bc2",
      //   "#ffd91c",
      //   "#99d5f7",
      //   "#14234f",
      "#5cae63",
    ];

    const largeFlowerRadius = 50;

    const render = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "white";

      const cols = Math.ceil(canvas.width / (2 * largeFlowerRadius)) + 1;
      const rows = Math.ceil(canvas.height / (2 * largeFlowerRadius)) + 1;

      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
          // Randomize two colors for each flower
          const shuffledColors = [...colors].sort(() => 0.5 - Math.random());
          const flowerColors = shuffledColors.slice(0, 2);

          const thisX = x * 2 * largeFlowerRadius;
          const thisY = y * 2 * largeFlowerRadius;

          // Define shape input and call the shape function
          const shapeInput: IShapeInput = {
            ctx,
            colors: flowerColors,
            thisX,
            thisY,
          };

          LargeFlower(shapeInput);
        }
      }
    };

    render();

    const handleResize = () => render();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <canvas ref={canvasRef} style={{ display: "block" }} />;
}
