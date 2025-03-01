import Image from "next/image";
import styles from "./page.module.css";
import { roboto } from "@/app/ui/fonts";
import Link from 'next/link';
// import clsx from "clsx";

export default function Home() {

  const link = {
    name: "Link",
    href: "/login",
  };

  return (
    <div className={`${styles.page}`}>
      <main className={styles.main}>
        <p
          className={`${roboto.className}`}
        >
          <strong>Test</strong> and another test
        </p>
        <div>
           <Link
             key={link.name}
             href={link.href}
          >
             <p>{link.name}</p>
          </Link>
        </div>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
