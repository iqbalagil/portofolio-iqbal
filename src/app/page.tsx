"use client";
import styles from "./globals.module.scss";
import Hero from "@/components/hero";
import Header from "../components/header";
import Cursor from "../components/stickyCursor";

export default function OnePage() {

  return (
    <div>
      <Header/>
      <Cursor/>
      {/*<Hero />*/}
    </div>
  );
}
