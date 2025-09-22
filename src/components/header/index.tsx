import React, {useRef, useState} from "react";
import styles from "./nav.module.scss";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

export default function Navbar() {

  const [isOpen, setIsOpen] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const toggle = () => setIsOpen(!isOpen);

  useGSAP(() => {
      if (isOpen) {gsap.to(styles.nav, {duration: 0.5, opacity: 1})
      }
  })
    return (
    <div className={styles.nav}>
      <nav className={styles.navLink}>
          <div className={styles.burger}/>
        {/*<button className={styles.navBtnLink}>*/}
        {/*  <span className={styles.text}>Work</span>*/}
        {/*</button>*/}
        {/*<button className={styles.navBtnLink}>*/}
        {/*  <span className={styles.text}>About</span>*/}
        {/*</button>*/}
        {/*<button className={styles.navBtnLink}>*/}
        {/*  <span className={styles.text}>Social</span>*/}
        {/*</button>*/}
      </nav>
        <button aria-label="Menu" className={styles.iconBtn} />

      <button className={styles.navBtnLink}>Let's Talk</button>
    </div>
  );
}
