"use client";

import { useState } from "react";
import styles from "./page.module.css";
import { roboto } from "@/app/ui/fonts";
import { useUser } from "../lib/UserContext";
import { redirect } from "next/navigation";

export default function Page() {
  const { setUserFunction } = useUser();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      username: "",
      password: "",
    };

    // Username/email validation
    if (!formData.username) {
      newErrors.username = "Username is required";
      isValid = false;
    } else if (
      !formData.username.includes("@") &&
      formData.username.length < 3
    ) {
      newErrors.username = "Enter a valid email or username (min 3 characters)";
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  // Clear error for the input being changed
  setErrors(prev => ({
    ...prev,
    [name]: ""
  }));
    
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setUserFunction(true);
      redirect("/");
    }
  };

  return (
    <div className={`${styles.page} ${styles.heroBackground}`}>
      <main className={styles.main}>
        <div className={styles.loginBox}>
          <form className={styles.innerContainer} onSubmit={handleSignIn}>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                name="username"
                placeholder="Username"
                className={`${roboto.className} ${styles.input} ${
                  styles.bold
                } ${errors.username ? styles.error : ""}`}
                value={formData.username}
                onChange={handleInputChange}
              />
              {errors.username && (
                <span className={styles.errorText}>{errors.username}</span>
              )}
            </div>
            <div className={styles.inputWrapper}>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className={`${roboto.className} ${styles.input} ${
                  styles.bold
                } ${errors.username ? styles.error : ""}`}
                value={formData.password}
                onChange={handleInputChange}
              />
              {errors.password && (
                <span className={styles.errorText}>{errors.password}</span>
              )}
            </div>
            <button
              type="submit"
              className={`${styles.button} ${styles.normal}`}
            >
              Sign In
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
