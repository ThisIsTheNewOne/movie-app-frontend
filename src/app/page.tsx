"use client";

// import Image from "next/image";
import styles from "./page.module.css";
// import { roboto } from "@/app/ui/fonts";
import { redirect } from "next/navigation";
// import Link from "next/link";
import { useUser } from "./lib/UserContext";
import { useRef } from "react";
// import clsx from "clsx";

export default function Home() {
  // const link = {
  //   name: "Link",
  //   href: "/login",
  // };

  const { user } = useUser();
  const carouselRef = useRef<HTMLDivElement>(null);

  if (user === undefined) {
    redirect("/login");
  }

  const carouselItems = [
    {
      "title": "Movie 1",
      "description": "Description for Movie 1"
    },
    {
      "title": "Movie 2",
      "description": "Description for Movie 2"
    },
    {
      "title": "Movie 3",
      "description": "Description for Movie 3"
    },
    {
      "title": "Movie 4",
      "description": "Description for Movie 4"
    }
  ]

  const scrollToItem = (index: number) => {
    if (carouselRef.current) {
      const itemWidth = carouselRef.current.scrollWidth / carouselItems.length;
      carouselRef.current.scrollTo({
        left: itemWidth * index,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={`${styles.page}`}>
      <nav className={styles.header}>test</nav>
      <main className={styles.main}>
       <section className={styles.carouselContainer}>
          <div className={styles.carousel} ref={carouselRef}>
            {carouselItems.map((item, index) => (
              <div key={index} className={styles.carouselItem}>
                <h1>{item.title}</h1>
                <section>
                  <p>{item.description}</p>
                </section>
              </div>
            ))}
          </div>
           <div className={styles.carouselButtons}>
            {carouselItems.map((_, index) => (
              <button 
                key={index} 
                onClick={() => scrollToItem(index)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </section>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
