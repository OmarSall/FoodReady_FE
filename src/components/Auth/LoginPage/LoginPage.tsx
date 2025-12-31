import {
  Link,
  useLocation,
  useNavigate,
  type Location,
} from 'react-router-dom';
import { useState } from 'react';
import { logIn } from '../../../api/authenticationApi';
import LoginForm, { type LoginFormValues } from './LoginForm/LoginForm';
import { ApiError } from '../../../http/api-error';
import styles from './LoginPage.module.css';
import { useAuth } from '../../../auth/AuthContext';
import { ROUTES } from '../../../constants/routes';

interface LocationState {
  from?: Location;
}

function resolveTargetPath(fromPathname: string | null): string {
  if (!fromPathname) {
    return ROUTES.ORDERS;
  }

  if (fromPathname === ROUTES.HOME) {
    return ROUTES.ORDERS
  }

  return fromPathname;
}

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const state = location.state as LocationState | undefined;
  const fromPathname = state?.from?.pathname ?? null;
  const targetPath = resolveTargetPath(fromPathname)

  const handleSubmit = async (values: LoginFormValues) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const user = await logIn(values);
      login(user);
      navigate(targetPath, { replace: true });
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
