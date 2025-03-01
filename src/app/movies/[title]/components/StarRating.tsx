import Image from 'next/image';
import styles from '../page.module.css';

interface StarRatingProps {
  rating: number;
}

export default function StarRating({ rating }: StarRatingProps) {
  const totalStars = 5;
  const stars = [];

  for (let i = 0; i < totalStars; i++) {
    if (i < Math.floor(rating)) {
      stars.push(
        <Image
          key={i}
          src="/star.png"
          alt="star"
          width={20}
          height={20}
          className={styles.star}
        />
      );
    }
  }

  return <div className={styles.starContainer}>{stars}</div>;
}