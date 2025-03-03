"use client";


import LoginForm from "./components/LoginForm";
import styles from "./page.module.css";


export default function Page() {
  return (
    <div className={`${styles.page} ${styles.heroBackground}`}>
      <main className={styles.main}>
        <div className={styles.loginBox}>
          <LoginForm />
        </div>
      </main>
    </div>
  );
}