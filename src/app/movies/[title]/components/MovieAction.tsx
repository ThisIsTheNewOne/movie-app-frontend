import Image from "next/image";
import styles from "../page.module.css";
import { Movie } from "@/app/lib/types";
import { useUser } from "@/app/lib/UserContext";
import { useState } from "react";
import { addToUserList } from "@/app/lib/api/addToUserList";

interface MovieActionsProps {
  movie: Movie;
}

export default function MovieActions({ movie }: MovieActionsProps) {
  const { token } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const movieId = movie.id;

  const handleAddToList = async () => {
    if (!token) {
      setError("User is not authenticated");
      return;
    }

    setLoading(true);
    setError("");

    const result = await addToUserList(movieId, token);

    if (result.error) {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <section className={`${styles.actions} ${styles.margin}`}>
      <button  onClick={handleAddToList} className={styles.actionWrapper + "" + styles.addToListButton} disabled={loading} >
        {loading ? "Adding..." : 
        <div>
          <Image
            src="/plus-button.png"
            alt="Add"
            width={24}
            height={24}
            className={styles.buttonIcon}
          />
          <span className={styles.actionText}>Add to My List</span>
        </div>}
      </button>
      {error && <p className={styles.errorText}>{error}</p>}
    </section>
  );
}
