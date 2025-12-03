import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../auth/AuthContext';
import { useEffect, useState } from 'react';
import { logIn } from '../../../api/loginApi';
import LoginForm, { type LoginFormValues } from './LoginForm/LoginForm';
import { ApiError } from '../../../http/api-error';
import styles from './LoginPage.module.css';

function LoginPage() {
  const navigate = useNavigate();
  const { isAuthenticated, refreshUser } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (values: LoginFormValues) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      await logIn(values);
      await refreshUser();
      navigate('/', { replace: true });
    } catch (error) {
      if (error instanceof ApiError) {
        setErrorMessage(error.message || 'Failed to log in.');
      } else {
        setErrorMessage('Unexpected error. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <LoginForm
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          errorMessage={errorMessage}
        />

        <div className={styles.links}>
          <p className={styles.linkText}>
            Don't have a company yet?{' '}
            <Link to="/register-company" className={styles.link}>
              Register your company
            </Link>
          </p>
          <p className={styles.linkText}>
            Back to{' '}
            <Link to="/" className={styles.link}>
              welcome page
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
export default LoginPage;
