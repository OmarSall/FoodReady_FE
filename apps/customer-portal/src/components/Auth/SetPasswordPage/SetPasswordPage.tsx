import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setPassword } from '../../../api/authenticationApi';
import { ROUTES } from '../../../constants/routes';
import SetPasswordForm, {
  type SetPasswordFormValues,
} from './SetPasswordForm/SetPasswordForm';
import styles from './SetPasswordPage.module.css';
import { useInviteToken } from './useInviteToken.ts';

function SetPasswordPage() {
  const navigate = useNavigate();
  const token = useInviteToken();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!token) {
    navigate(ROUTES.HOME, { replace: true });
    return null;
  }

  const handleSubmit = async (values: SetPasswordFormValues) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      await setPassword({ token, password: values.password });
      navigate(ROUTES.LOGIN, {
        state: { inviteSuccess: true },
        replace: true,
      });
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
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
        <SetPasswordForm
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          errorMessage={errorMessage}
        />
      </div>
    </main>
  );
}

export default SetPasswordPage;