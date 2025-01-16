import { SQUARE_WIDTH } from "./consts";

export interface IShapeInput {
  ctx: CanvasRenderingContext2D;
  colors: string[];
  x: number;
  y: number;
}

export const CircleRing = (props: IShapeInput) => {
  const ctx = props.ctx;
  ctx.fillStyle = props.colors[0];
  ctx.fillRect(props.x, props.y, SQUARE_WIDTH, SQUARE_WIDTH);

  ctx.fillStyle = props.colors[1];
  ctx.beginPath();
  ctx.arc(
    props.x + SQUARE_WIDTH * 0.25,
    props.y + SQUARE_WIDTH * 0.25,
    5,
    0,
    Math.PI * 2
  );
  ctx.fill();

  ctx.beginPath();
  ctx.arc(
    props.x + SQUARE_WIDTH * 0.75,
    props.y + SQUARE_WIDTH * 0.25,
    5,
    0,
    Math.PI * 2
  );
  ctx.fill();

  ctx.beginPath();
  ctx.arc(
    props.x + SQUARE_WIDTH * 0.25,
    props.y + SQUARE_WIDTH * 0.75,
    5,
    0,
    Math.PI * 2
  );
  ctx.fill();

  ctx.beginPath();
  ctx.arc(
    props.x + SQUARE_WIDTH * 0.75,
    props.y + SQUARE_WIDTH * 0.75,
    5,
    0,
    Math.PI * 2
  );
  ctx.fill();

  ctx.lineWidth = 2;
  ctx.strokeStyle = props.colors[1];
  ctx.beginPath();
  ctx.arc(
    props.x + SQUARE_WIDTH / 2,
    props.y + SQUARE_WIDTH / 2,
    14,
    0,
    2 * Math.PI
  );
  ctx.stroke();
};

export const FiveDice = (props: IShapeInput) => {
  const ctx = props.ctx;
  ctx.fillStyle = props.colors[0];
  ctx.fillRect(props.x, props.y, SQUARE_WIDTH, SQUARE_WIDTH);

  ctx.fillStyle = props.colors[1];

  ctx.beginPath();
  ctx.arc(
    props.x + SQUARE_WIDTH * 0.25,
    props.y + SQUARE_WIDTH * 0.25,
    5,
    0,
    Math.PI * 2
  );
  ctx.fill();

  ctx.beginPath();
  ctx.arc(
    props.x + SQUARE_WIDTH * 0.75,
    props.y + SQUARE_WIDTH * 0.25,
    5,
    0,
    Math.PI * 2
  );
  ctx.fill();

  ctx.beginPath();
  ctx.arc(
    props.x + SQUARE_WIDTH * 0.25,
    props.y + SQUARE_WIDTH * 0.75,
    5,
    0,
    Math.PI * 2
  );
  ctx.fill();

  ctx.beginPath();
  ctx.arc(
    props.x + SQUARE_WIDTH * 0.75,
    props.y + SQUARE_WIDTH * 0.75,
    5,
    0,
    Math.PI * 2
  );
  ctx.fill();

  ctx.beginPath();
  ctx.arc(
    props.x + SQUARE_WIDTH * 0.5,
    props.y + SQUARE_WIDTH * 0.5,
    5,
    0,
    Math.PI * 2
  );
  ctx.fill();
};

export const Frame = (props: IShapeInput) => {
  const ctx = props.ctx;
  ctx.fillStyle = props.colors[0];
  ctx.fillRect(props.x, props.y, SQUARE_WIDTH, SQUARE_WIDTH);

  ctx.fillStyle = props.colors[1];
  ctx.fillRect(
    props.x + SQUARE_WIDTH * 0.25,
    props.y + SQUARE_WIDTH * 0.25,
    SQUARE_WIDTH * 0.5,
    SQUARE_WIDTH * 0.5
  );
};

export const FourHStripes = (props: IShapeInput) => {
  const ctx = props.ctx;
  ctx.fillStyle = props.colors[0];
  ctx.fillRect(props.x, props.y, SQUARE_WIDTH, SQUARE_WIDTH);

  ctx.fillStyle = props.colors[1];
  ctx.fillRect(
    props.x,
    props.y + SQUARE_WIDTH * 0.25,
    SQUARE_WIDTH,
    SQUARE_WIDTH * 0.25
  );

  ctx.fillRect(
    props.x,
    props.y + SQUARE_WIDTH * 0.75,
    SQUARE_WIDTH,
    SQUARE_WIDTH * 0.25
  );
};

export const Petal = (props: IShapeInput) => {
  const ctx = props.ctx;
  ctx.fillStyle = props.colors[0];
  ctx.fillRect(props.x, props.y, SQUARE_WIDTH, SQUARE_WIDTH);

  ctx.fillStyle = props.colors[1];

  ctx.beginPath();
  ctx.arc(
    props.x + SQUARE_WIDTH * 0.5,
    props.y + SQUARE_WIDTH * 0.25,
    SQUARE_WIDTH * 0.25,
    0,
    Math.PI * 2
  );
  ctx.fill();

  ctx.beginPath();
  ctx.arc(
    props.x + SQUARE_WIDTH * 0.5,
    props.y + SQUARE_WIDTH * 0.75,
    SQUARE_WIDTH * 0.25,
    0,
    Math.PI * 2
  );
  ctx.fill();

  ctx.beginPath();
  ctx.arc(
    props.x + SQUARE_WIDTH * 0.25,
    props.y + SQUARE_WIDTH * 0.5,
    SQUARE_WIDTH * 0.25,
    0,
    Math.PI * 2
  );
  ctx.fill();

  ctx.beginPath();
  ctx.arc(
    props.x + SQUARE_WIDTH * 0.75,
    props.y + SQUARE_WIDTH * 0.5,
    SQUARE_WIDTH * 0.25,
    0,
    Math.PI * 2
  );
  ctx.fill();
};

