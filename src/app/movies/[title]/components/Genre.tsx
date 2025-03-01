import { robotoCondensed } from "../../../ui/fonts";
import genresList from "../../../lib/data/genresList.json";

interface GenreProps {
  genre: string;
}

export default function Genre({ genre }: GenreProps) {

  if (!genre) return null;

  const genreName = genresList.find((g) => g.id === genre)?.name;

  return (
    <li>
      <span className={robotoCondensed.className}>
        <strong>Genre: </strong>
      </span>
      {genreName}
    </li>
  );
}