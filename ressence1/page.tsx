"use client";

import React, { useEffect, useRef } from "react";

function getTime() {
  const date = new Date();
  const day = date.getDay();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return { day, hours, minutes, seconds };
}

const fullRotation = Math.PI * 2;

// Draws a rung of numbers and lines around the outside of the face. It doesn't rotate.
function drawMinuteRing(ctx: CanvasRenderingContext2D, radius: number) {
  const minuteRingRadiusOffset = 0.9 * radius; // Outer radius for the ring
  const tickLength = minuteRingRadiusOffset * 0.04; // Length of smaller ticks
  const fontSize = radius * 0.1; // Dynamic font size based on radius
  const tickInnerRadius = 0.89 * radius;

  // Set styles for numbers and ticks
  ctx.fillStyle = "white";
  ctx.font = `${fontSize}px Arial`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.save();

  // Draw numbers at every 5-minute interval
  for (let m = 0; m < 12; m++) {
    const number = (m * 5).toString();
    ctx.fillText(number, 0, -minuteRingRadiusOffset); // Centered text
    ctx.rotate(Math.PI / 6); // Rotate by 30 degrees
  }

  ctx.restore(); // Reset to draw ticks without number interference
  ctx.save();

  ctx.strokeStyle = "white";
  ctx.lineCap = "round";
  ctx.lineWidth = radius * 0.016;

  // Draw minute ticks (skip multiples of 5)
  for (let m = 0; m < 60; m++) {
    if (m % 5 !== 0) {
      ctx.beginPath();
      ctx.moveTo(0, -tickInnerRadius); // Start at outer ring
      ctx.lineTo(0, -tickInnerRadius - tickLength); // End slightly inward
      ctx.stroke();
    }
    ctx.rotate(Math.PI / 30); // Rotate by 6 degrees for each tick
  }

  ctx.restore(); // Restore original context
}

// The second face is a small face where the hand is the only thing that rotates. It sits in the Minute face, so it's position around the watch moves with the minutes, but the hand simply rotates once per minute. The tick marks are connected to the minute face, so they don't correct their rotation.
function drawSecondFace(
  ctx: CanvasRenderingContext2D,
  radius: number,
  secondsRotation: number
) {
  const secondsFaceRadius = radius * 0.13;
  const secondsDotRadius = radius * 0.02;
  const secondsDotYOffset = radius * 0.08;

  const secondHandWidthBottom = radius * 0.03; // Thickness of the second hand
  const secondHandWidthTop = radius * 0.015; // Thickness of the second hand
  const secondHandHeight = radius * 0.09; // Length of the second hand
  const secondHandBottomOffset = radius * -0.02;

  const secondTickStartY = radius * 0.15;
  const secondTickEndY = radius * 0.17;

  ctx.lineWidth = 1.4;

  const secondCircleGradient = ctx.createLinearGradient(
    -secondsFaceRadius,
    -secondsFaceRadius,
    secondsFaceRadius,
    secondsFaceRadius
  );

  secondCircleGradient.addColorStop(0, "#5a5a5a");
  secondCircleGradient.addColorStop(1, "#3e3e3e");
  ctx.strokeStyle = secondCircleGradient;

  ctx.save();
  ctx.beginPath();
  ctx.arc(0, 0, secondsFaceRadius, 0, Math.PI * 2, false);
  ctx.stroke();

  const tickGradient = ctx.createLinearGradient(
    0,
    secondTickStartY,
    0,
    secondTickEndY
  );

  tickGradient.addColorStop(0, "#7d7d7d");
  tickGradient.addColorStop(1, "#5a5a5a");

  // Seconds Marks

  ctx.save();

  ctx.strokeStyle = tickGradient;
  ctx.lineCap = "round";
  ctx.lineWidth = 4;

  for (let i = 0; i < 6; i++) {
    ctx.beginPath();
    ctx.moveTo(0, secondTickStartY);
    ctx.lineTo(0, secondTickEndY);
    ctx.stroke();
    ctx.rotate(fullRotation / 6);
  }

  ctx.restore();

  const secondsDotGradient = ctx.createLinearGradient(
    -secondsDotRadius,
    secondsDotYOffset - secondsDotRadius,
    secondsDotRadius,
    secondsDotYOffset + secondsDotRadius
  );

  ctx.save();

  ctx.rotate(secondsRotation);

  secondsDotGradient.addColorStop(0, "#443027");
  secondsDotGradient.addColorStop(0.5, "#A25A5A");
  secondsDotGradient.addColorStop(1, "#95756B");

  ctx.fillStyle = secondsDotGradient;

  ctx.beginPath();
  ctx.arc(0, secondsDotYOffset, secondsDotRadius, 0, Math.PI * 2);
  ctx.fill();

  // Second hand
  ctx.fillStyle = "white";
  ctx.beginPath();

  ctx.arc(
    0,
    -secondHandBottomOffset,
    secondHandWidthBottom / 2,
    Math.PI,
    0,
    true
  );

  ctx.lineTo(secondHandWidthTop / 2, -secondHandHeight);

  ctx.arc(0, -secondHandHeight, secondHandWidthTop / 2, 0, Math.PI, true);

  ctx.lineTo(-secondHandWidthBottom / 2, -secondHandBottomOffset);

  ctx.closePath();

  ctx.fill();

  ctx.restore();
}

