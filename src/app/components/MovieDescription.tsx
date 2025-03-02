"use client";
import styles from "../page.module.css";
import { roboto, robotoCondensed } from "../ui/fonts";
import { useRouter } from "next/navigation";

type Props = { title: string; description: string };

export default function MovieDescription({ title, description }: Props) {
  const router = useRouter();

  const truncateDescription = (text: string) => {
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
    return sentences.length <= 3 ? text : sentences.slice(0, 3).join("") + "...";
  };

  const handleDiscoverClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const encodedTitle = encodeURIComponent(title.toLowerCase());
    router.push(`/movies/${encodedTitle}`);
  };

  return (
    <div className={styles.movieDescription}>
      <h1>{title}</h1>
      <p className={roboto.className}>{truncateDescription(description)}</p>
      <button
        className={`${robotoCondensed.className} ${styles.heroButton}`}
        onClick={handleDiscoverClick}
      >
        Discover
      </button>
    </div>
  );
}