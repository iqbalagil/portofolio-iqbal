import styles from "@/components/hero/hero.module.scss";
import { motion, stagger } from "motion/react";
export default function Hero() {
  return (
    <div className={styles.hero}>
      <div className={styles.heroTitle}>
        <TransitionText className={styles.text}>WEB DEVELOPER</TransitionText>
        <TransitionText className={styles.name}>
          IQBAL AGIL BRAMANTIO
        </TransitionText>
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
      whileInView="whileInView"
      transition={{
        delayChildren: stagger(0.02),
        type: "spring",
      }}
      animate={{
        translateY: "20px",
      }}
      className={className}
    >
      <motion.div>
        {children.split("").map((l, i) => {
          return (
            <motion.span
              variants={{
                initial: {
                  opacity: 0,
                  y: "0px",
                },
                whileInView: {
                  opacity: 1,
                  y: "100px",
                },
              }}
              key={i}
            >
              {l}
            </motion.span>
          );
        })}
      </motion.div>
    </motion.div>
  );
};
