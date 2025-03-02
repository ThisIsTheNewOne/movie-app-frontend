import ScrollableMovies from "./ScrollableMovies";

import styles from "../page.module.css";
import { robotoCondensed } from "../ui/fonts";
import { Movie } from "../lib/types";
import { useFilter } from "../lib/FilterContext";

interface GenreMoviesProps {
  genres: { id: string; name: string; movies: Movie[] }[];
}

export default function GenreMovies({ genres }: GenreMoviesProps) {
  const { selectedGenres } = useFilter();

  const filteredGenres = selectedGenres && selectedGenres.length > 0
    ? genres.filter((genre) => selectedGenres.includes(genre.name))
    : genres;

  return (
    <div className={styles.moviesByGenre}>
      {filteredGenres.map((genre) => (
        <section key={genre.id} className={styles.genreSection}>
          <h2 className={robotoCondensed.className}>{genre.name}</h2>
          <ScrollableMovies movies={genre.movies} />
        </section>
      ))}
    </div>
  );
}
