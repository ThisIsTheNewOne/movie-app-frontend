import { useRef, useState } from "react";
import Image from "next/image";
import styles from "../page.module.css";
import { Movie } from "../lib/types";
// import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

type Props = {
  movies: Movie[];
};

export default function ScrollableMovies({ movies }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [dragDistance, setDragDistance] = useState(0);

  const router = useRouter();

  const handleDragStart = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    if (!scrollRef.current) return;

    setIsDragging(true);
    scrollRef.current.style.cursor = "grabbing";
    scrollRef.current.style.scrollBehavior = "auto";

    const pageX = "touches" in e ? e.touches[0].pageX : e.pageX;
    setStartX(pageX);
    setScrollLeft(scrollRef.current.scrollLeft);
    setDragDistance(0);
  };

  const handleDragEnd = () => {
    if (!scrollRef.current) return;

    setIsDragging(false);
    scrollRef.current.style.cursor = "grab";
    scrollRef.current.style.scrollBehavior = "smooth";
  };

  const handleDrag = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    if (!isDragging || !scrollRef.current) return;

    e.preventDefault();

    const pageX = "touches" in e ? e.touches[0].pageX : e.pageX;
    const deltaX = pageX - startX;
    setDragDistance((prev) => prev + Math.abs(deltaX));
    scrollRef.current.scrollLeft = scrollLeft - deltaX;
  };

  const handleMovieClick = (movie: Movie, e: React.MouseEvent) => {
    if (dragDistance > 5) return;
    e.preventDefault();
    const encodedTitle = encodeURIComponent(movie.title.toLowerCase());
    router.push(`/movies/${encodedTitle}`);
  };

  return (
    <div
      ref={scrollRef}
      className={styles.moviesTrack}
      onMouseDown={handleDragStart}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onMouseMove={handleDrag}
      onTouchStart={handleDragStart}
      onTouchEnd={handleDragEnd}
      onTouchMove={handleDrag}
    >
      {movies.map((movie) => (
        <div
          key={movie.id}
          className={styles.movieCard}
          onClick={(e) => handleMovieClick(movie, e)}
          style={{ cursor: "pointer" }}
        >
          <Image
            src={movie.thumbnail || "/fallback-image.jpg"}
            alt={movie.title}
            width={261}
            height={386}
            className={styles.movieImage}
            priority
            draggable={false}
          />
        </div>
      ))}
    </div>
  );
}
