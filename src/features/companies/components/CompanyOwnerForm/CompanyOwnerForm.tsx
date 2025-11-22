import styles from './CompanyOwnerForm.module.css';
import { useForm } from 'react-hook-form';

export interface CompanyOwnerFormValues {
  companyName: string;
  email: string;
  password: string;
}

interface CompanyOwnerFormProps {
  onSubmit: (values: CompanyOwnerFormValues) => void;
  isSubmitting?: boolean;
  errorMessage?: string | null;
}

function CompanyOwnerForm({
  onSubmit,
  isSubmitting = false,
  errorMessage = null,
}: CompanyOwnerFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyOwnerFormValues>({
    defaultValues: {
      companyName: '',
      email: '',
      password: '',
    },
  });

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={styles.title}>Register your company</h1>

      <div className={styles.field}>
        <label htmlFor="companyName" className={styles.label}>
          Company name
        </label>
        <input
          id="companyName"
          type="text"
          className={styles.input}
          {...register('companyName', {
            required: 'Company name is required',
          })}
        />
        {errors.companyName && (
          <div className={styles.error}>{errors.companyName.message}</div>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="email" className={styles.label}>
          Owner email
        </label>
        <input
          id="email"
          type="email"
          className={styles.input}
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: 'Please enter a valid email address',
            },
          })}
        />
        {errors.email && (
          <div className={styles.error}>{errors.email.message}</div>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="password" className={styles.label}>
          Password (min. 8 characters)
        </label>
        <input
          id="password"
          type="password"
          className={styles.input}
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters long',
            },
          })}
        />
        {errors.password && (
          <div className={styles.error}>{errors.password.message}</div>
        )}
      </div>

      {errorMessage && <div className={styles.error}>{errorMessage}</div>}

      <button
        type="submit"
        className={styles.submitButton}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Registering...' : 'Register company'}
      </button>
    </form>
  );
}

export default CompanyOwnerForm;
