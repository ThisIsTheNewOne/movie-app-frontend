import { Movie } from "../lib/types";
import { robotoCondensed } from "../ui/fonts";
import ScrollableMovies from "./ScrollableMovies";
import styles from "../page.module.css";

interface ComingSoonMoviesProps {
  movies: Movie[];
}

export default function ComingSoonMovies({ movies }: ComingSoonMoviesProps) {
  if (movies.length === 0) return null;

  return (
    <div>
      <h2 className={`${robotoCondensed.className} ${styles.paddingLeft}`}>Coming Soon</h2>
      <ScrollableMovies movies={movies} />
    </div>
  );
}