import { useFilter } from "../lib/FilterContext";
import styles  from "../page.module.css"
import { robotoCondensed } from "../ui/fonts";

interface GenreButtonsProps {
  genres: { id: string; name: string }[];
}

export default function GenreButtons({ genres }: GenreButtonsProps) {
  const { selectedGenres, setSelectedGenres } = useFilter();

  const handleGenreClick = (genre: string) => {
    if (selectedGenres?.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else {
      setSelectedGenres([...(selectedGenres || []), genre]);
    }
  };


  return (
    <div className={`${styles.genreButtonContainer}  ${styles.paddingTop} ${styles.paddingLeft}`}>
      {genres.map((genre) => (
        <button key={genre.id} 
        className={`${styles.genreButton} ${robotoCondensed.className} ${selectedGenres?.includes(genre.name) ? styles.selected : ''}`}
         onClick={() => handleGenreClick(genre.name)}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
}