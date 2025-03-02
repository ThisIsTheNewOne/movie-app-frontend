"use client";

import styles from "./page.module.css";
// import { roboto } from "@/app/ui/fonts";
import { redirect } from "next/navigation";
import { useUser } from "./lib/UserContext";
import { Movie } from "./lib/types";
import Carousel from "./components/Carousel";
// import clsx from "clsx";

import moviesList from "./lib/data/movies.json";
import genresList from "./lib/data/genresList.json";
import userList from "./lib/data/userList.json";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import GenreButtons from "./components/GenreButtons";
import ComingSoonMovies from "./components/ComingSoonMovies";
import MyListMovies from "./components/MyListMovies";
import GenreMovies from "./components/GenreMovies";

export default function Home() {
  const { user } = useUser();


  if (user === undefined) {
    redirect("/login");
  }

  // Filter movies based on category
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

  const comingSoonMovies = (moviesList as Movie[])
    .filter((movie) => new Date(movie.availableDate) > new Date())
    .sort(
      (a, b) =>
        new Date(a.availableDate).getTime() -
        new Date(b.availableDate).getTime()
    );

  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <Carousel movies={highlightedMovies} />
        <div className={styles.contentWrapper}>
          <GenreButtons genres={genresList} />
          <GenreMovies genres={moviesByGenre} />
          <ComingSoonMovies movies={comingSoonMovies} />
          <MyListMovies movies={userListMovies} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
