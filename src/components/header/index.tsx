import React, { forwardRef } from "react";
import styles from "./nav.module.scss";

export default function Navbar() {
  return (
    <div className={styles.nav}>
      <button></button>
      <nav className={styles.navLink}>
        <button className={styles.navbtn}>Work</button>
        <button className={styles.navbtn}>About</button>
        <button className={styles.navbtn}>Social</button>
      </nav>
      <button className={styles.navbtn}>Contact</button>
    </div>
  );
}
