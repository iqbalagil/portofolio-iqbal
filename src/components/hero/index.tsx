import styles from "@/components/hero/hero.module.scss";
import { animate } from "motion";
import { motion, stagger } from "motion/react";
import { span } from "motion/react-client";
export default function Hero() {
  return (
    <div className={styles.hero}>
      <div className={styles.heroTitle}>
        <TransitionText className={styles.text}>WEB DEVELOPER</TransitionText>
        <div className={styles.introduce}>
          <TransitionText className={styles.name}>
            IQBAL AGIL BRAMANTIO
          </TransitionText>
          <TransitionText className={styles.p}>
            I&apos;am dedicated to make professional website with cool and
            interactive animation some of the work you can look at
          </TransitionText>
        </div>
      </div>
      <div></div>
    </div>
  );
}

const TransitionText = ({
  children,
  className,
}: {
  children: string;
  className: string;
}) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      transition={{
        delayChildren: stagger(0.02),
        type: "spring",
      }}
      className={className}
      aria-hidden
    >
      {children.split(" ").map((word, m) => (
        <span key={m} style={{ display: "inline-block" }}>
          {word.split("").map((l, i) => (
            <motion.span
              variants={{
                initial: {
                  opacity: 0,
                  y: 10,
                },
                animate: {
                  opacity: 1,
                  y: 0,
                },
              }}
              key={i}
              style={{ display: "inline-block" }}
            >
              {l}
            </motion.span>
          ))}
          <span>&nbsp;</span>
        </span>
      ))}
    </motion.div>
  );
};
