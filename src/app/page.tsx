"use client";
import { useRef } from "react";
import styles from "./globals.module.scss";
import Header from "../components/header";
import Cursor from "../components/stickyCursor";

export default function OnePage() {
  const buttonRefs = useRef<HTMLButtonElement[]>([]);

  const setButtonRefs = (el: HTMLButtonElement | null) => {
    if (el && !buttonRefs.current.includes(el)) {
      buttonRefs.current.push(el);
    }
  };

  return (
    <div>
      <Header setButtonRefs={setButtonRefs} />
      <Cursor buttons={buttonRefs} />
      <div className="parallaxPage">
        <p>Hello World</p>
      </div>
    </div>
  );
}
