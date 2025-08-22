// components/atom/Backgrounds/interactive-grid-pattern.tsx
"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";

interface InteractiveGridPatternProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  squares?: [number, number];
  fillColor?: string;
  strokeColor?: string;
  hoverDuration?: number;
  exitDuration?: number;
  disabled?: boolean;
  onSquareHover?: (index: number, x: number, y: number) => void;
  onSquareLeave?: (index: number, x: number, y: number) => void;
}

export default function InteractiveGridPattern({
  width = 40,
  height = 40,
  squares,
  fillColor = "rgba(209, 213, 219, 0.3)", // gray-300/30
  strokeColor = "rgba(156, 163, 175, 0.3)", // gray-400/30
  hoverDuration = 100,
  exitDuration = 1000,
  disabled = false,
  onSquareHover,
  onSquareLeave,
  ...props
}: InteractiveGridPatternProps) {
  const [hoveredSquare, setHoveredSquare] = useState<number | null>(null);
  const [viewport, setViewport] = useState({ width: 1920, height: 1080 });

  useEffect(() => {
    const handleResize = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    };

    handleResize(); // init client-side
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const gridDimensions = useMemo(() => {
    if (squares) return { horizontal: squares[0], vertical: squares[1] };
    return {
      horizontal: Math.ceil(viewport.width / width),
      vertical: Math.ceil(viewport.height / height),
    };
  }, [squares, viewport.width, viewport.height, width, height]);

  const gridSquares = useMemo(() => {
    const totalSquares = gridDimensions.horizontal * gridDimensions.vertical;
    return Array.from({ length: totalSquares }, (_, index) => {
      const x = (index % gridDimensions.horizontal) * width;
      const y = Math.floor(index / gridDimensions.horizontal) * height;
      return { index, x, y };
    });
  }, [gridDimensions.horizontal, gridDimensions.vertical, width, height]);

  const handleMouseEnter = useCallback(
    (index: number, x: number, y: number) => {
      if (disabled) return;
      setHoveredSquare(index);
      onSquareHover?.(index, x, y);
    },
    [disabled, onSquareHover]
  );

  const handleMouseLeave = useCallback(
    (index: number, x: number, y: number) => {
      if (disabled) return;
      setHoveredSquare(null);
      onSquareLeave?.(index, x, y);
    },
    [disabled, onSquareLeave]
  );

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${viewport.width} ${viewport.height}`}
      className="absolute inset-0 h-full w-full"
      {...props}
    >
      {gridSquares.map(({ index, x, y }) => (
        <rect
          key={index}
          x={x}
          y={y}
          width={width}
          height={height}
          fill={hoveredSquare === index ? fillColor : "transparent"}
          stroke={strokeColor}
          style={{
            transition: `all ${hoverDuration}ms ease-in-out`,
            cursor: disabled ? "default" : "pointer",
          }}
          onMouseEnter={() => handleMouseEnter(index, x, y)}
          onMouseLeave={() => handleMouseLeave(index, x, y)}
        />
      ))}
    </svg>
  );
}
