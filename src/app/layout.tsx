import styles from "@/app/globals.module.scss";

function SmoothScrolling() {}

export default function Porto({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <main className={styles.main}>{children}</main>
      </body>
    </html>
  );
}
