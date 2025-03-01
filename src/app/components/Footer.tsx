import styles from '../page.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.column}>
          <a href="#">About Us</a>
          <a href="#">Contact</a>
          <a href="#">Blog</a>
          <a href="#">FAQ</a>
        </div>
        
        <div className={styles.column}>
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
        </div>
        
        <div className={styles.column}>
          <a href="#">Subscribe</a>
        </div>
        
        <div className={styles.column}>
          <a href="#">Social Media</a>
        </div>
      </div>
    </footer>
  );
}