"use client";

import React from "react";

type PathTextProps = {
  text?: string;
  strokeColor?: string;
  springOptions?: {
    stiffness?: number;
    damping?: number;
    mass?: number;
  };
  strokeWirdth?: number;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;
