"use client";
import {
  HTMLMotionProps,
  motion,
  SpringOptions,
  useMotionValue,
  useSpring,
} from "framer-motion";
import React, {
  ReactElement,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";

type MagneticProps = {
  children?: ReactElement;
  strength?: number;
  range?: number;
  springOption?: SpringOptions;
  onlyOnHover?: boolean;
  disableOnTouch?: boolean;
} & HTMLMotionProps<"div">;

export default function Magnetic({
  ref,
  children,
  strength = 0.5,
  range = 80,
  springOption = { stiffness: 100, damping: 10, mass: 0.5 },
  onlyOnHover = false,
  disableOnTouch = true,
  style,
  onMouseEnter,
  onMouseLeave,
  onMouseMove,
  ...props
}: MagneticProps) {
  const localRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => localRef.current as HTMLDivElement);

  const isTouchDevice = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(pointer:coarse)").matches;
  }, []);

  const [active, setActive] = useState(!onlyOnHover);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, springOption);
  const y = useSpring(rawY, springOption);

  const compute = useCallback(
    (e: MouseEvent | React.MouseEvent) => {
      if (!localRef.current) return;
      const { left, top, width, height } =
        localRef.current.getBoundingClientRect();
      const cx = left + width / 2;
      const cy = top + height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);

      if ((active || !onlyOnHover) && dist <= range) {
        const factor = (1 - dist / range) * strength;
        rawX.set(dx * factor);
        rawY.set(dy * factor);
      } else {
        rawX.set(0);
        rawY.set(0);
      }
    },
    [active, onlyOnHover, range, strength, rawX, rawY]
  );

  React.useEffect(() => {
    if (disableOnTouch && isTouchDevice) return;
    const handle = (e: MouseEvent) => compute(e);
    window.addEventListener("mousemove", handle);
  }, [compute, disableOnTouch, isTouchDevice]);

  return (
    <motion.div
      ref={localRef}
      style={{ display: "inline-block", ...style, x, y }}
      onMouseEnter={(e) => {
        if (onlyOnHover) setActive(true);
        onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        if (onlyOnHover) setActive(false);
        rawX.set(0);
        rawY.set(0);
        onMouseLeave?.(e);
      }}
      onMouseMove={(e) => {
        if (onlyOnHover) compute(e);
        onMouseMove?.(e);
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export { Magnetic, type MagneticProps };
