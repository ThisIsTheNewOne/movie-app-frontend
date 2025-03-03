"use client";
import styles from "../page.module.css"


interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return <p className={styles.errorText}>{message}</p>;
}
