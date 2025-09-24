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
        burger: useRef<HTMLDivElement>(null),
        link: useRef<HTMLAnchorElement>(null),
        burgerLine: useRef<HTMLDivElement>(null),
        burgerComponent: useRef<HTMLDivElement>(null)
    }

    const links = [
        {name: "About", href: "#about"},
        {name: "Work", href: "#work"},
        {name: "Social", href: "#social"},
    ]
    const tl = useRef<gsap.core.Timeline>(null);
    useGSAP(() => {
        tl.current = gsap.timeline({paused: true})
            .to(domComponent.burger.current, {
                display: "flex",
                flexDirection: "column",
                width: 300,
                height: 180,
                flexWrap: "wrap",
                borderRadius: "20px",
                ease: "power4.out",
                y: 80,
                duration: 0.5
            })
            .to(domComponent.link.current, {
                duration: 0.5,
                opacity: 1,
                ease: "power4.out",
            }, "-=0.3")
            .to(domComponent.burgerComponent.current, {
                right: 1,
                left: 0,
                padding: "20px",
                duration: 0.2,
            }, "-=0.1");


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
            <div ref={domComponent.burger} className={styles.navLink}>
                <div onClick={() => {
                    setIsOpen(!isOpen)
                }} className={`${styles.burger} ${isOpen ? styles.burgerActive : ""}`}>
                    <div ref={domComponent.burgerComponent} className={styles.burgerComponent}>

                        <div ref={domComponent.burgerLine} className={styles.burgerLine}>
                            <div className={styles.line1}/>
                            <div className={styles.line2}/>
                        </div>

                        {
                            isOpen ? (
                                <div>
                                    {
                                        links.map((link) => (
                                            <Link key={link.name} href={link.href} className={styles.text}
                                                  ref={domComponent.link}>
                                                {link.name}
                                            </Link>
                                        ))
                                    }
                                </div>
                            ) : null
                        }
                    </div>

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