function getDayHandAngle(
  day: number, // 0-6 where 0 is Sunday
  hour: number, // 0-23
  minute: number // 0-59
): number {
  // First, adjust day to make Monday 0 instead of Sunday being 0
  const mondayAdjustedDay = (day + 6) % 7;

  // Calculate base rotation for days (each day = 2π/7 radians)
  const dayRotation = (mondayAdjustedDay * Math.PI * 2) / 7;

  // Calculate additional rotation from hours (each hour = (2π/7)/24 radians)
  const hourRotation = (hour * Math.PI * 2) / (7 * 24);

  // Calculate additional rotation from minutes (each minute = (2π/7)/24/60 radians)
  const minuteRotation = (minute * Math.PI * 2) / (7 * 24 * 60);

  // Combine all rotations
  return dayRotation + hourRotation + minuteRotation;
}

// The hour face is a satellite face within the minute face. It's position appears to orbit the centre of the face. It's digits always point up relative to the watch. The hour hand marks the hour of the day / 12
function drawDayFace(
  ctx: CanvasRenderingContext2D,
  radius: number,
  minuteRotation: number,
  dayRotation: number
) {
  const dayFaceRadiusOffsetY = radius * -0.2;
  const dayFaceRadiusOffsetX = radius * -0.49;
  const dayFaceRadius = radius * 0.22;
  const dayHandWidthBottom = radius * 0.04; // Thickness of the minute hand
  const dayHandWidthTop = radius * 0.02; // Thickness of the minute hand
  const dayHandHeight = dayFaceRadius * 0.6; // Length of the minute hand
  const dayHandBottomOffset = radius * -0.04;

  // Draw hour face

  ctx.save();

  ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
  ctx.rotate(minuteRotation);

  ctx.translate(dayFaceRadiusOffsetX, dayFaceRadiusOffsetY);
  ctx.rotate(-minuteRotation);

  ctx.fillStyle = "white";

  const dayArcEdgeOffset = Math.PI / 25;

  ctx.strokeStyle = "#e08590";
  ctx.lineWidth = radius * 0.06;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.arc(
    0,
    0,
    dayFaceRadius,
    (fullRotation * 5) / 7 + dayArcEdgeOffset - fullRotation / 4,
    -dayArcEdgeOffset - fullRotation / 4
  );
  ctx.stroke();
  ctx.lineWidth = radius * 0.05;
  ctx.strokeStyle = "#80937C";
  ctx.stroke();

  for (let d = 0; d < 7; d++) {
    ctx.strokeStyle = "#caceca";
    if (d > 4) {
      ctx.strokeStyle = "#e08590";
    }
    ctx.lineWidth = radius * 0.03;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.arc(
      0,
      0,
      dayFaceRadius,
      (fullRotation / 7) * d + dayArcEdgeOffset - Math.PI / 2,
      (fullRotation / 7) * (d + 1) - dayArcEdgeOffset - Math.PI / 2
    );
    ctx.stroke();
  }

  // Rotate for hour hand
  ctx.rotate(dayRotation);

  // Draw hour hand
  ctx.beginPath();
  // Bottom arc (base of the hand)
  ctx.arc(0, -dayHandBottomOffset, dayHandWidthBottom / 2, Math.PI, 0, true);

  // Draw up the right edge
  ctx.lineTo(dayHandWidthTop / 2, -dayHandHeight);

  // Top arc (tip of the hand)
  ctx.arc(0, -dayHandHeight, dayHandWidthTop / 2, 0, Math.PI, true);

  // Draw down the left edge
  ctx.lineTo(-dayHandWidthBottom / 2, -dayHandBottomOffset);

  ctx.closePath();

  // Fill the hand
  ctx.fill();

  ctx.lineWidth = 1.5;

  const outerRingRadius = dayFaceRadius * 1.22;
  const innerRingRadius = dayFaceRadius * 0.78;

  const hourFaceLineGradient = ctx.createLinearGradient(
    0,
    -outerRingRadius,
    0,
    outerRingRadius
  );
  hourFaceLineGradient.addColorStop(0, "#334130");
  hourFaceLineGradient.addColorStop(1, "#495a46");
  ctx.strokeStyle = hourFaceLineGradient;

  ctx.beginPath();
  ctx.arc(0, 0, outerRingRadius, 0, Math.PI * 2);
  ctx.stroke();
  ctx.lineWidth = 1.5;

  ctx.beginPath();
  ctx.arc(0, 0, innerRingRadius, 0, Math.PI * 2);
  ctx.stroke();

  ctx.restore();
}

