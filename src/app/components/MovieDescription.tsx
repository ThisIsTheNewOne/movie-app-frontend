import styles from "../page.module.css";

type Props = { title: string; description: string };

export default function MovieDescription({ title, description }: Props) {
  const truncateDescription = (text: string) => {
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
    if (sentences.length <= 3) return text;
    return sentences.slice(0, 3).join('') + '...';
  };


  return (
    <div className={styles.carouselItem}>
      <div className={styles.heroContainer}>
        <h1>{title}</h1>
        <section>
          <p>{truncateDescription(description)}</p>
        </section>
      </div>
    </div>
  );
}