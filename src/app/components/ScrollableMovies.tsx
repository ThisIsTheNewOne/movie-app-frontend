import { useRef, useState,  } from 'react';
import Image from 'next/image';
import styles from '../page.module.css';
import { Movie } from '../lib/types';

type Props = {
  movies: Movie[];
};

export default function ScrollableMovies({ movies }: Props) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
  
    const handleDragStart = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
      setIsDragging(true);
      const pageX = 'touches' in e ? e.touches[0].pageX : e.pageX;
      setStartX(pageX - (scrollRef.current?.offsetLeft ?? 0));
      setScrollLeft(scrollRef.current?.scrollLeft ?? 0);
    };
  
    const handleDragEnd = () => {
      setIsDragging(false);
    };
  
    const handleDrag = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
      if (!isDragging) return;
      e.preventDefault();
      
      const pageX = 'touches' in e ? e.touches[0].pageX : e.pageX;
      const x = pageX - (scrollRef.current?.offsetLeft ?? 0);
      const walk = (x - startX) * 2;
      
      if (scrollRef.current) {
        scrollRef.current.scrollLeft = scrollLeft - walk;
      }
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
        <div key={movie.id} className={styles.movieCard}>
          <Image
            src={movie.thumbnail || "/fallback-image.jpg"}
            alt={movie.title}
            width={261}
            height={386}
            className={styles.movieImage}
            priority
          />
        </div>
      ))}
    </div>
  );
}