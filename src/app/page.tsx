"use client";

// import Image from "next/image";
import styles from "./page.module.css";
// import { roboto } from "@/app/ui/fonts";
import { redirect } from "next/navigation";
import { useUser } from "./lib/UserContext";
import moviesList from "./lib/data/movies.json";
import { Movie } from "./lib/types";
import Carousel from "./components/Carousel";
// import clsx from "clsx";

export default function Home() {
  const { user } = useUser();

  if (user === undefined) {
    redirect("/login");
  }

  const highlightedMovies  = (moviesList as Movie[]).filter(
    (item) => item.highlighted
  );


  return (
    <div className={`${styles.page}`}>
      <nav className={styles.header}>test</nav>
        <main className={styles.main}>
          <Carousel movies={highlightedMovies} />
        </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
