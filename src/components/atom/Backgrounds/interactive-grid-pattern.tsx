"use client";

import { cn } from "@/lib/utils";
import React, { useState, useEffect, useMemo, useCallback } from "react";

/**
 * InteractiveGridPattern is a component that renders a grid pattern with interactive squares.
 * 
 * @param width - The width of each square (default: 40)
 * @param height - The height of each square (default: 40)
 * @param squares - Override automatic calculation with custom [horizontal, vertical] squares
 * @param className - Additional CSS classes for the SVG container
 * @param squareClassName - Additional CSS classes for individual squares
 * @param fillColor - Color for hovered squares (default: "gray-300/30")
 * @param strokeColor - Color for square borders (default: "gray-400/30")
 * @param hoverDuration - Duration of hover animation in ms (default: 100)
 * @param exitDuration - Duration of exit animation in ms (default: 1000)
 * @param disabled - Disable interactions
 * @param onSquareHover - Callback when square is hovered
 * @param onSquareLeave - Callback when square hover ends
 */
interface InteractiveGridPatternProps extends Omit<React.SVGProps<SVGSVGElement>, 'width' | 'height'> {
  width?: number;
  height?: number;
  squares?: [number, number]; // [horizontal, vertical]
  className?: string;
  squareClassName?: string;
  fillColor?: string;
  strokeColor?: string;
  hoverDuration?: number;
  exitDuration?: number;
  disabled?: boolean;
  onSquareHover?: (index: number, x: number, y: number) => void;
  onSquareLeave?: (index: number, x: number, y: number) => void;
}

/**
 * Custom hook to handle viewport dimensions with debouncing
 */
function useViewportDimensions(debounceMs = 100) {
  const [dimensions, setDimensions] = useState(() => {
    if (typeof window === 'undefined') {
      return { width: 1920, height: 1080 }; // Default fallback for SSR
    }
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let timeoutId: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, debounceMs);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, [debounceMs]);

  return dimensions;
}

/**
 * The InteractiveGridPattern component.
 */
export function InteractiveGridPattern({
  width = 40,
  height = 40,
  squares,
  className,
  squareClassName,
  fillColor = "gray-300/30",
  strokeColor = "gray-400/30",
  hoverDuration = 100,
  exitDuration = 1000,
  disabled = false,
  onSquareHover,
  onSquareLeave,
  ...props
}: InteractiveGridPatternProps) {
  const [hoveredSquare, setHoveredSquare] = useState<number | null>(null);
  const viewport = useViewportDimensions();

  // Calculate grid dimensions
  const gridDimensions = useMemo(() => {
    if (squares) {
      return { horizontal: squares[0], vertical: squares[1] };
    }
    
    return {
      horizontal: Math.ceil(viewport.width / width),
      vertical: Math.ceil(viewport.height / height),
    };
  }, [squares, viewport.width, viewport.height, width, height]);

  // Memoize grid squares data
  const gridSquares = useMemo(() => {
    const totalSquares = gridDimensions.horizontal * gridDimensions.vertical;
    return Array.from({ length: totalSquares }, (_, index) => {
      const x = (index % gridDimensions.horizontal) * width;
      const y = Math.floor(index / gridDimensions.horizontal) * height;
      return { index, x, y };
    });
  }, [gridDimensions.horizontal, gridDimensions.vertical, width, height]);

  // Optimized event handlers
  const handleMouseEnter = useCallback((index: number, x: number, y: number) => {
    if (disabled) return;
    
    setHoveredSquare(index);
    onSquareHover?.(index, x, y);
  }, [disabled, onSquareHover]);

  const handleMouseLeave = useCallback((index: number, x: number, y: number) => {
    if (disabled) return;
    
    setHoveredSquare(null);
    onSquareLeave?.(index, x, y);
  }, [disabled, onSquareLeave]);

  // Base square classes
  const baseSquareClasses = useMemo(() => {
    return cn(
      `stroke-${strokeColor}`,
      `transition-all duration-${hoverDuration} ease-in-out`,
      `[&:not(:hover)]:duration-${exitDuration}`,
      squareClassName
    );
  }, [strokeColor, hoverDuration, exitDuration, squareClassName]);

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${viewport.width} ${viewport.height}`}
      className={cn("absolute inset-0 h-full w-full", className)}
      style={{ width: '100vw', height: '100vh' }}
      {...props}
    >
      <defs>
        {/* Optional: Add patterns or filters here */}
        <pattern
          id="grid-pattern"
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
        >
          <path
            d={`M ${width} 0 L 0 0 0 ${height}`}
            fill="none"
            className={`stroke-${strokeColor}`}
            strokeWidth="1"
          />
        </pattern>
      </defs>
      
      {/* Render all grid squares */}
      {gridSquares.map(({ index, x, y }) => (
        <rect
          key={`square-${index}`}
          x={x}
          y={y}
          width={width}
          height={height}
          className={cn(
            baseSquareClasses,
            hoveredSquare === index 
              ? `fill-${fillColor}` 
              : "fill-transparent"
          )}
          onMouseEnter={() => handleMouseEnter(index, x, y)}
          onMouseLeave={() => handleMouseLeave(index, x, y)}
          style={{
            cursor: disabled ? 'default' : 'pointer',
          }}
        />
      ))}
    </svg>
  );
}

// Export a memoized version for better performance
export default React.memo(InteractiveGridPattern);