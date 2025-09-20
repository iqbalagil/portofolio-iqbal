"use client";
import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Magnetic from "@/components/MagneticEffect";
import styles from "./nav.module.scss";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface NavbarProps {
  setButtonRefs?: (el: HTMLButtonElement | null) => void;
}

export default function Navbar({ setButtonRefs }: NavbarProps) {
  const navRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  useGSAP(() => {
    if (navRef.current) {
      // Initial navbar animation
      gsap.fromTo(navRef.current, 
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 }
      );

      // Scroll-responsive navbar shrinking animation
      ScrollTrigger.create({
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const progress = self.progress;
          const initialHeight = 80;
          const minHeight = 60;
          const newHeight = initialHeight - (progress * 20);
          const clampedHeight = Math.max(newHeight, minHeight);
          
          // Apply blur effect that increases with scroll
          const blurAmount = progress * 8;
          
          gsap.to(navRef.current, {
            height: clampedHeight,
            backdropFilter: `blur(${blurAmount}px)`,
            backgroundColor: `rgba(39, 39, 39, ${0.8 + progress * 0.2})`,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      });
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    
    gsap.to(document.documentElement, {
      duration: 0.5,
      ease: "power2.inOut",
      onUpdate: function() {
        if (!isDarkTheme) {
          document.documentElement.style.setProperty('--bg-color', '#272727');
          document.documentElement.style.setProperty('--text-color', '#eff7ff');
        } else {
          document.documentElement.style.setProperty('--bg-color', '#eff7ff');
          document.documentElement.style.setProperty('--text-color', '#272727');
        }
      }
    });
  };

  return (
    <div ref={navRef} className={styles.nav}>
      <div ref={logoRef} className={styles.logo}>
        <span className={styles.logoText}>IQBAL AGIL</span>
      </div>
      
      <nav className={styles.navLink}>
        <Magnetic strength={0.3} range={60}>
          <button 
            ref={setButtonRefs} 
            className={styles.navbtn}
          >
            <span className={styles.btnText}>Work</span>
            <div className={styles.hoverLine}></div>
          </button>
        </Magnetic>
        
        <Magnetic strength={0.3} range={60}>
          <button 
            ref={setButtonRefs} 
            className={styles.navbtn}
          >
            <span className={styles.btnText}>About</span>
            <div className={styles.hoverLine}></div>
          </button>
        </Magnetic>
        
        <Magnetic strength={0.3} range={60}>
          <button 
            ref={setButtonRefs} 
            className={styles.navbtn}
          >
            <span className={styles.btnText}>Social</span>
            <div className={styles.hoverLine}></div>
          </button>
        </Magnetic>
      </nav>

      <div className={styles.navActions}>
        <Magnetic strength={0.2} range={50}>
          <button 
            onClick={toggleTheme}
            ref={setButtonRefs}
            className={styles.themeToggle}
            aria-label="Toggle theme"
          >
            <div className={styles.toggleIcon}>
              {isDarkTheme ? '🌙' : '☀️'}
            </div>
          </button>
        </Magnetic>
        
        <Magnetic strength={0.3} range={60}>
          <button 
            ref={setButtonRefs} 
            className={styles.contactBtn}
          >
            <span className={styles.btnText}>Contact</span>
            <div className={styles.hoverLine}></div>
          </button>
        </Magnetic>
      </div>
    </div>
  );
}
