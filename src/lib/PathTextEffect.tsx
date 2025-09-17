"use client";

import { SpringOptions } from "motion";
import { HTMLMotionProps } from "motion/react";

type PathTextProps = {
  text?: string;
  strokeColor?: string;
  springOptions?: SpringOptions;
  strokeWirdth?: number;
  className?: string;
} & HTMLMotionProps<"div">;
