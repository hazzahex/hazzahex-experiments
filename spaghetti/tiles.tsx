export interface ITileInput {
  ctx: CanvasRenderingContext2D;
  colors: string[];
  x: number;
  y: number;
  width: number;
  lineWidth: number;
}

export const CrossOne = (props: ITileInput) => {
  const ctx = props.ctx;
  ctx.fillStyle = props.colors[0];
  ctx.fillRect(props.x, props.y, props.width, props.width);
  ctx.lineWidth = props.lineWidth;

  ctx.lineWidth = props.lineWidth * 1.5;
  ctx.strokeStyle = props.colors[0];
  ctx.beginPath();
  ctx.moveTo(props.x, props.y + props.width / 2);
  ctx.lineTo(props.x + props.width, props.y + props.width / 2);
  ctx.stroke();

  ctx.lineWidth = props.lineWidth * 1;
  ctx.strokeStyle = props.colors[1];
  ctx.beginPath();
  ctx.moveTo(props.x, props.y + props.width / 2);
  ctx.lineTo(props.x + props.width, props.y + props.width / 2);
  ctx.stroke();

  ctx.lineWidth = props.lineWidth * 1.5;
  ctx.strokeStyle = props.colors[0];
  ctx.beginPath();
  ctx.moveTo(props.x + props.width / 2, props.y);
  ctx.lineTo(props.x + props.width / 2, props.y + props.width);
  ctx.stroke();

  ctx.lineWidth = props.lineWidth * 1;
  ctx.strokeStyle = props.colors[1];
  ctx.beginPath();
  ctx.moveTo(props.x + props.width / 2, props.y);
  ctx.lineTo(props.x + props.width / 2, props.y + props.width);
  ctx.stroke();
};

export const CrossTwo = (props: ITileInput) => {
  const ctx = props.ctx;
  ctx.fillStyle = props.colors[0];
  ctx.fillRect(props.x, props.y, props.width, props.width);
  ctx.lineWidth = props.lineWidth;

  ctx.lineWidth = props.lineWidth * 1.5;
  ctx.strokeStyle = props.colors[0];
  ctx.beginPath();
  ctx.moveTo(props.x + props.width / 2, props.y);
  ctx.lineTo(props.x + props.width / 2, props.y + props.width);
  ctx.stroke();

  ctx.lineWidth = props.lineWidth;
  ctx.strokeStyle = props.colors[1];
  ctx.beginPath();
  ctx.moveTo(props.x + props.width / 2, props.y);
  ctx.lineTo(props.x + props.width / 2, props.y + props.width);
  ctx.stroke();

  ctx.lineWidth = props.lineWidth * 1.5;
  ctx.strokeStyle = props.colors[0];
  ctx.beginPath();
  ctx.moveTo(props.x, props.y + props.width / 2);
  ctx.lineTo(props.x + props.width, props.y + props.width / 2);
  ctx.stroke();

  ctx.lineWidth = props.lineWidth;
  ctx.strokeStyle = props.colors[1];
  ctx.beginPath();
  ctx.moveTo(props.x, props.y + props.width / 2);
  ctx.lineTo(props.x + props.width, props.y + props.width / 2);
  ctx.stroke();
};
export const ArcsOne = (props: ITileInput) => {
  const { ctx, colors, x, y, width, lineWidth } = props;

  ctx.fillStyle = colors[0];
  ctx.fillRect(x, y, width, width);

  // Top-left arc (Pair 1, thicker line, colors[0])
  ctx.lineWidth = lineWidth * 1.5;
  ctx.strokeStyle = colors[0];
  ctx.beginPath();
  ctx.arc(x, y, width / 2, 0, Math.PI / 2); // Top-left corner arc
  ctx.stroke();

  // Top-left arc (Pair 1, normal line width, colors[1])
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = colors[1];
  ctx.beginPath();
  ctx.arc(x, y, width / 2, 0, Math.PI / 2);
  ctx.stroke();

  // Bottom-right arc (Pair 2, thicker line, colors[0])
  ctx.lineWidth = lineWidth * 1.5;
  ctx.strokeStyle = colors[0];
  ctx.beginPath();
  ctx.arc(x + width, y + width, width / 2, Math.PI, (3 * Math.PI) / 2); // Bottom-right corner arc
  ctx.stroke();

  // Bottom-right arc (Pair 2, normal line width, colors[1])
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = colors[1];
  ctx.beginPath();
  ctx.arc(x + width, y + width, width / 2, Math.PI, (3 * Math.PI) / 2);
  ctx.stroke();
};

export const ArcsTwo = (props: ITileInput) => {
  const { ctx, colors, x, y, width, lineWidth } = props;

  ctx.fillStyle = colors[0];
  ctx.fillRect(x, y, width, width);

  // Top-right arc (Pair 1, thicker line, colors[0])
  ctx.lineWidth = lineWidth * 1.5;
  ctx.strokeStyle = colors[0];
  ctx.beginPath();
  ctx.arc(x + width, y, width / 2, Math.PI / 2, Math.PI); // Top-right corner arc
  ctx.stroke();

  // Top-right arc (Pair 1, normal line width, colors[1])
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = colors[1];
  ctx.beginPath();
  ctx.arc(x + width, y, width / 2, Math.PI / 2, Math.PI);
  ctx.stroke();

  // Bottom-left arc (Pair 2, thicker line, colors[0])
  ctx.lineWidth = lineWidth * 1.5;
  ctx.strokeStyle = colors[0];
  ctx.beginPath();
  ctx.arc(x, y + width, width / 2, (3 * Math.PI) / 2, 2 * Math.PI); // Bottom-left corner arc
  ctx.stroke();

  // Bottom-left arc (Pair 2, normal line width, colors[1])
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = colors[1];
  ctx.beginPath();
  ctx.arc(x, y + width, width / 2, (3 * Math.PI) / 2, 2 * Math.PI);
  ctx.stroke();
};
