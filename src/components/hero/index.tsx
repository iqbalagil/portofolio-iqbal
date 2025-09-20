import styles from "@/components/hero/hero.module.scss";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ArrowDown } from "lucide-react";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, SplitText);

export default function Hero() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroTitle}>
          <TransitionText className={styles.text}>WEB DEVELOPER</TransitionText>
          <div className={styles.introduce}>
            <TransitionText className={styles.name}>
              IQBAL AGIL BRAMANTIO
            </TransitionText>
            <TransitionText className={styles.p}>
              I&apos;m dedicated to making professional websites with cool and
              interactive animations. Some of the work you can look at below.
            </TransitionText>
          </div>
        </div>

        <div className={styles.scrollInfo}>
          <div className={styles.layout}>
            <span>Scroll to explore</span>
            <ArrowDown size={20} />
          </div>
        </div>
      </section>

      {/* Demo sections to test scroll behavior */}
      <section className={styles.demoSection}>
        <h2>Work Section</h2>
      </section>
      
      <section className={styles.demoSection}>
        <h2>About Section</h2>
      </section>
    </>
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
