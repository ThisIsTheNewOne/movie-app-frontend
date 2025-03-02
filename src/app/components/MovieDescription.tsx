"use client";
import styles from "../page.module.css";
import { roboto, robotoCondensed } from "../ui/fonts";
import { useRouter } from "next/navigation";

type Props = { title: string; description: string };

export default function MovieDescription({ title, description }: Props) {
  const router = useRouter();

  const truncateDescription = (text: string) => {
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
    if (sentences.length <= 3) return text;
    return sentences.slice(0, 3).join('') + '...';
  };

  const handleDiscoverClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const encodedTitle = encodeURIComponent(title.toLowerCase());
    router.push(`/movies/${encodedTitle}`);
  };

  return (
    <div className={styles.carouselItem}>
      <div className={styles.heroContainer}>
        <h1>{title}</h1>
        <section className={styles.description}>
          <p className={roboto.className}>{truncateDescription(description)}</p>
          <button
            className={robotoCondensed.className + " " + styles.heroButton}
            onClick={handleDiscoverClick}
          >
            Discover
          </button>
        </section>
      </div>
    </div>
  );
}