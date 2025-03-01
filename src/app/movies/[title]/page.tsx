/* eslint-disable @typescript-eslint/no-unused-vars */
import Footer from "@/app/components/Footer";
import movie from "../../lib/data/there-will-be-blood-movie.json";
import styles from "./page.module.css";

interface MoviePageProps {
  params: { title: string };
}

export default function MoviePage({ params }: MoviePageProps) {
  const entireMovie = movie;

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <section>
          <div className={styles.buttonContainer}>
            <button className={styles.trailerButton}>Trailer</button>
            <button className={styles.playButton}>Play</button>
          </div>
        </section>
        <section>Remove from my list</section>
        <section>
          <div>Rating: {entireMovie.rating}</div>
          <div>Cast: {entireMovie.cast}</div>
          <div>Genre: {entireMovie.genre}</div>
        </section>
        <section>
          <h1>{entireMovie.title}</h1>
          <p>{entireMovie.description}</p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
