import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import styles from './NotFoundPage.module.css';

const DEFAULT_PUBLIC_PATH = '/';
const DEFAULT_DASHBOARD_PATH = '/orders';

function NotFoundPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const getDefaultRedirectPath = () => {
    if (!isAuthenticated) {
      return DEFAULT_PUBLIC_PATH;
    }
    return DEFAULT_DASHBOARD_PATH;
  };

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(getDefaultRedirectPath(), { replace: true });
    }
  };

  const handleGoHome = () => {
    navigate(getDefaultRedirectPath(), { replace: true });
  };

  return (
    <main className={styles.page} aria-labelledby="not-found-title">
      <section className={styles.card}>
        <div className={styles.codeWrapper}>
          <span className={styles.code}>404</span>
        </div>

        <h1 id="not-found-title" className={styles.title}>
          Page not found
        </h1>

        <p className={styles.subtitle}>
          We could not find any page that matches{' '}
          <span className={styles.path}>{location.pathname}</span>.
        </p>

        <p className={styles.description}>
          The link may be incorrect, expired, or you might not have access to
          this resource. Use one of the options below to continue working in the
          app.
        </p>

        <div className={styles.actions}>
          <button
            type="button"
            onClick={handleGoBack}
            className={styles.secondaryButton}
          >
            Go back
          </button>

          <button
            type="button"
            onClick={handleGoHome}
            className={styles.primaryButton}
          >
            Go to dashboard
          </button>
        </div>
      </section>
    </main>
  );
}

export default NotFoundPage;
