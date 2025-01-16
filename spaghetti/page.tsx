"use client";

import React, { useEffect, useRef } from "react";
import { ArcsOne, ArcsTwo, CrossOne, CrossTwo, ITileInput } from "./tiles";

export default function Spaghetti() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const colors: string[] = [
      "#f56983",
      "#f71735",
      "#067bc2",
      "#ffd91c",
      "#99d5f7",
      "#14234f",
      "#2fe23e",
    ];
    const tiles: ((props: ITileInput) => void)[] = [
      CrossOne,
      CrossTwo,
      ArcsOne,
      ArcsTwo,
    ];
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function shuffleColors(array: string[]) {
      let currentIndex = array.length;

      while (currentIndex != 0) {
        const randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ];
      }
    }

    const render = () => {
      shuffleColors(colors);
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Set a fixed tile count to avoid extreme values and ensure a grid layout
      const tileCountWidth = Math.ceil(Math.random() * 30);
      const tileWidth = Math.floor(canvas.width / tileCountWidth);
      const tileCountHeight = Math.ceil(canvas.height / tileWidth);
      const lineWidth = Math.random() * (tileWidth / 6) + tileWidth / 6;

      // Iterate rows
      for (let r = 0; r < tileCountHeight; r++) {
        const y = tileWidth * r;

        // Iterate tiles in each row
        for (let t = 0; t < tileCountWidth; t++) {
          const x = tileWidth * t;

          const tileInput = {
            ctx: ctx,
            colors: colors,
            x: x,
            y: y,
            width: tileWidth,
            lineWidth: lineWidth,
          };

          const index = Math.floor(Math.random() * tiles.length);
          const tile = tiles[index];
          tile(tileInput);
        }
      }
    };

    render();

    function handleResize() {
      render();
    }

    window.addEventListener("resize", handleResize);
    window.addEventListener("touchend", handleResize);
    window.addEventListener("mouseup", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.addEventListener("touchend", handleResize);
      window.addEventListener("mouseup", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} width={"100%"} height={"100%"} />;
}
