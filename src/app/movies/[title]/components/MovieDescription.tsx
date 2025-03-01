import { robotoCondensed } from "../../../ui/fonts";
import styles from "../page.module.css";

interface MovieDescriptionProps {
  title: string;
  description: string;
}

export default function MovieDescription({ title, description }: MovieDescriptionProps) {
  return (
    <section className={`${styles.description} ${styles.margin}`}>
      <h1 className={robotoCondensed.className}>{title}</h1>
      <p>{description}</p>
    </section>
  );
}