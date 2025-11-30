import { useForm } from 'react-hook-form';
import styles from './LoginForm.module.css';

export interface LoginFormValues {
  email: string;
  password: string;
}

interface LoginFormProps {
  onSubmit: (values: LoginFormValues) => void;
  isSubmitting: boolean;
  errorMessage: string | null;
}

function LoginForm({
  onSubmit,
  isSubmitting = false,
  errorMessage = null,
}: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={styles.title}>Log in</h1>
      <div className={styles.field}>
        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <input
          id="email"
          type="email"
          className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'email-error' : undefined}
          autoComplete="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: 'Please enter a valid email address',
            },
          })}
        />
        {errors.email?.message && (
          <div id="email-error" className={styles.error}>
            {errors.email.message}
          </div>
        )}
      </div>
      <label htmlFor="password" className={styles.label}>
        Password (min. 8 characters)
      </label>
      <input
        id="password"
        type="password"
        className={`${styles.input} ${
          errors.password ? styles.inputError : ''
        }`}
        aria-invalid={!!errors.password}
        aria-describedby={errors.password ? 'password-error' : undefined}
        {...register('password', {
          required: 'Password is required',
          minLength: {
            value: 8,
            message: 'Password must be at least 8 characters long',
          },
        })}
      />
      {errors.password?.message && (
        <div className={styles.error}>{errors.password.message}</div>
      )}
      {errorMessage && <div className={styles.formError}>{errorMessage}</div>}
      <button>{isSubmitting ? 'Logging in...' : 'Log in'}</button>
    </form>
  );
}
export default LoginForm;
