"use client";
import MovieImage from "./MovieImage";
import MovieDescription from "./MovieDescription";
import styles from "../page.module.css";
import { Movie } from "../lib/types";

type Props = { movie: Movie };

export default function CarouselItem({ movie }: Props) {
  return (
    <div className={styles.carouselSlide}>
      <MovieImage src={movie.poster} />
      <div className={styles.slideOverlay}>
        <MovieDescription title={movie.title} description={movie.description} />
      </div>
    </div>
  );
}