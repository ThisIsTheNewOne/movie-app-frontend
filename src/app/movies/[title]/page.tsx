/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Footer from "@/app/components/Footer";
import styles from "./page.module.css";
import MovieHero from "./components/MovieHero";
import MovieActions from "./components/MovieAction";
import MovieDetails from "./components/MovieDetails";
import MovieDescription from "./components/MovieDescription";
import Navbar from "@/app/components/Navbar";
import { use, useEffect } from "react";
import useMovieDetails from "@/app/lib/hooks/useMovieDetails";
import useUserMovieStatus from "@/app/lib/hooks/useUserMovieStatus";
import { useUser } from "@/app/lib/UserContext";
import { redirect } from "next/navigation";

interface MoviePageProps {
  params: Promise<{ title: string }>;
}

export default function MoviePage({ params }: MoviePageProps) {
    const { user } = useUser();
  const { title } = use(params);
  const decodedTitle = decodeURIComponent(title);

  const { movie, loading, error } = useMovieDetails(decodedTitle);
  const { isInList } = useUserMovieStatus(movie);

    useEffect(() => {
      if (user === undefined || user === false) {
        const timer = setTimeout(() => {
          redirect("/login");
        }, 2000); 
  
        return () => clearTimeout(timer); 
      }
    }, [user]);

  if (loading) return <p>Loading movie details...</p>;
  if (error) return <p>{error}</p>;
  if (!movie) return <p>Movie not found.</p>;

  return (
    <div className={styles.container}>
      <Navbar />   
      <main className={styles.main}>
        <MovieHero
          poster={movie.poster || "/fallback-image.jpg"}
          thumbnail={movie.thumbnail || "/fallback-image.jpg"}
          title={movie.title || "Unknown Movie"}
        />
        <MovieActions movie={movie} isInList={isInList} />
        <MovieDetails
          rating={Number(movie.rating) || 0}
          cast={movie.cast || "Unknown"}
          genre={movie.genre || "Unknown"}
        />
        <MovieDescription title={movie.title || "Unknown"} description={movie.description || ""} />
      </main>
      <Footer />
    </div>
  );
}