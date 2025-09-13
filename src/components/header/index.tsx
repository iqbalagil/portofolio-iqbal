import React, { forwardRef } from "react";
import styles from "./nav.module.scss";

interface NavbarProps {
  setButtonRefs?: (el: HTMLButtonElement | null) => void;
}

const Navbar = forwardRef<HTMLDivElement, NavbarProps>(function Navbar(
  { setButtonRefs },
  ref
) {
  return (
    <div ref={ref} className={styles.nav}>
      <div className={styles.navlink}>
        <button ref={setButtonRefs} className={styles.navbtn}>
          Work
        </button>
        <button ref={setButtonRefs} className={styles.navbtn}>
          About
        </button>
        <button ref={setButtonRefs} className={styles.navbtn}>
          Social
        </button>
      </div>
      <button ref={setButtonRefs} className={styles.navbtn}>
        Contact
      </button>
    </div>
  );
});

export default Navbar;
