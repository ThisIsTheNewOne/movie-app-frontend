"use client";

import { useEffect, useState } from "react";
import { useUser } from "../UserContext";
import { useMovies } from "../MoviesContext";
import { Genre } from "../types";

export default function useFetchData() {
  const { token } = useUser();
  const { movies, setMovies } = useMovies();

  const [genres, setGenres] = useState<Genre[]>([]);
  const [userList, setUserList] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      setLoading(true);
      setError("");

      try {
        if (movies.length === 0) {
          const movieRes = await fetch("/api/films/movies", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          });

          if (!movieRes.ok) throw new Error("Failed to fetch movies");

          const movieData = await movieRes.json();
          setMovies(movieData);
        }

        if (genres.length === 0) {
          const genreRes = await fetch("/api/films/genres", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          });

          if (!genreRes.ok) throw new Error("Failed to fetch genres");

          const genreData = await genreRes.json();
          setGenres(genreData);
        }

        const userListRes = await fetch("/api/films/user", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!userListRes.ok) throw new Error("Failed to fetch user list");

        const userListData = await userListRes.json();
        setUserList(userListData);
      } catch (err: unknown) {
        if (err instanceof Error) {
            setError(err.message);
          } else {
            setError("An unknown error occurred");
          }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  return { movies, genres, userList, loading, error };
}