// The hour face is a satellite face within the minute face. It's position appears to orbit the centre of the face. It's digits always point up relative to the watch. The hour hand marks the hour of the day / 12
function drawHourFace(
  ctx: CanvasRenderingContext2D,
  radius: number,
  hourRotation: number,
  minuteRotation: number
) {
  const hourFaceRadiusOffset = radius * 0.35;
  const hourFaceRadius = radius * 0.5;
  const hourHandWidthBottom = radius * 0.04; // Thickness of the minute hand
  const hourHandWidthTop = radius * 0.02; // Thickness of the minute hand
  const hourHandHeight = radius * 0.27; // Length of the minute hand
  const hourHandBottomOffset = radius * -0.04;
  const fontSize = radius * 0.1; // Dynamic font size based on radius

  // Draw hour face

  ctx.save();

  ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
  ctx.rotate(minuteRotation);

  ctx.translate(0, hourFaceRadiusOffset);
  ctx.rotate(-minuteRotation);

  ctx.fillStyle = "white";
  ctx.font = `${fontSize}px Arial`;
  ctx.textAlign = "center"; // Horizontal centering
  ctx.textBaseline = "middle"; // Vertical centering
  ctx.lineWidth = radius * 0.015;

  for (let h = 0; h < 12; h++) {
    ctx.rotate(Math.PI / 6);
    if (h % 2 == 0) {
      ctx.fillText((h + 1).toString(), 0, -hourFaceRadius * 0.7);
    } else {
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = radius * 0.02;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(0, -hourFaceRadius * 0.78);
      ctx.lineTo(0, -hourFaceRadius * 0.66);
      ctx.stroke();
    }
  }

  // Rotate for hour hand
  ctx.rotate(hourRotation);

  // Draw hour hand
  ctx.beginPath();
  // Bottom arc (base of the hand)
  ctx.arc(0, -hourHandBottomOffset, hourHandWidthBottom / 2, Math.PI, 0, true);

  // Draw up the right edge
  ctx.lineTo(hourHandWidthTop / 2, -hourHandHeight);

  // Top arc (tip of the hand)
  ctx.arc(0, -hourHandHeight, hourHandWidthTop / 2, 0, Math.PI, true);

  // Draw down the left edge
  ctx.lineTo(-hourHandWidthBottom / 2, -hourHandBottomOffset);

  ctx.closePath();

  // Fill the hand
  ctx.fill();

  ctx.lineWidth = 1.5;

  const outerRingRadius = hourFaceRadius * 0.83;
  const innerRingRadius = hourFaceRadius * 0.61;

  const hourFaceLineGradient = ctx.createLinearGradient(
    0,
    -outerRingRadius,
    0,
    outerRingRadius
  );
  hourFaceLineGradient.addColorStop(0, "#334130");
  hourFaceLineGradient.addColorStop(1, "#495a46");
  ctx.strokeStyle = hourFaceLineGradient;

  ctx.beginPath();
  ctx.arc(0, 0, outerRingRadius, 0, Math.PI * 2);
  ctx.stroke();
  ctx.lineWidth = 1.5;

  ctx.beginPath();
  ctx.arc(0, 0, innerRingRadius, 0, Math.PI * 2);
  ctx.stroke();

  ctx.restore();
}

