import {
  Link,
  useNavigate,
} from 'react-router-dom';
import { useState } from 'react';
import { logIn } from '../../../api/authenticationApi';
import LoginForm, { type LoginFormValues } from './LoginForm/LoginForm';
import { ApiError } from "@foodready/shared";
import styles from './LoginPage.module.css';
import { useAuth } from '../../../auth/authContext';
import { ROUTES } from '../../../constants/routes';

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (values: LoginFormValues) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const user = await logIn(values);
      login(user);
      navigate(ROUTES.ORDERS, { replace: true });
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
            <Link to={ROUTES.REGISTER_COMPANY} className={styles.link}>
              Register your company
            </Link>
          </p>
          <p className={styles.linkText}>
            Back to{' '}
            <Link to={ROUTES.HOME} className={styles.link}>
              welcome page
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;
