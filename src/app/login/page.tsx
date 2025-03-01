"use client";

import styles from "./page.module.css";
import { roboto } from "@/app/ui/fonts";
import { useUser } from '../lib/UserContext';
import { redirect } from 'next/navigation'

export default function Page() {

  const {  setUserTrue } = useUser();

  const handleSignIn = () => {
    setUserTrue();
    redirect('/');
  };


  return (
    <div className={`${styles.page} ${styles.heroBackground}`}>
      <main className={styles.main}>
        <div className={styles.loginBox}>
          <div className={styles.innerContainer}>
            <input type="text" placeholder="Username" className={`${roboto.className} ${styles.input}  ${styles.bold}`} />
            <input type="password" placeholder="Password" className={`${roboto.className} ${styles.input}  ${styles.bold}`} />
            <button className={`${styles.button} ${styles.normal}`} onClick={handleSignIn}>
               Sign In
            </button>
            <div>
        </div>
          </div>
        </div>
      </main>
    </div>
  );
}
