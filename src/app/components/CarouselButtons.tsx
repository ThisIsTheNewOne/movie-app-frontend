import styles from "../page.module.css";

type Props = { count: number; scrollToItem: (index: number) => void };

export default function CarouselButtons({ count, scrollToItem }: Props) {
  return (
    <div className={styles.carouselButtons}>
      {Array.from({ length: count }).map((_, index) => (
        <button key={index} onClick={() => scrollToItem(index)}>
          {index + 1}
        </button>
      ))}
    </div>
  );
}