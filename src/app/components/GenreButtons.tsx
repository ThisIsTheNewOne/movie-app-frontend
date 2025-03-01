import styles from "../page.module.css";
import { robotoCondensed } from "../ui/fonts";

interface GenreButtonsProps {
  genres: { id: string; name: string }[];
}

export default function GenreButtons({ genres }: GenreButtonsProps) {
  return (
    <div className={styles.genreButtonContainer}>
      {genres.map((genre) => (
        <button key={genre.id} 
         className={`${styles.genreButton} ${robotoCondensed.className}`}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
}