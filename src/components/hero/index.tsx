import styles from "@/components/hero/hero.module.scss";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ArrowDown } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, SplitText);

export default function Hero() {
  return (
      <section className={styles.hero}>
        <div className={styles.heroTitle}>
            <span>
                Hello, I&apos;m
            </span>
        </div>
      </section>
    // <section className={styles.hero}>
    //   <div className={styles.heroTitle}>
    //     <TransitionText className={styles.text}>WEB DEVELOPER</TransitionText>
    //     <div className={styles.introduce}>
    //       <TransitionText className={styles.name}>
    //         IQBAL AGIL BRAMANTIO
    //       </TransitionText>
    //       <TransitionText className={styles.p}>
    //         I&apos;am dedicated to make professional website with cool and
    //         interactive animation some of the work you can look at
    //       </TransitionText>
    //     </div>
    //   </div>

      /* <motion.div>
        <Image src="/cantik.jpg" alt="testing" width={300} height={350} />
      </motion.div>
      <motion.div
        className={styles.scrollInfo}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className={styles.layout}
          transition={{ duration: 2, repeat: Infinity }}
          animate={{ y: [0, 10, 0] }}
        >
          <span>Scroll to explore</span>
          <ArrowDown />
        </motion.div>
      </motion.div> */
    // </section>
  );
}

const TransitionText = ({
  children,
  className,
}: {
  children: string;
  className: string;
}) => {
  const textRef = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (textRef.current) {
        const splitText = new SplitText(textRef.current, {
          type: "chars",
          position: "relative",
        });

        gsap.fromTo(
          splitText.chars,
          {
            opacity: 0,
            y: 20,
            rotateX: -90,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            stagger: 0.05,
            duration: 0.8,
            ease: "power4.out",
          }
        );
      }
    },
    { scope: textRef }
  );

  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  );
};
