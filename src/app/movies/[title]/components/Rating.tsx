import { robotoCondensed } from "../../../ui/fonts";
import StarRating from "./StarRating";
import styles from "../page.module.css";

interface RatingProps {
  rating: number | null;
}

export default function Rating({ rating }: RatingProps) {
  if (!rating) return null;

  return (
    <li className={styles.ratingContainer}>
      <span className={`${robotoCondensed.className} ${styles.ratingLabel}`}>
        <strong>Rating: </strong>
      </span>
      <div className={styles.starRating}>
        <StarRating rating={rating} />
      </div>
    </li>
  );
}