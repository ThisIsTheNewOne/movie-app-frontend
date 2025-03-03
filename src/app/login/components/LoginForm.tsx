/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import styles from "../page.module.css";
import { useUser } from "@/app/lib/UserContext";
import { useRouter } from "next/navigation";
import InputField from "./InputField";
import ErrorMessage from "./ErrorMessage";
import SubmitButton from "./SubmitButton";


export default function LoginForm() {
  const { setUserFunction, setUserName, setTokenFunction, token } = useUser();
  const router = useRouter();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    if (token) {
      router.push("/");
    }
  }, [token, router]);

  const validateForm = () => {
    const newErrors = { email: "", password: "" };
    let isValid = true;

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
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Invalid credentials");

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
    <form className={styles.innerContainer} onSubmit={handleSignIn}>
      <InputField
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleInputChange}
        error={errors.email}
      />
      <InputField
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleInputChange}
        error={errors.password}
      />
      {apiError && <ErrorMessage message={apiError} />}
      <SubmitButton loading={loading} />
    </form>
  );
}
