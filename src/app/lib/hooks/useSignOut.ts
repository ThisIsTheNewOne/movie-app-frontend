/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../UserContext";
import { signOut } from "../api/signOut";

export default function useSignOut() {
  const { token, setUserFunction, setTokenFunction } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignOut = async () => {
    if (!token) return;

    setLoading(true);
    setError("");

    try {
      await signOut(token);
      setUserFunction(undefined); // ✅ Clear user session
      setTokenFunction(null); // ✅ Remove JWT token
      router.push("/login"); // ✅ Redirect to login
    } catch (err) {
      setError("Failed to sign out");
    }

    setLoading(false);
  };

  return { handleSignOut, loading, error };
}
