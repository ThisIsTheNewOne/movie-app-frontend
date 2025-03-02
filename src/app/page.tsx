/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { redirect } from "next/navigation";
import { useUser } from "./lib/UserContext";
import { Movie } from "./lib/types";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import GenreButtons from "./components/GenreButtons";
import ComingSoonMovies from "./components/ComingSoonMovies";
import MyListMovies from "./components/MyListMovies";
import GenreMovies from "./components/GenreMovies";
import Carousel from "./components/Carousel";

import genresList from "./lib/data/genresList.json";
import userList from "./lib/data/userList.json";
import { useMovies } from "./lib/MoviesContext";

export default function Home() {
  const { user, token } = useUser();
  const { movies, setMovies } = useMovies();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  if (user === undefined || user === false) {
    redirect("/login");
  }

  useEffect(() => {
    if (!token) return;

    const fetchMovies = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch("/api/films/movies", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }

        const data = await response.json();
        setMovies(data);
      } catch (err) {
        setError("Error loading movies.");
      } finally {
        setLoading(false);
      }
    };

    if(movies.length === 0){
      fetchMovies();
    }
  }, [token]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <h2>Loading movies...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h2>{error}</h2>
      </div>
    );
  }

  // Filter movies based on category
  const highlightedMovies = movies.filter((item) => item.highlighted);
  const moviesByGenre = genresList.map((genre) => ({
    ...genre,
    movies: movies.filter((movie) => movie.genre === genre.id),
  }));
  const userListMovies = movies.filter((movie) => userList.includes(movie.id));

  const comingSoonMovies = movies
    .filter((movie) => new Date(movie.availableDate) > new Date())
    .sort(
      (a, b) =>
        new Date(a.availableDate).getTime() - new Date(b.availableDate).getTime()
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

