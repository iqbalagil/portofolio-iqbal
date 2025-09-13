import React, { forwardRef } from "react";
import styles from "./nav.module.scss";
import Magnetic from "@/components/MagneticEffect";

interface NavbarProps {
  setButtonRefs?: (el: HTMLButtonElement | null) => void;
}

const Navbar = forwardRef<HTMLDivElement, NavbarProps>(function Navbar(
  { setButtonRefs },
  ref
) {
  return (
    <div ref={ref} className={styles.nav}>
      <nav className={styles.navLink}>
        <Magnetic>
          <button ref={setButtonRefs} className={styles.navbtn}>
            Work
          </button>
        </Magnetic>
        <Magnetic>
          <button ref={setButtonRefs} className={styles.navbtn}>
            About
          </button>
        </Magnetic>
        <Magnetic>
          <button ref={setButtonRefs} className={styles.navbtn}>
            Social
          </button>
        </Magnetic>
      </nav>
      <button ref={setButtonRefs} className={styles.navbtn}>
        Contact
      </button>
    </div>
  );
});

export default Navbar;
