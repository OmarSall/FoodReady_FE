import { useForm } from 'react-hook-form';
import styles from './LoginForm.module.css';
import FormInput from '../../../Form/FormInput';

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
  isSubmitting,
  errorMessage,
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
      <FormInput
        id="email"
        label="Email"
        type="email"
        register={register('email', {
          required: 'Email is required',
          pattern: {
            value: /^\S+@\S+\.\S+$/,
            message: 'Please enter a valid email address',
          },
        })}
        error={errors.email}
      />
      <FormInput
        id="password"
        label="Password"
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
      {errorMessage && <div className={styles.formError}>{errorMessage}</div>}
      <button
        type="submit"
        disabled={isSubmitting}
        className={styles.submitButton}
      >
        {isSubmitting ? 'Logging in...' : 'Log in'}
      </button>
    </form>
  );
}
export default LoginForm;
