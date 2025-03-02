"use client";
import { useRef } from "react";
import styles from "../page.module.css";
import CarouselItem from "./CarouselItem";
import { Movie } from "../lib/types";
import CarouselButtons from "./CarouselButtons";

type Props = { movies: Movie[] };

export default function Carousel({ movies }: Props) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollToItem = (index: number) => {
    if (carouselRef.current) {
      const itemWidth = carouselRef.current.scrollWidth / movies.length;
      carouselRef.current.scrollTo({
        left: itemWidth * index,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className={styles.carouselContainer}>
      <div className={styles.carousel} ref={carouselRef}>
        {movies.map((movie, index) => (  
          <div key={index} className={styles.carouselItem}>  
            <CarouselItem
              key={movie.id}
              poster={movie.poster}
              title={movie.title}
              description={movie.description}
            />
          </div>
        ))}
      </div>
      <div className={styles.carouselButtons}>
        <CarouselButtons count={movies.length} scrollToItem={scrollToItem} />
      </div>
    </section>
  );
}
