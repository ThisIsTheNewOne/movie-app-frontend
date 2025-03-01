import Image from "next/image";
import styles from "../page.module.css";

export default function MovieActions() {
  return (
    <section className={`${styles.actions} ${styles.margin}`}>
      <div className={styles.actionWrapper}>
        <Image
          src="/plus-button.png"
          alt="Add"
          width={24}
          height={24}
          className={styles.buttonIcon}
        />
        <span className={styles.actionText}>Add to My List</span>
      </div>
    </section>
  );
}
