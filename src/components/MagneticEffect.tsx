"use client";
import gsap from "gsap";
import React, {
  ReactElement,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";

type SpringConfig = {
  stiffness?: number;
  damping?: number;
  mass?: number;
};

type MagneticProps = {
  children?: ReactElement;
  strength?: number;
  range?: number;
  springOption?: SpringConfig;
  onlyOnHover?: boolean;
  disableOnTouch?: boolean;
  style?: React.CSSProperties;
  onMouseEnter?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseMove?: (e: React.MouseEvent<HTMLDivElement>) => void;
  ref?: React.Ref<HTMLDivElement>;
} & React.HTMLAttributes<HTMLDivElement>;

export default function Magnetic({
  ref,
  children,
  strength = 0.5,
  range = 80,
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

  // Convert spring config to GSAP easing
  const gsapEase = useMemo(() => {
    return `power2.out`;
  }, []);

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

      let newX = 0;
      let newY = 0;

      if ((active || !onlyOnHover) && dist <= range) {
        const factor = (1 - dist / range) * strength;
        newX = dx * factor;
        newY = dy * factor;
      }

      // Animate with GSAP
      gsap.to(localRef.current, {
        x: newX,
        y: newY,
        duration: 0.4,
        ease: gsapEase,
      });
    },
    [active, onlyOnHover, range, strength, gsapEase]
  );

  React.useEffect(() => {
    if (disableOnTouch && isTouchDevice) return;
    const handle = (e: MouseEvent) => compute(e);
    window.addEventListener("mousemove", handle);
  }, [compute, disableOnTouch, isTouchDevice]);

  return (
    <div
      ref={localRef}
      style={{ display: "inline-block", ...style }}
      onMouseEnter={(e) => {
        if (onlyOnHover) setActive(true);
        onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        if (onlyOnHover) setActive(false);
        if (localRef.current) {
          gsap.to(localRef.current, {
            x: 0,
            y: 0,
            duration: 0.4,
            ease: gsapEase,
          });
        }
        onMouseLeave?.(e);
      }}
      onMouseMove={(e) => {
        if (onlyOnHover) compute(e);
        onMouseMove?.(e);
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export { Magnetic, type MagneticProps };
