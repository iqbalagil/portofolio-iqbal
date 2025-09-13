"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import styles from "./style.module.scss";

interface CursorProps {
  buttons: React.RefObject<HTMLButtonElement[]>;
}

export default function Cursor({ buttons }: CursorProps) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [target, setTarget] = useState<{ x: number; y: number } | null>(null);
  const [hovered, setHovered] = useState(false);
  const [angle, setAngle] = useState(0);

  const cursorSize = hovered ? 60 : 20;
  const magneticRadius = 100;

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });

      let foundTarget: { x: number; y: number } | null = null;

      const btns = buttons.current;
      if (btns) {
        for (const btn of btns) {
          if (!btn) continue;
          const rect = btn.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;

          const dx = e.clientX - centerX;
          const dy = e.clientY - centerY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < magneticRadius) {
            foundTarget = { x: centerX, y: centerY };
            setAngle((Math.atan2(dy, dx) * 100) / Math.PI);
            break;
          }
        }
      }
      setTarget(foundTarget);
      setHovered(!!foundTarget);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [buttons]);

  const finalX = target ? target.x - cursorSize / 2 : pos.x - cursorSize / 2;
  const finalY = target ? target.y - cursorSize / 2 : pos.y - cursorSize / 2;

  return (
    <motion.div
      className={styles.cursor}
      animate={{
        x: finalX,
        y: finalY,
        width: cursorSize,
        height: cursorSize,
        rotate: hovered ? angle : 0,
        scaleX: hovered ? 1.0 : 1,
        scaleY: hovered ? 0.6 : 1,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    />
  );
}
