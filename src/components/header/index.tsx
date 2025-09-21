import React from "react";
import styles from "./nav.module.scss";

export default function Navbar() {
  return (
    <div className={styles.nav}>
      <button aria-label="Menu" className={styles.iconBtn} />
      <nav className={styles.navLink}>
        <span className={styles.btnWrap}>
          <button className={styles.navBtnLink}>
            <span className={styles.text}>Work</span>
          </button>
        </span>
        <span className={styles.btnWrap}>
          <button className={styles.navBtnLink}>About</button>
        </span>
        <span className={styles.btnWrap}>
          <button className={styles.navBtnLink}>Social</button>
        </span>
      </nav>
      <span className={styles.btnWrap}>
        <button className={styles.navContent}>Contact</button>
      </span>
    </div>
  );
}
