import styles from "@/components/hero/hero.module.scss";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowDown } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

export default function Hero() {
  return (
    <section className={styles.hero}>
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
      <motion.div>
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
      </motion.div>
    </section>
  );
}

const TransitionText = ({
  children,
  className,
}: {
  children: string;
  className: string;
}) => {
  useGSAP(() => {
    gsap.from(className,
       {
        x: 20,
        
       }) 
  })
  return (
    
  );
};
