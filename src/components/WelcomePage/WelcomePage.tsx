import styles from './WelcomePage.module.css';
import { Link } from 'react-router-dom';

function WelcomePage() {
  return (
    <>
      <main className={styles.page}>
        <section className={styles.card}>
          <h1 className={styles.title}>Welcome to FoodReady App</h1>
          <p className={styles.subtitle}>
            A simple workflow for owners and employees to manage their company
            account.
          </p>
          <div className={styles.actions}>
            <Link to="/register-company" className={styles.primaryButton}>
              Register Company (owner)
            </Link>
            <Link to="/login" className={styles.secondaryButton}>
              Log in
            </Link>
            <p className={styles.helperText}>
              Owners register a company and create employee accounts. Employees
              and owners that registered their company can login.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}

export default WelcomePage;
