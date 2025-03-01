import styles from "../page.module.css";

interface GenreButtonsProps {
  genres: { id: string; name: string }[];
}

export default function GenreButtons({ genres }: GenreButtonsProps) {
  return (
    <div>
      {genres.map((genre) => (
        <button key={genre.id} className={styles.genreButton}>
          {genre.name}
        </button>
      ))}
    </div>
  );
}