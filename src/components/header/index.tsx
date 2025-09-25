import React, {useEffect, useRef, useState} from "react";
import Link from "next/link";
import styles from "./nav.module.scss";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);


export default function Navbar() {

    const [isOpen, setIsOpen] = useState(false);
    const container = useRef<HTMLDivElement>(null);
    const domComponent = {
        link: useRef<HTMLDivElement>(null),
        burgerLine: useRef<HTMLDivElement>(null),
    }
    const links = [
        {name: "About", href: "#about"},
        {name: "Work", href: "#work"},
        {name: "Social", href: "#social"},
    ]
    const l = gsap.utils.selector(domComponent.link);
    const tl = useRef<gsap.core.Timeline>(null);
    useGSAP(() => {
        tl.current = gsap.timeline({paused: true})
            .to(`.${styles.navLink}`, {
                display: "grid",
                width: 300,
                height: 180,
                borderRadius: "20px",
                ease: "power4.out",
                y: 80,
                duration: 0.5
            })
            .to(l(`.${styles.text}`), {
                duration: 1,
                opacity: 1,
                ease: "power4.out",
            }, "-=0.3")
            .to(`.${styles.burgerLine}`, {
                gridColumn: 1,
                gridRow: 1,
            })
            .to(l(`.${styles.text}`), {
                gridColumn: 2,
                gridRow: 1,
                duration: 1,
                opacity: 1,
                stagger: 0.5
            });

    }, {scope: container});

    useEffect(() => {
        if (isOpen) {
            tl.current?.play();
        } else {
            tl.current?.reverse();
        }
    }, [isOpen]);
    return (
        <nav ref={container} className={styles.nav}>
            <div className={styles.navLink}>
                <div onClick={() => {
                    setIsOpen(!isOpen)
                }} className={`${styles.burger} ${isOpen ? styles.burgerActive : ""}`}>
                    <div ref={domComponent.burgerLine} className={styles.burgerLine}>
                        <div className={styles.line1}/>
                        <div className={styles.line2}/>
                    </div>

                    {isOpen ? (
            <div ref={domComponent.link} className={styles.linksCenter}>
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={styles.text}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <div>
        <button className={styles.iconBtn}/>
      </div>

      <button className={styles.navBtnLink}>
        <span className={styles.text}>LET&apos;S TALK</span>
      </button>
    </nav>
  );
}
