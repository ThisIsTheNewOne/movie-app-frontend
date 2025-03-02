"use client";

import { useRef, useEffect, useState } from "react";
// import Image from "next/image";
import useSignOut from "@/app/lib/hooks/useSignOut";
import styles from "../page.module.css";
import { useUser } from "../lib/UserContext";

interface UserDropdownProps {
  closeDropdown: () => void;
  darkMode: boolean;
  toggleTheme: () => void;
}

export default function UserDropdown({ closeDropdown, darkMode, toggleTheme }: UserDropdownProps) {
  const { userName: contextUserName } = useUser();
  const { handleSignOut, loading, error } = useSignOut();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [userName, setUserName] = useState<string | null>(contextUserName);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    if (!contextUserName) {
      const storedUserName = localStorage.getItem("userName");
      setEmail(storedUserName || "demo.user@email.com");
      setUserName(parseEmailToName(storedUserName) || "Demo User");
    } else {
      setUserName(parseEmailToName(contextUserName));
    }
  }, [contextUserName]);

  const parseEmailToName = (email: string | null) => {
    if (!email) return null;
    const [namePart] = email.split("@");
    const [firstName, lastName] = namePart.split(".");
    return `${capitalize(firstName)} ${capitalize(lastName)}`;
  };

  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeDropdown]);

  return (
    <div ref={dropdownRef} className={styles.dropdownMenu}>
      <div className={styles.userInfo}>
        {/* <Image src="/user-logo.png" alt="Profile Picture" width={50} height={50} className={styles.profilePic} /> */}
        <div className={styles.userDetails}>
          <p className={styles.userName}>{userName}</p>
          <p className={styles.userEmail}>{email}</p>
        </div>
      </div>
      <button className={styles.dropdownItem}>Account Settings</button>
      <button onClick={toggleTheme} className={styles.dropdownItem}>
        {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
      </button>
      <button onClick={handleSignOut} className={`${styles.dropdownItem} ${styles.signOutItem}`} disabled={loading}>
        {loading ? "Signing out..." : "Sign Out"}
      </button>
      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  );
}
