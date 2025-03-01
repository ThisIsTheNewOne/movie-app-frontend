import styles from '../page.module.css';
import Rating from "./Rating";
import Genre from "./Genre";
import Cast from "./Cast";

interface MovieDetailsProps {
  rating: number | null;
  cast: string;
  genre: string;
}

export default function MovieDetails({ rating, cast, genre }: MovieDetailsProps) {
    return (
        <section className={`${styles.details} ${styles.margin}`}>
          <ul className={styles.metadata}>
            <Rating rating={rating} />
            <Cast cast={cast} />
            <Genre genre={genre} />
          </ul>
        </section>
      );
}