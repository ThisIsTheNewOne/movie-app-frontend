"use client";
import { useState, 
  useEffect, 
  useRef } from "react";
import styles from "../page.module.css";
import CarouselItem from "./CarouselItem";
import { Movie } from "../lib/types";

type Props = { movies: Movie[] };

export default function Carousel({ movies }: Props) {
  const [current, setCurrent] = useState(0);
  const slideTimeout = useRef<NodeJS.Timeout | null>(null);
  const length = movies.length;


  useEffect(() => {
    resetTimeout();
    slideTimeout.current = setTimeout(() => {
      setCurrent((prevIndex) => (prevIndex === length - 1 ? 0 : prevIndex + 1));
    }, 5000);

    return () => {
      resetTimeout();
    };
  }, [current, length]);

  const resetTimeout = () => {
    if (slideTimeout.current) {
      clearTimeout(slideTimeout.current);
    }
  };

  const setSlide = (index: number) => {
    resetTimeout();
    setCurrent(index);
  };

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.carouselContentWrapper}>
        <div
          className={styles.carouselContent}
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {movies.map((movie) => (
            <CarouselItem key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
      <div className={styles.carouselButtons}>
        {movies.map((_, index) => (
          <button
            key={index}
            className={`${styles.carouselButton} ${index === current ? styles.active : ""}`}
            onClick={() => setSlide(index)}
          ></button>
        ))}
      </div>
    </div>
  );
}