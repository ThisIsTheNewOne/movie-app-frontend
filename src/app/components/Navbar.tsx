"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import UserDropdown from "./UserDropdown";
import styles from "../page.module.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");  
  };

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
            <Image src="/user-logo.png" alt="User Logo" width={46} height={46} className={styles.userLogo} />
          </div>
          {menuOpen && <UserDropdown closeDropdown={closeMenu} darkMode={darkMode} toggleTheme={toggleTheme} />}
        </div>
      </nav>
    </header>
  );
}