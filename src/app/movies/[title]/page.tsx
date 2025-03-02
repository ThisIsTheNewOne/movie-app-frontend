/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Footer from "@/app/components/Footer";
import movie from "../../lib/data/there-will-be-blood-movie.json";
import styles from "./page.module.css";
import MovieHero from "./components/MovieHero";
import MovieActions from "./components/MovieAction";
import MovieDetails from "./components/MovieDetails";
import MovieDescription from "./components/MovieDescription";
import Navbar from "@/app/components/Navbar";
import { use, useEffect, useState } from "react";
import { useUser } from "@/app/lib/UserContext";
import { Movie } from "@/app/lib/types";
import { useMovies } from "@/app/lib/MoviesContext";

interface MoviePageProps {
  params: Promise<{ title: string }>; 
}

export default function MoviePage({ params }: MoviePageProps) {
  const { token } = useUser();
  const { title } = use(params); 
  const decodedTitle = decodeURIComponent(title);

  const { movies } = useMovies();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  console.log("this ist he id", title);

  useEffect(() => {
    if (!token) return;

    const fetchMoviesList = async () => {
      setLoading(true);
      setError("");

    
      const foundMovie = movies.find(
        (m: Movie) => m.title.toLowerCase() === decodedTitle.toLowerCase()
      );

        if (!foundMovie) {
          setError("Movie not found");
          setLoading(false);
          return;
        }

        fetchMovieDetails(foundMovie.id);
    };

    fetchMoviesList();
  }, [token, title, movies]);

  const fetchMovieDetails = async (id: string) => {
    try {
      const response = await fetch(`/api/films/movies/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch movie details");
      }

      const movieData = await response.json();
      setMovie(movieData);
    } catch (err) {
      setError("Error loading movie details.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading movie details...</p>;
  if (error) return <p>{error}</p>;
  if (!movie) return <p>Movie not found.</p>;

  return (
    <div className={styles.container}>
      <Navbar />
      <main className={styles.main}>
        <MovieHero
           poster={movie?.poster || "/fallback-image.jpg"}
           thumbnail={movie?.thumbnail || "/fallback-image.jpg"}
           title={movie?.title || "Unknown Movie"}
        />
        <MovieActions />
        <MovieDetails
          rating={Number(movie?.rating) || 0}
          cast={movie?.cast || "Unknown"}
          genre={movie?.genre || "Unknown"}
        />
        <MovieDescription title={movie?.title || "Unknown"} description={movie?.description || ""} />
      </main>
      <Footer />
    </div>
  );
}
