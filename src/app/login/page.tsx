import styles from "./page.module.css";

export default function Page() {

  return (
    <div className={`${styles.page} ${styles.heroBackground}`}>
      <main className={styles.main}>
      </main>
      <footer className={styles.footer}>
      </footer>
    </div>
  );
}
