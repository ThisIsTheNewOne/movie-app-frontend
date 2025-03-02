"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "../page.module.css";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
// import { useUser } from "../lib/UserContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const pathname = usePathname();
  // const { setUserFunction } = useUser();

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
  };

  const handleSignOut = () => {
    router.push("/login");
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    }

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
    <nav className={styles.header}>
      <div>
        {pathname.startsWith("/movies/") && (
          <button onClick={() => router.back()} className={styles.goBackButton}>
            Go Back
          </button>
        )}
        <div className={styles.userLogoContainer} onClick={toggleMenu}>
          <Image
            src="/user-logo.png"
            alt="User Logo"
            width={46}
            height={46}
            className={styles.userLogo}
          />
        </div>
      </div>

      {menuOpen && (
        <div ref={dropdownRef} className={styles.dropdownMenu}>
          {/* User Info */}
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

          {/* Dropdown Buttons */}
          <button className={styles.dropdownItem}>Account Settings</button>

          {/* Theme Toggle */}
          <button onClick={toggleTheme} className={styles.dropdownItem}>
            {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
          </button>

          {/* Sign Out */}
          <button
            onClick={handleSignOut}
            className={styles.heroButton + " " + styles.signOutItem}
          >
            Sign Out
          </button>
        </div>
      )}
    </nav>
  );
}
