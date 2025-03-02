"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import styles from "../page.module.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const pathname = usePathname();

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
  };

  const handleSignOut = () => {
    router.push("/login");
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
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
