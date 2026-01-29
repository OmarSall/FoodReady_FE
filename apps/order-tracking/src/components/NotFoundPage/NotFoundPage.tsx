import { useLocation } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

function NotFoundPage() {
  const location = useLocation();
  return (
    <main className={styles.page} aria-labelledby="not-found-title">
      <section className={styles.card}>
        <header className={styles.header}>
          <h1 id="not-found-title" className={styles.title}>
            Invalid tracking link
          </h1>

          <p className={styles.subtitle}>
            We could not find any page that matches{" "}
            <span className={styles.mono}>{location.pathname}</span>.
          </p>
        </header>

        <div className={styles.stateBoxError}>
          <h2 className={styles.stateTitle}>404</h2>
          <p className={styles.stateText}>
            Please check the link from your QR code and
            try again.
          </p>
        </div>
      </section>
    </main>
  );
}
export default NotFoundPage;