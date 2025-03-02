/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import { useUser } from "../UserContext";
import { useMovies } from "../MoviesContext";
import { Movie } from "../types";

export default function useMovieDetails(title: string) {
  const { token } = useUser();
  const { movies, setMovies } = useMovies();

  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;

    const fetchMovies = async () => {
      setLoading(true);
      setError("");

      let movieList = movies;

      if (movies.length === 0) {
        try {
          const response = await fetch("/api/films/movies", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          });

          if (!response.ok) throw new Error("Failed to fetch movies");

          movieList = await response.json();
          setMovies(movieList);
        } catch (err) {
          setError("Error fetching movie list.");
          setLoading(false);
          return;
        }
      }

      const foundMovie = movieList.find(
        (m: Movie) => m.title.toLowerCase() === title.toLowerCase()
      );

      if (!foundMovie) {
        setError("Movie not found");
        setLoading(false);
        return;
      }

      fetchMovieDetails(foundMovie.id);
    };

    fetchMovies();
  }, [token, title, movies]);

  const fetchMovieDetails = async (id: string) => {
    try {
      const response = await fetch(`/api/films/movies/${id}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Failed to fetch movie details");

      const movieData = await response.json();
      setMovie(movieData);
    } catch (err) {
      setError("Error loading movie details.");
    } finally {
      setLoading(false);
    }
  };

  return { movie, loading, error };
}
