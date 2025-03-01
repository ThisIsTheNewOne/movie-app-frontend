"use client";
import Image from "next/image";
import styles from '../page.module.css';
import { useState } from "react";

interface MovieHeroProps {
  poster: string;
  thumbnail: string;
  title: string;
}

export default function MovieHero({ poster, thumbnail, title }: MovieHeroProps) {
  const [imgSrc, setImgSrc] = useState(poster);

  return (
    <section className={styles.heroSection}>
      <figure className={styles.imageContainer}>
        <Image
          src={imgSrc}
          alt={title}
          width={3000}
          height={800}
          priority
          onError={() => setImgSrc(thumbnail)}
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
        <figcaption className={styles.buttonOverlay}>
          <button className={styles.trailerButton} aria-label="Watch Trailer">
            Trailer
          </button>
          <button className={styles.playButton} aria-label="Play Movie">
            Play
          </button>
        </figcaption>
      </figure>
    </section>
  );
}