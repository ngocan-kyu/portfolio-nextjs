// components/atom/Backgrounds/GridWrapper.tsx
"use client";

import React from "react";
import InteractiveGridPattern from "./interactive-grid-pattern";

const GridWrapper = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <InteractiveGridPattern/>
    </div>
  );
};

export default GridWrapper;