// The minute face is the main face. It holds the minute hand and defines the position of the seconds face as well as the hours face. It rotates once per hour
function drawMinuteFace(ctx: CanvasRenderingContext2D, radius: number) {
  const handWidthBottom = radius * 0.06; // Thickness of the minute hand
  const handWidthTop = radius * 0.03; // Thickness of the minute hand
  const handHeight = radius * 0.8; // Length of the minute hand
  const handBottomOffset = radius * 0.15;

  ctx.save();

  ctx.fillStyle = "white";

  // Start the path
  ctx.beginPath();

  // Bottom arc (base of the hand)
  ctx.arc(0, -handBottomOffset, handWidthBottom / 2, Math.PI, 0, true);

  // Draw up the right edge
  ctx.lineTo(handWidthTop / 2, -handHeight);

  // Top arc (tip of the hand)
  ctx.arc(0, -handHeight, handWidthTop / 2, 0, Math.PI, true);

  // Draw down the left edge
  ctx.lineTo(-handWidthBottom / 2, -handBottomOffset);

  ctx.closePath();

  // Fill the hand
  ctx.fill();

  ctx.restore();
}

// These rings visually separate the moving parts of the face
function drawSeparationRings(ctx: CanvasRenderingContext2D, radius: number) {
  const outerCircleRadius = radius * 0.97;
  const innerCircleRadius = radius * 0.85;
  ctx.lineWidth = 1.5;

  const outerCircleGradient = ctx.createLinearGradient(
    0,
    -outerCircleRadius,
    0,
    outerCircleRadius
  );
  outerCircleGradient.addColorStop(0, "#6b6e6a");
  outerCircleGradient.addColorStop(0.5, "#444d44");
  outerCircleGradient.addColorStop(1, "#656d64");

  ctx.strokeStyle = outerCircleGradient;

  // Outline
  ctx.beginPath();
  ctx.arc(0, 0, outerCircleRadius, 0, Math.PI * 2);
  ctx.stroke();

  // First ring
  ctx.beginPath();
  ctx.arc(0, 0, innerCircleRadius, 0, Math.PI * 2);
  ctx.stroke();
}

function getHourHandAngle(hour: number, minute: number): number {
  // Convert 24h format to 12h format if needed
  hour = hour % 12;

  // Calculate base rotation for hours (each hour = 2π/12 radians)
  const hourRotation = (hour * Math.PI * 2) / 12;

  // Calculate additional rotation from minutes (each minute = (2π/12)/60 radians)
  const minuteRotation = (minute * Math.PI * 2) / (12 * 60);

  // Combine both rotations
  return hourRotation + minuteRotation;
}

