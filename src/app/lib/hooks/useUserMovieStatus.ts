"use client";

import { useEffect, useState } from "react";
import { useUser } from "../UserContext";
import { Movie } from "../types";

export default function useUserMovieStatus(movie: Movie | null) {
  const { token } = useUser();
  const [isInList, setIsInList] = useState(false);

  useEffect(() => {
    if (!token || !movie) return;

    const checkUserList = async () => {
      try {
        const response = await fetch("/api/films/user", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Failed to fetch user list");

        const userList = await response.json();
        setIsInList(userList.includes(movie.id));
      } catch (error) {
        console.error("Error fetching user list", error);
      }
    };

    checkUserList();
  }, [token, movie]);

  return { isInList };
}
