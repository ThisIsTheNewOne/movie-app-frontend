"use client";
import styles from "../page.module.css"

interface SubmitButtonProps {
  loading: boolean;
}

export default function SubmitButton({ loading }: SubmitButtonProps) {
  return (
    <button type="submit" className={styles.button} disabled={loading}>
      {loading ? "Signing in..." : "Sign In"}
    </button>
  );
}
