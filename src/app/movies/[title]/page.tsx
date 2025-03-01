/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Footer from "@/app/components/Footer";
import movie from "../../lib/data/there-will-be-blood-movie.json";
import styles from "./page.module.css";
import MovieHero from "./components/MovieHero";
import MovieActions from "./components/MovieAction";
import MovieDetails from "./components/MovieDetails";
import MovieDescription from "./components/MovieDescription";

interface MoviePageProps {
  params: { title: string };
}

export default function MoviePage({ params }: MoviePageProps) {
    const entireMovie = movie;
  
    return (
      <div className={styles.container}>
        <main className={styles.main}>
          <MovieHero
            poster={entireMovie.poster}
            thumbnail={entireMovie.thumbnail}
            title={entireMovie.title}
          />
          <MovieActions />
          <MovieDetails
            rating={Number(entireMovie.rating)}
            cast={entireMovie.cast}
            genre={entireMovie.genre}
          />
          <MovieDescription title={entireMovie.title} description={entireMovie.description} />
        </main>
        <Footer />
      </div>
    );
  }