import styles from "./page.module.css";
import { roboto } from "@/app/ui/fonts";

export default function Page() {

  return (
    <div className={`${styles.page} ${styles.heroBackground}`}>
      <main className={styles.main}>
        <div className={styles.loginBox}>
          <div className={styles.innerContainer}>
            <input type="text" placeholder="Username" className={`${roboto.className} ${styles.input}  ${styles.bold}`} />
            <input type="password" placeholder="Password" className={`${roboto.className} ${styles.input}  ${styles.bold}`} />
            <button className={`${styles.button} ${styles.normal}`}>Sign In</button>
          </div>
        </div>
      </main>
    </div>
  );
}
