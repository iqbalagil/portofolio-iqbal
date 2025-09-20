"use client";

import { SpringOptions, HTMLMotionProps } from "framer-motion";

type PathTextProps = {
  text?: string;
  strokeColor?: string;
  springOptions?: SpringOptions;
  strokeWirdth?: number;
  className?: string;
} & HTMLMotionProps<"div">;
