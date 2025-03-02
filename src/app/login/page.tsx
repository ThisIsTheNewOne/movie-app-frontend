/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { roboto } from "@/app/ui/fonts";
import { useUser } from "../lib/UserContext";
import { useRouter } from "next/navigation";

export default function Page() {
  const { setUserFunction, setUserName, setTokenFunction, token  } = useUser();
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");


  useEffect(() => {
    if (token) {
      router.push("/");
    }
  }, [token, router]);
  

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      email: "",
      password: "",
    };

    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!formData.email.includes("@")) {
      newErrors.email = "Enter a valid email";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    setLoading(true);
    setApiError("");
  
    try {
      const response = await fetch("/api/auth/sign-in", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Invalid credentials");
      }
  
      const data = await response.json();

      setUserName(formData.email);
      setTokenFunction(data.token);
      setUserFunction(true);

      router.push("/");
    } catch (error) {
      setApiError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${styles.page} ${styles.heroBackground}`}>
      <main className={styles.main}>
        <div className={styles.loginBox}>
          <form className={styles.innerContainer} onSubmit={handleSignIn}>
            <div className={styles.inputWrapper}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className={`${roboto.className} ${styles.input} ${styles.bold} ${
                  errors.email ? styles.error : ""
                }`}
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && <span className={styles.errorText}>{errors.email}</span>}
            </div>
            <div className={styles.inputWrapper}>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className={`${roboto.className} ${styles.input} ${styles.bold} ${
                  errors.password ? styles.error : ""
                }`}
                value={formData.password}
                onChange={handleInputChange}
              />
              {errors.password && <span className={styles.errorText}>{errors.password}</span>}
            </div>
            {apiError && <span className={styles.errorText}>{apiError}</span>}
            <button type="submit" className={`${styles.button} ${styles.normal}`} disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
