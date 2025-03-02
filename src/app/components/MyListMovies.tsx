import { Movie } from "../lib/types";
import { robotoCondensed } from "../ui/fonts";
import ScrollableMovies from "./ScrollableMovies";
import styles from "../page.module.css";

interface MyListMoviesProps {
  movies: Movie[];
}

export default function MyListMovies({ movies }: MyListMoviesProps) {
  return (
    <div className={styles.paddingBottom}>
      <h2 className={`${robotoCondensed.className} ${styles.paddingLeft}`}>My List</h2>
      <ScrollableMovies movies={movies} />
    </div>
  );
}