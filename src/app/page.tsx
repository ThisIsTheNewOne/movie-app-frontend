"use client";


import styles from "./page.module.css";
// import { roboto } from "@/app/ui/fonts";
import { redirect } from "next/navigation";
import { useUser } from "./lib/UserContext";
import { Movie } from "./lib/types";
import Carousel from "./components/Carousel";
import ScrollableMovies from "./components/ScrollableMovies";
// import clsx from "clsx";

import moviesList from "./lib/data/movies.json";
import genresList from "./lib/data/genresList.json";
import userList from "./lib/data/userList.json";

export default function Home() {
  const { user } = useUser();

  if (user === undefined) {
    redirect("/login");
  }

  const highlightedMovies = (moviesList as Movie[]).filter(
    (item) => item.highlighted
  );

  const moviesByGenre = genresList.map((genre) => ({
    ...genre,
    movies: (moviesList as Movie[]).filter((movie) => movie.genre === genre.id),
  }));

  const userListMovies = (moviesList as Movie[]).filter((movie) =>
    userList.includes(movie.id)
  );

  const comingSoonMovies = (moviesList as Movie[]).filter((movie) => {
    const availableDate = new Date(movie.availableDate);
    const currentDate = new Date();
    return availableDate > currentDate;
  }).sort((a, b) => {
    return new Date(a.availableDate).getTime() - new Date(b.availableDate).getTime();
  });


  return (
    <div className={styles.page}>
      <nav className={styles.header}>test</nav>
      <main className={styles.main}>
        <Carousel movies={highlightedMovies} />
        <div>
          {genresList.map((genreButton) => {
            return (
              <button key={genreButton.id} className={styles.genreButton}>
                {genreButton.name}
              </button>
            );
          })}
          <div className={styles.moviesByGenre}>
            {moviesByGenre.map((genre) => (
              <section key={genre.id} className={styles.genreSection}>
                <h2>{genre.name}</h2>
                <ScrollableMovies movies={genre.movies} />
              </section>
            ))}
          </div>
          <div>
            {comingSoonMovies.length > 0 && (
              <>
               <h2>Coming Soon</h2>
               <ScrollableMovies movies={comingSoonMovies} />
              </>
            )}
          </div>
          <div>
            <h2>My List</h2>
            <ScrollableMovies movies={userListMovies} />
          </div>
        </div>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