function getMinuteHandAngle(minute: number, second: number): number {
  // Calculate base rotation for minutes (each minute = 2π/60 radians)
  const minuteRotation = (minute * Math.PI * 2) / 60;

  // Calculate additional rotation from seconds (each second = (2π/60)/60 radians)
  const secondRotation = (second * Math.PI * 2) / (60 * 60);

  // Combine both rotations
  return minuteRotation + secondRotation;
}

function getSecondHandAngle(second: number): number {
  // Calculate rotation for seconds (each second = 2π/60 radians)
  return (second * Math.PI * 2) / 60;
}

function drawOverlay(ctx: CanvasRenderingContext2D, radius: number) {
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset all transformations

  const softGradient = ctx.createLinearGradient(
    ctx.canvas.width / 2, // inner x
    ctx.canvas.height / 2 - radius, // inner y
    ctx.canvas.width / 2, // outer x
    ctx.canvas.height / 2 + radius // outer y
  );

  softGradient.addColorStop(0, "rgba(255, 255, 255, 0.2)");
  softGradient.addColorStop(1, "rgba(255, 255, 255, 0.05)");

  ctx.fillStyle = softGradient;
  ctx.beginPath();
  ctx.arc(ctx.canvas.width / 2, ctx.canvas.height / 2, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

export default function Ressence() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const render = () => {
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const radius =
        canvas.height > canvas.width ? canvas.width / 3 : canvas.height / 3;

      const { day, hours, minutes, seconds } = getTime();
      // const day = 1;
      // const hours = 16;
      // const minutes = 50;
      // const seconds = 0;
      //   const { hours, minutes, seconds, milliseconds } = { 0, 0, 0, 0};
      const secondRotation = getSecondHandAngle(seconds);

      const minuteRotation = getMinuteHandAngle(minutes, seconds);

      const hourRotation = getHourHandAngle(hours, minutes);

      const dayRotation = getDayHandAngle(day, hours, minutes);

      // console.log(`
      //   Hours: ${hours}
      //   Minutes: ${minutes}
      //   Seconds: ${seconds}

      //   hourRotation: ${hourRotation} as % ${hourRotation / (Math.PI * 2)}
      //   minuteRotation: ${minuteRotation} as % ${minuteRotation / (Math.PI * 2)}
      // `);

      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);

      // Draw the gradient FIRST
      const radialGradient = ctx.createRadialGradient(
        0,
        0,
        radius * 0.85, // Inner circle centered at (0,0)
        0,
        0,
        radius // Outer circle centered at (0,0)
      );

      radialGradient.addColorStop(0, "#80937C");
      radialGradient.addColorStop(0.9, "#788677");

      // Fill the entire canvas with the gradient
      ctx.fillStyle = radialGradient;
      ctx.fillRect(
        -canvas.width / 2,
        -canvas.height / 2,
        canvas.width,
        canvas.height
      );

      ctx.restore();

      // Now draw the other components
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);

      drawMinuteRing(ctx, radius);

      ctx.rotate(minuteRotation);
      drawMinuteFace(ctx, radius);

      drawSeparationRings(ctx, radius);

      ctx.restore();

      drawHourFace(ctx, radius, hourRotation, minuteRotation);

      drawDayFace(ctx, radius, minuteRotation, dayRotation);

      // Seconds face
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);

      ctx.rotate(minuteRotation);

      ctx.translate(radius * 0.6, radius * 0.1);

      drawSecondFace(ctx, radius, secondRotation);

      ctx.restore();

      drawOverlay(ctx, radius);
      // Schedule the next frame
      animationFrameId = requestAnimationFrame(render);
    };

    let animationFrameId = requestAnimationFrame(render);

    window.addEventListener("resize", render);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", render);
    };
  }, []);
  return <canvas ref={canvasRef} width={"100%"} height={"100%"} />;
}
