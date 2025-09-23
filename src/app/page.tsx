"use client";
import Hero from "@/components/hero";
import Header from "../components/header";
import Cursor from "../components/stickyCursor";
import styles from "@/app/globals.module.scss"

export default function OnePage() {
    return (
        <div id="app" className={styles.app}>
            <Header/>
            <Cursor/>
            {/*<Hero/>*/}
        </div>
    );
}