export const ThreeConcentric = (props: IShapeInput) => {
  const ctx = props.ctx;
  ctx.fillStyle = props.colors[0];
  ctx.fillRect(props.x, props.y, SQUARE_WIDTH, SQUARE_WIDTH);

  ctx.fillStyle = props.colors[1];
  ctx.beginPath();
  ctx.arc(
    props.x + SQUARE_WIDTH * 0.5,
    props.y + SQUARE_WIDTH * 0.5,
    SQUARE_WIDTH * 0.5,
    0,
    Math.PI * 2
  );
  ctx.fill();

  ctx.fillStyle = props.colors[0];
  ctx.beginPath();
  ctx.arc(
    props.x + SQUARE_WIDTH * 0.5,
    props.y + SQUARE_WIDTH * 0.5,
    SQUARE_WIDTH * 0.25,
    0,
    Math.PI * 2
  );
  ctx.fill();
};

export const NineDice = (props: IShapeInput) => {
  const ctx = props.ctx;
  ctx.fillStyle = props.colors[0];
  ctx.fillRect(props.x, props.y, SQUARE_WIDTH, SQUARE_WIDTH);

  ctx.fillStyle = props.colors[1];
  ctx.beginPath();
  ctx.arc(
    props.x + SQUARE_WIDTH * 0.2,
    props.y + SQUARE_WIDTH * 0.2,
    SQUARE_WIDTH * 0.1,
    0,
    Math.PI * 2
  );
  ctx.fill();

  ctx.beginPath();
  ctx.arc(
    props.x + SQUARE_WIDTH * 0.5,
    props.y + SQUARE_WIDTH * 0.2,
    SQUARE_WIDTH * 0.1,
    0,
    Math.PI * 2
  );
  ctx.fill();

  ctx.beginPath();
  ctx.arc(
    props.x + SQUARE_WIDTH * 0.8,
    props.y + SQUARE_WIDTH * 0.2,
    SQUARE_WIDTH * 0.1,
    0,
    Math.PI * 2
  );
  ctx.fill();

  ctx.beginPath();
  ctx.arc(
    props.x + SQUARE_WIDTH * 0.2,
    props.y + SQUARE_WIDTH * 0.5,
    SQUARE_WIDTH * 0.1,
    0,
    Math.PI * 2
  );
  ctx.fill();

  ctx.beginPath();
  ctx.arc(
    props.x + SQUARE_WIDTH * 0.5,
    props.y + SQUARE_WIDTH * 0.5,
    SQUARE_WIDTH * 0.1,
    0,
    Math.PI * 2
  );
  ctx.fill();

  ctx.beginPath();
  ctx.arc(
    props.x + SQUARE_WIDTH * 0.8,
    props.y + SQUARE_WIDTH * 0.5,
    SQUARE_WIDTH * 0.1,
    0,
    Math.PI * 2
  );
  ctx.fill();

  ctx.beginPath();
  ctx.arc(
    props.x + SQUARE_WIDTH * 0.2,
    props.y + SQUARE_WIDTH * 0.8,
    SQUARE_WIDTH * 0.1,
    0,
    Math.PI * 2
  );
  ctx.fill();

  ctx.beginPath();
  ctx.arc(
    props.x + SQUARE_WIDTH * 0.5,
    props.y + SQUARE_WIDTH * 0.8,
    SQUARE_WIDTH * 0.1,
    0,
    Math.PI * 2
  );
  ctx.fill();

  ctx.beginPath();
  ctx.arc(
    props.x + SQUARE_WIDTH * 0.8,
    props.y + SQUARE_WIDTH * 0.8,
    SQUARE_WIDTH * 0.1,
    0,
    Math.PI * 2
  );
  ctx.fill();
};

export const HourGlass = (props: IShapeInput) => {
  const ctx = props.ctx;
  ctx.fillStyle = props.colors[0];
  ctx.fillRect(props.x, props.y, SQUARE_WIDTH, SQUARE_WIDTH);

  ctx.fillStyle = props.colors[1];
  ctx.beginPath();
  ctx.arc(
    props.x,
    props.y + SQUARE_WIDTH / 2,
    SQUARE_WIDTH / 2,
    -Math.PI / 2,
    Math.PI / 2
  );
  ctx.fill();

  ctx.beginPath();
  ctx.arc(
    props.x + SQUARE_WIDTH,
    props.y + SQUARE_WIDTH / 2,
    SQUARE_WIDTH / 2,
    Math.PI / 2,
    -Math.PI / 2
  );
  ctx.fill();
};

export const RoundHat = (props: IShapeInput) => {
  const ctx = props.ctx;
  ctx.fillStyle = props.colors[0];

  ctx.beginPath();
  ctx.arc(
    props.x + SQUARE_WIDTH / 2,
    props.y + SQUARE_WIDTH,
    SQUARE_WIDTH / 2,
    -Math.PI,
    0
  );
  ctx.fill();
};

export const PointyHat = (props: IShapeInput) => {
  const ctx = props.ctx;
  ctx.fillStyle = props.colors[0];

  ctx.beginPath();
  ctx.moveTo(props.x, props.y + SQUARE_WIDTH);
  ctx.lineTo(props.x + SQUARE_WIDTH * 0.5, props.y);
  ctx.lineTo(props.x + SQUARE_WIDTH, props.y + SQUARE_WIDTH);
  ctx.fill();
};
