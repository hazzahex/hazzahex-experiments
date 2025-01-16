import { LARGE_FLOWER_RADIUS, NUMBER_OF_PETALS } from "./consts";

export interface IShapeInput {
  ctx: CanvasRenderingContext2D;
  colors: string[];
  thisX: number;
  thisY: number;
}

export const LargeFlower = ({ ctx, colors, thisX, thisY }: IShapeInput) => {
  ctx.save();
  ctx.translate(thisX, thisY);
  ctx.rotate((Math.PI * 2) / NUMBER_OF_PETALS / 4);

  // Center circle
  const centerCircleRadius = LARGE_FLOWER_RADIUS * 0.3;
  ctx.fillStyle = colors[0];
  ctx.beginPath();
  ctx.arc(0, 0, centerCircleRadius, 0, Math.PI * 2);
  ctx.fill();

  // Petals
  ctx.fillStyle = colors[1];
  for (let petal = 0; petal < NUMBER_OF_PETALS; petal++) {
    const angle = (Math.PI * 2 * petal) / NUMBER_OF_PETALS;

    ctx.save();
    ctx.rotate(angle);

    ctx.beginPath();
    ctx.ellipse(
      centerCircleRadius + LARGE_FLOWER_RADIUS * 0.45, // Start from edge of center, extend to cell edge
      0, // y-position from center
      LARGE_FLOWER_RADIUS * 0.45, // petal length
      LARGE_FLOWER_RADIUS * 0.15, // petal width
      0, // rotation of ellipse
      0,
      Math.PI * 2
    );
    ctx.fill();

    ctx.restore();
  }

  ctx.restore();
};
