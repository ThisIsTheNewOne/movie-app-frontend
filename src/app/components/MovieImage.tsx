"use client";
import Image from "next/image";
import { useState } from "react";
import styles from "../page.module.css";

type Props = { src: string };

export default function MovieImage({ src }: Props) {
    const [imgSrc, setImgSrc] = useState(src);
  
    return (
      <div className={styles.imageContainer}>
        <Image
          src={imgSrc}
          alt="Movie Background"
          width={3000}
          height={0}
          className={styles.backgroundImage}
          onError={() => setImgSrc("/fallback-image.jpg")}
          priority
        />
      </div>
    );
  }