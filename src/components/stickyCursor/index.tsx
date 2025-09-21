"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import React, { useRef } from "react";
import styles from "@/components/stickyCursor/style.module.scss";

gsap.registerPlugin(useGSAP);

export default function Cursor() {
  const cursor = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if(cursor){

    gsap.set(cursor.current, { xPercent: -50, yPercent: -50 });

    const xTo = gsap.quickTo(cursor.current, "x", { duration: 0.02, ease: "none" });
    const yTo = gsap.quickTo(cursor.current, "y", { duration: 0.02, ease: "none" });

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
    }
  }, []);

  return <div ref={cursor} className={styles.cursor} />;
}
