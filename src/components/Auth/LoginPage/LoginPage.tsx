import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../auth/AuthContext.tsx';
import { useState } from 'react';
import { logIn } from '../../../api/loginApi.ts';
import LoginForm, { type LoginFormValues } from './LoginForm/LoginForm.tsx';
import { ApiError } from '../../../http/api-error.ts';
import styles from './LoginPage.module.css';

function LoginPage() {
  const navigate = useNavigate();
  const { refreshUser } = useAuth();
  const { login } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (values: LoginFormValues) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const authenticatedUser = await logIn(values);
      if (authenticatedUser.position === 'OWNER') {
        navigate('/owner', { replace: true });
      } else {
        navigate('/employee', { replace: true });
      }
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
