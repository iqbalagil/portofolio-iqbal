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
        if (isOpen) {
            gsap.to(styles.burger, {duration: 0.5, opacity: 1})
        }
    })
    return (
        <nav className={styles.nav}>
            <div onClick={() => {
                setIsOpen(!isOpen)
            }} className={styles.navLink}>
                <div className={`${styles.burger} ${isOpen ? styles.burgerActive : ""}`}>
                    {/*<button className={styles.navBtnLink}>*/}
                    {/*  <span className={styles.text}>Work</span>*/}
                    {/*</button>*/}
                    {/*<button className={styles.navBtnLink}>*/}
                    {/*  <span className={styles.text}>About</span>*/}
                    {/*</button>*/}
                    {/*<button className={styles.navBtnLink}>*/}
                    {/*  <span className={styles.text}>Social</span>*/}
                    {/*</button>*/}
                </div>
            </div>
            <div>
                <button className={styles.iconBtn}/>

            </div>
            <button className={styles.navBtnLink}>
                <span className={styles.text}>
                    LET&apos;S TALK
                </span>
            </button>
        </nav>
    );
}
