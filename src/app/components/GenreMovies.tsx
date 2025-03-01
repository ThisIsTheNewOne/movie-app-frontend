import ScrollableMovies from "./ScrollableMovies";

import styles from "../page.module.css";
import { robotoCondensed } from "../ui/fonts";
import { Movie } from "../lib/types";

interface GenreMoviesProps {
  genres: { id: string; name: string; movies: Movie[] }[];
}

export default function GenreMovies({ genres }: GenreMoviesProps) {
  return (
    <div className={styles.moviesByGenre}>
      {genres.map((genre) => (
        <section key={genre.id} className={styles.genreSection}>
          <h2 className={robotoCondensed.className}>{genre.name}</h2>
          <ScrollableMovies movies={genre.movies} />
        </section>
      ))}
    </div>
  );
}