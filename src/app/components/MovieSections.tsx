"use client";

import GenreMovies from "./GenreMovies";
import MyListMovies from "./MyListMovies";
import ComingSoonMovies from "./ComingSoonMovies";
import GenreButtons from "./GenreButtons";
import { Genre, Movie } from "../lib/types";
import styles from "../page.module.css";

interface Props {
  movies: Movie[];
  genres: Genre[];
  userList: string[];
}

export default function MovieSections({ movies, genres, userList }: Props) {
  const moviesByGenre = genres.map((genre) => ({
    ...genre,
    movies: movies.filter((movie) => movie.genre === genre.id),
  }));

  const userListMovies = movies.filter((movie) => userList.includes(movie.id));

  const comingSoonMovies = movies
    .filter((movie) => new Date(movie.availableDate) > new Date())
    .sort((a, b) => new Date(a.availableDate).getTime() - new Date(b.availableDate).getTime());

  return (
    <div className={styles.contentWrapper}>
      <GenreButtons genres={genres} />
      <GenreMovies genres={moviesByGenre} />
      <ComingSoonMovies movies={comingSoonMovies} />
      <MyListMovies movies={userListMovies} />
    </div>
  );
}
