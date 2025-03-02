"use client";
import styles from "../page.module.css";

export default function Loader() {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}></div>
      <p>Loading your movie experience...</p>
    </div>
  );
}
