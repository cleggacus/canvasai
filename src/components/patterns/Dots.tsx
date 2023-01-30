import { DetailedHTMLProps, FC, HTMLAttributes, ReactNode, useEffect, useRef, useState } from "react";
import styles from "../../styles/components/dots.module.scss";

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const Dots: FC<Props> = ({ className, children, ...other }) => {
  const [mousePos, setMousePos] = useState({x: 0, y: 0})
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if(canvasRef.current)
      setupCanvas(canvasRef.current);
  }, [canvasRef])

  useEffect(() => {
    if(canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");

      if(ctx)
        renderDots(ctx);
    }
  }, [mousePos])

  const setupCanvas = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext("2d");
    const parent = canvas.parentElement;

    if(!ctx || !parent) return;

    const resizeObserver = new ResizeObserver(() => renderDots(ctx));

    renderDots(ctx);

    resizeObserver.observe(canvas);
  }

  const renderDots = (ctx: CanvasRenderingContext2D) => {
    const canvas = ctx.canvas;

    const dotRadius = 5;
    const dotSeperation = 40;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    canvas.width = width;
    canvas.height = height;

    const gridHeight = height / dotSeperation;
    const gridWidth = width / dotSeperation;

    const yDiff = height - (Math.floor(gridHeight) * dotSeperation)
    const xDiff = width - (Math.floor(gridWidth) * dotSeperation)

    const yOffset = (yDiff + dotSeperation + dotRadius) / 2;
    const xOffset = (xDiff + dotSeperation + dotRadius) / 2;

    ctx.fillStyle = getComputedStyle(canvas).getPropertyValue("--color-bg-2");

    for(let y = 0; y < gridHeight; y++) {

      const yScreen = y * dotSeperation + yOffset;

      for(let x = 0; x < gridWidth; x++) {
        const xScreen = x * dotSeperation + xOffset;
        renderDot(ctx, xScreen, yScreen, dotRadius);
      }
    }
  }

  const renderDot = (ctx: CanvasRenderingContext2D, x: number, y: number, r: number) => {
    const distX = mousePos.x - x;
    const distY = mousePos.y - y;
    const dist = Math.pow(Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2)), 0.75);

    ctx.globalAlpha = Math.min(50/dist, 1);

    ctx.beginPath()
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath()
  }

  return <div  
    className={`${styles.container} ${className ?? ""}`}
    onMouseMove={e => setMousePos({ x: e.pageX, y: e.pageY })}
    { ...other }
  >
    <canvas ref={canvasRef}></canvas>

    <div className={`${styles.container} ${className ?? ""}`}>
      { children }
    </div>
  </div>
}

export default Dots;
