/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from "next/image";
import styles from "../page.module.css";
import { Movie } from "@/app/lib/types";
import { useUser } from "@/app/lib/UserContext";
import { useEffect, useState } from "react";
import { addToUserList } from "@/app/lib/api/addToUserList";
import { removeFromUserList } from "@/app/lib/api/removeFromUserList";
import { robotoCondensed } from "@/app/ui/fonts";

interface MovieActionsProps {
  movie: Movie;
  isInList: boolean;
}

export default function MovieActions({ movie, isInList }: MovieActionsProps) {
  const { token } = useUser();
  const [loading, setLoading] = useState(false);
  const [inList, setInList] = useState(isInList);
  const [error, setError] = useState("");
  const movieId = movie.id;

  useEffect(() => {
    setInList(isInList);
  }, [isInList]);

  const handleClick = async () => {
    if (!token) {
      setError("User is not authenticated");
      return;
    }

    setLoading(true);
    setError("");

    try {
      if (inList) {
        await removeFromUserList(movieId, token);
        setInList(false);
      } else {
        await addToUserList(movieId, token);
        setInList(true);
      }
    } catch (err) {
      setError("Failed to update list");
    }

    setLoading(false);
  };

  return (
    <section className={`${styles.actions} ${styles.margin}`}>
      <button
        onClick={handleClick}
        className={styles.actionWrapper + " " + styles.addToListButton}
        disabled={loading}
      >
        {loading ? (
          "Processing..."
        ) : inList ? (
          <div className={styles.actionWrapperButton}>
            <Image
              src="/remove-button.png"  
              alt="Add"
              width={41}
              height={40}
              className={styles.buttonIcon}
            />
            <span  className={`${styles.actionText} ${robotoCondensed.className}`}>Remove from List</span>
          </div>
        ) : (
          <div className={styles.actionWrapperButton}>
            <Image
              src="/plus-button.png"
              alt="Add"
              width={41}
              height={40}
              className={styles.buttonIcon}
            />
           <span  className={`${styles.actionText} ${robotoCondensed.className}`}>Add to My List</span>
          </div>
        )}
      </button>
      {error && <p className={styles.errorText}>{error}</p>}
    </section>
  );
}
