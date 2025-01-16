"use client";

import React, { useEffect, useRef } from "react";
import {
  CircleRing,
  FiveDice,
  FourHStripes,
  Frame,
  HourGlass,
  IShapeInput,
  NineDice,
  Petal,
  PointyHat,
  RoundHat,
  ThreeConcentric,
} from "./shapes";
import { SQUARE_WIDTH } from "./consts";

export default function PatternTowers() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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

  useEffect(() => {
    const shapes: ((props: IShapeInput) => void)[] = [
      CircleRing,
      FiveDice,
      FourHStripes,
      Frame,
      HourGlass,
      NineDice,
      Petal,
      ThreeConcentric,
    ];

    const colors = [
      "#f56983",
      "#f71735",
      "#067bc2",
      "#ffd91c",
      "#99d5f7",
      "#14234f",
      "#2fe23e",
    ];

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let towers = Math.floor(window.innerWidth / (SQUARE_WIDTH * 1.2));
    let maxHeight = Math.floor(window.innerHeight / (SQUARE_WIDTH * 1.5));

    const render = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Iterate towers
      for (let t = 0; t < towers; t++) {
        const TOWER_HEIGHT = Math.ceil(Math.random() * maxHeight);

        // Random x position for the tower, with some spacing between towers
        const x = (t * canvas.width) / towers + 10;

        // Variable to track the top y-position of the current tower
        let y = canvas.height;

        // Render tower body
        for (let f = 0; f < TOWER_HEIGHT; f++) {
          // Randomly select a shape function from the shapes array
          const shape = shapes[Math.floor(Math.random() * shapes.length)];

          // Calculate y position for each shape in the tower, stacking upward
          y -= 50;

          // Shuffle colors before passing to shape
          shuffleColors(colors);

          // Define shape input and call the shape function
          const shapeInput: IShapeInput = {
            ctx,
            colors,
            x,
            y,
          };

          shape(shapeInput);
        }

        // Render top shape (either RoundHat or PointyHat)
        const topShape = Math.random() < 0.5 ? RoundHat : PointyHat;

        // Set the y position for the top shape, which is just above the last element in the tower
        y -= 50;

        // Shuffle colors for the top shape and render it
        shuffleColors(colors);
        const topShapeInput: IShapeInput = {
          ctx,
          colors,
          x,
          y,
        };

        topShape(topShapeInput);
      }
    };

    render();

    function handleResize() {
      towers = Math.floor(window.innerWidth / (SQUARE_WIDTH * 1.2));
      maxHeight = Math.floor(window.innerHeight / (SQUARE_WIDTH * 1.5));
      render();
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} width={"100%"} height={"100%"} />;
}
