import { Movie } from "../lib/types";
import { robotoCondensed } from "../ui/fonts";
import ScrollableMovies from "./ScrollableMovies";

interface ComingSoonMoviesProps {
  movies: Movie[];
}

export default function ComingSoonMovies({ movies }: ComingSoonMoviesProps) {
  if (movies.length === 0) return null;

  return (
    <div>
      <h2 className={robotoCondensed.className}>Coming Soon</h2>
      <ScrollableMovies movies={movies} />
    </div>
  );
}