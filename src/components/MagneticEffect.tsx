"use client";
import { motion, useMotionValue, useSpring } from "motion/react";
import React, { useEffect, useRef } from "react";

export default function MagneticField({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const { width, height, left, top } = rect;
      const relX = e.clientX - (left + width / 2);
      const relY = e.clientY - (top + height / 2);

      const distance = Math.sqrt(relX ** 2 + relY ** 2);
      const strength = distance < 5 ? 0.5 : 0;

      x.set(relX * strength);
      y.set(relY * strength);
    };

    const mouseLeave = () => {
      x.set(0);
      y.set(0);
    };
    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseleave", mouseLeave);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseleave", mouseLeave);
    };
  }, [x, y]);

  return (
    <motion.div ref={ref} style={{ x: springX, y: springY }}>
      {children}
    </motion.div>
  );
}
