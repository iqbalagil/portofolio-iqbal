"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./style.module.scss";

interface CursorProps {
  buttons: React.RefObject<HTMLButtonElement[]>;
}

export default function Cursor({ buttons }: CursorProps) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [target, setTarget] = useState<{ x: number; y: number } | null>(null);
  const [cursorState, setCursorState] = useState<'default' | 'hover' | 'click'>('default');
  const [angle, setAngle] = useState(0);

  const getCursorSize = () => {
    switch (cursorState) {
      case 'hover': return 60;
      case 'click': return 40;
      default: return 20;
    }
  };

  const cursorSize = getCursorSize();
  const magneticRadius = 100;

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });

      let foundTarget: { x: number; y: number } | null = null;

      // Check for clickable elements beyond just buttons
      const clickableElements = document.querySelectorAll('button, a, [role="button"], [data-cursor="pointer"]');
      
      for (const element of clickableElements) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < magneticRadius) {
          foundTarget = { x: centerX, y: centerY };
          setAngle((Math.atan2(dy, dx) * 180) / Math.PI);
          setCursorState('hover');
          break;
        }
      }

      if (!foundTarget) {
        setCursorState('default');
      }

      setTarget(foundTarget);
    };

    const handleClick = () => {
      if (cursorState === 'hover') {
        setCursorState('click');
        setTimeout(() => setCursorState('hover'), 150);
      }
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("click", handleClick);
    
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("click", handleClick);
    };
  }, [cursorState]);

  const finalX = target ? target.x - cursorSize / 2 : pos.x - cursorSize / 2;
  const finalY = target ? target.y - cursorSize / 2 : pos.y - cursorSize / 2;

  const getCursorStyles = () => {
    switch (cursorState) {
      case 'hover':
        return {
          scale: 1,
          opacity: 0.8,
          backgroundColor: '#ff8ebd',
          border: '2px solid #eff7ff',
        };
      case 'click':
        return {
          scale: 0.8,
          opacity: 1,
          backgroundColor: '#fcfffa',
          border: '2px solid #ff8ebd',
        };
      default:
        return {
          scale: 1,
          opacity: 0.9,
          backgroundColor: '#ff8ebd',
          border: 'none',
        };
    }
  };

  return (
    <motion.div
      className={`${styles.cursor} ${styles[cursorState]}`}
      animate={{
        x: finalX,
        y: finalY,
        width: cursorSize,
        height: cursorSize,
        rotate: cursorState === 'hover' ? angle : 0,
        scaleX: cursorState === 'hover' ? 1.2 : 1,
        scaleY: cursorState === 'hover' ? 0.8 : 1,
        ...getCursorStyles(),
      }}
      transition={{ 
        type: "spring", 
        stiffness: cursorState === 'click' ? 400 : 200, 
        damping: cursorState === 'click' ? 20 : 15,
        duration: cursorState === 'click' ? 0.1 : 0.3
      }}
    >
      {cursorState === 'hover' && (
        <motion.div 
          className={styles.cursorRing}
          animate={{ 
            rotate: -angle,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 0.3 },
            scale: { duration: 1, repeat: Infinity }
          }}
        />
      )}
    </motion.div>
  );
}
