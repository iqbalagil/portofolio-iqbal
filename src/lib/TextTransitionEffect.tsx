"use client";
import { animate, delay, stagger } from "motion";
import * as motion from "motion/react-client";
import { JSX, useRef } from "react";

type AnimatedTextProps = {
  text: string;
  el?: keyof JSX.IntrinsicElements;
  className?: string;
  once?: boolean;
};

const defaultAnimation = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
    },
  },
};

export default function AnimatedText({
  text,
  el: Wrapper = "p",
  className,
  once,
}: AnimatedTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  // const delay = stagger(0.1);
  return (
    <Wrapper className={className}>
      <motion.span
        ref={ref}
        initial="initial"
        animate="animate"
        transition={{
          delayChildren: 0.02,
        }}
      >
        {text.split("").map((char, i) => (
          <motion.span
            key={i}
            variants={{
              initial: {
                y: 0,
                opacity: 0,
              },
              animate: {
                y: 20,
                opacity: 1,
              },
            }}
            aria-hidden
          >
            {char}
          </motion.span>
        ))}
      </motion.span>
    </Wrapper>
  );
}
