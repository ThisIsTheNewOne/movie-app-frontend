/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import styles from "../page.module.css";
import { useUser } from "../lib/UserContext";
import { signOut } from "../lib/api/signOut";

export default function Navbar() {
  const { token, setUserFunction, setTokenFunction } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const pathname = usePathname();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
  };

  const handleSignOut = async () => {
    if (!token) return;
    
    setLoading(true);
    setError("");

    try {
      await signOut(token);
      setUserFunction(undefined); 
      setTokenFunction(null); 
      router.push("/login"); 
    } catch (err) {
      setError("Failed to sign out");
    }

    setLoading(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.navLeft}>
          {pathname.startsWith("/movies/") && (
            <button onClick={() => router.back()} className={styles.goBackButton}>
              Go Back
            </button>
          )}
        </div>
        <div className={styles.navRight}>
          <div className={styles.userLogoContainer} onClick={toggleMenu}>
            <Image
              src="/user-logo.png"
              alt="User Logo"
              width={46}
              height={46}
              className={styles.userLogo}
            />
          </div>
          {menuOpen && (
            <div ref={dropdownRef} className={styles.dropdownMenu}>
              <div className={styles.userInfo}>
                <Image
                  src="/user-logo.png"
                  alt="Profile Picture"
                  width={50}
                  height={50}
                  className={styles.profilePic}
                />
                <div className={styles.userDetails}>
                  <p className={styles.userName}>John Doe</p>
                  <p className={styles.userEmail}>johndoe@example.com</p>
                </div>
              </div>
              <button className={styles.dropdownItem}>Account Settings</button>
              <button onClick={toggleTheme} className={styles.dropdownItem}>
                {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
              </button>
              <button
                onClick={handleSignOut}
                className={`${styles.dropdownItem} ${styles.signOutItem}`}
                disabled={loading}
              >
                {loading ? "Signing out..." : "Sign Out"}
              </button>
              {error && <p className={styles.errorText}>{error}</p>}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
