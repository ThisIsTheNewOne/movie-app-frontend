"use client";

import { redirect } from "next/navigation";
import { useUser } from "./lib/UserContext";
import useFetchData from "./lib/hooks/useFetchData";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Carousel from "./components/Carousel";
import MovieSections from "./components/MovieSections";
import styles from "./page.module.css";
import { useEffect } from "react";
import Loader from "./components/Loader";

export default function Home() {
  const { user } = useUser();
  const { movies, genres, userList, loading, error } = useFetchData();

  useEffect(() => {
    if (user === undefined || user === false) {
      const timer = setTimeout(() => {
        redirect("/login");
      }, 4000); 

      return () => clearTimeout(timer); 
    }
  }, [user]);


  if (loading) {
    return (
      <main className={styles.mainLoading}>
        <div className={styles.loadingContainerMain}>
          <Loader />
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <div className={styles.page}>   
      <Navbar />
      <main className={styles.main}>
        <Carousel movies={movies.filter((item) => item.highlighted)} />
        <MovieSections movies={movies} genres={genres} userList={userList} />  
      </main>
      <Footer />
    </div>
  );
}
