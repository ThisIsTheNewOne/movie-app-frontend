/* eslint-disable @typescript-eslint/no-unused-vars */
import MovieImage from "./MovieImage";
import MovieDescription from "./MovieDescription";
import styles from "../page.module.css";

type Props = { poster: string; title: string; description: string };

export default function CarouselItem({ poster, title, description }: Props) {
  return (
    <div className={styles.carouselItemWrapper}>
      <MovieImage src={poster} />
      <div className={styles.descriptionOverlay}>
        <MovieDescription title={title} description={description} /> 
      </div>  
    </div>
  );
}
