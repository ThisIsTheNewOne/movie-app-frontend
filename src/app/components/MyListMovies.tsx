import { Movie } from "../lib/types";
import { robotoCondensed } from "../ui/fonts";
import ScrollableMovies from "./ScrollableMovies";


interface MyListMoviesProps {
  movies: Movie[];
}

export default function MyListMovies({ movies }: MyListMoviesProps) {
  return (
    <div>
      <h2 className={robotoCondensed.className}>My List</h2>
      <ScrollableMovies movies={movies} />
    </div>
  );
}