import { useForm } from 'react-hook-form';
import FormInput from '../../../Form/FormInput';
import styles from './SetPasswordForm.module.css';

export interface SetPasswordFormValues {
  password: string;
  confirmPassword: string;
}

interface SetPasswordFormProps {
  onSubmit: (values: SetPasswordFormValues) => Promise<void> | void;
  isSubmitting?: boolean;
  errorMessage?: string | null;
}

function SetPasswordForm({
                           onSubmit,
                           isSubmitting = false,
                           errorMessage = null,
                         }: SetPasswordFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SetPasswordFormValues>({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={styles.title}>Set your password</h1>

      <FormInput
        id="password"
        label="New password"
        type="password"
        register={register('password', {
          required: 'Password is required',
          minLength: {
            value: 8,
            message: 'Password must be at least 8 characters long',
          },
        })}
        error={errors.password}
      />

      <FormInput
        id="confirmPassword"
        label="Confirm password"
        type="password"
        register={register('confirmPassword', {
          required: 'Please confirm your password',
          validate: (value) =>
            value === watch('password') || 'Passwords do not match',
        })}
        error={errors.confirmPassword}
      />

      {errorMessage && (
        <div className={styles.formError}>{errorMessage}</div>
      )}

      <button
        type="submit"
        className={styles.submitButton}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Setting password...' : 'Set password'}
      </button>
    </form>
  );
}

export default SetPasswordForm;