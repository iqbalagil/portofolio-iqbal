"use client";
import { useRef } from "react";
import styles from "./globals.module.scss";
import Hero from "@/components/hero";
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
      {/* <Header setButtonRefs={setButtonRefs} />
      <Cursor buttons={buttonRefs} /> */}
      <Hero />
    </div>
  );
}
