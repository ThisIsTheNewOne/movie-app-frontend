import styles from "../page.module.css";

type Props = { title: string; description: string };

export default function MovieDescription({ title, description }: Props) {
  return (
    <div className={styles.carouselItem}>
      <h1>{title}</h1>
      <section>
        <p>{description}</p>
      </section>
    </div>
  );
}