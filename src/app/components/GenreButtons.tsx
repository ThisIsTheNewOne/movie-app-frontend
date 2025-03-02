"use client"; // Ensure this is a Client Component

import { useRef, useState, useEffect } from "react";
import { useFilter } from "../lib/FilterContext";
import styles from "../page.module.css";
import { robotoCondensed } from "../ui/fonts";

interface GenreButtonsProps {
  genres: { id: string; name: string }[];
}

export default function GenreButtons({ genres }: GenreButtonsProps) {
  const { selectedGenres, setSelectedGenres } = useFilter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [dragDistance, setDragDistance] = useState(0);
  const [isMobile, setIsMobile] = useState(false); 
 
  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 768);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleDragStart = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!isMobile || !scrollRef.current) return; 

    setIsDragging(true);
    scrollRef.current.style.cursor = "grabbing";
    scrollRef.current.style.scrollBehavior = "auto";

    const pageX = "touches" in e ? e.touches[0].pageX : e.pageX;
    setStartX(pageX);
    setScrollLeft(scrollRef.current.scrollLeft);
    setDragDistance(0);
  };

  const handleDragEnd = () => {
    if (!isMobile || !scrollRef.current) return;

    setIsDragging(false);
    scrollRef.current.style.cursor = "grab";
    scrollRef.current.style.scrollBehavior = "smooth";
  };

  const handleDrag = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || !isMobile || !scrollRef.current) return;

    e.preventDefault();
    const pageX = "touches" in e ? e.touches[0].pageX : e.pageX;
    const deltaX = pageX - startX;
    setDragDistance((prev) => prev + Math.abs(deltaX));
    scrollRef.current.scrollLeft = scrollLeft - deltaX;
  };

  const handleGenreClick = (genre: string) => {
    if (isMobile && dragDistance > 5) return; 
    if (selectedGenres?.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else {
      setSelectedGenres([...(selectedGenres || []), genre]);
    }
  };

  return (
    <div
      ref={scrollRef}
      className={styles.genreButtonContainer}
      onMouseDown={handleDragStart}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onMouseMove={handleDrag}
      onTouchStart={handleDragStart}
      onTouchEnd={handleDragEnd}
      onTouchMove={handleDrag}
    >
      {genres.map((genre) => (
        <button
          key={genre.id}
          className={`${styles.genreButton} ${robotoCondensed.className} ${
            selectedGenres?.includes(genre.name) ? styles.selected : ""
          }`}
          onClick={() => handleGenreClick(genre.name)}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
}
