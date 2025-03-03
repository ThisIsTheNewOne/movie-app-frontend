"use client";

import styles from "../page.module.css";

interface InputFieldProps {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export default function InputField({ type, name, placeholder, value, onChange, error }: InputFieldProps) {
  return (
    <div className={styles.inputWrapper}>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`${styles.input} ${error ? styles.error : ""}`}
      />
      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  );
}
