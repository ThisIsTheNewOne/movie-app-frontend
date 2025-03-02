"use client";

import { useRef, useEffect } from "react";
// import Image from "next/image";
import useSignOut from "@/app/lib/hooks/useSignOut";
import styles from "../page.module.css";

interface UserDropdownProps {
  closeDropdown: () => void;
  darkMode: boolean;
  toggleTheme: () => void;
}

export default function UserDropdown({ closeDropdown, darkMode, toggleTheme }: UserDropdownProps) {
  const { handleSignOut, loading, error } = useSignOut();
  const dropdownRef = useRef<HTMLDivElement>(null);

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
          <p className={styles.userName}>John Doe</p>
          <p className={styles.userEmail}>johndoe@example.com</p>
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
