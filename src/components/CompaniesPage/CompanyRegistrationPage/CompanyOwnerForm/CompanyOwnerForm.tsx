import styles from './CompanyOwnerForm.module.css';
import { useForm } from 'react-hook-form';

export interface CompanyOwnerFormValues {
  companyName: string;
  email: string;
  password: string;
  confirmPassword: string;
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
          className={`${styles.input} ${
            errors.companyName ? styles.inputError : ''
          }`}
          aria-invalid={Boolean(errors.companyName)}
          aria-describedby={
            errors.companyName ? 'companyName-error' : undefined
          }
          {...register('companyName', {
            required: 'Company name is required',
          })}
        />
        {errors.companyName?.message && (
          <div id="companyName-error" className={styles.error}>
            {errors.companyName.message}
          </div>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="email" className={styles.label}>
          Owner email
        </label>
        <input
          id="email"
          type="email"
          className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'email-error' : undefined}
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

      <div className={styles.field}>
        <label htmlFor="password" className={styles.label}>
          Password (min. 8 characters)
        </label>
        <input
          id="password"
          type="password"
          className={`${styles.input} ${
            errors.companyName ? styles.inputError : ''
          }`}
          aria-invalid={Boolean(errors.companyName)}
          aria-describedby={
            errors.companyName ? 'companyName-error' : undefined
          }
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters long',
            },
          })}
        />
        <label htmlFor="confirmPassword" className={styles.label}>
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          className={`${styles.input} ${
            errors.confirmPassword ? styles.inputError : ''
          }`}
          aria-invalid={!!errors.confirmPassword}
          aria-describedby={
            errors.confirmPassword ? 'confirmPassword-error' : undefined
          }
          {...register('confirmPassword', {
            required: 'Please confirm your password',
            validate: (value, formValues) =>
              value === formValues.password || 'Passwords do not match',
          })}
        />
        {errors.password?.message && (
          <div id="confirmPassword-error" className={styles.error}>
            {errors.confirmPassword?.message}
          </div>
        )}
      </div>

      {errorMessage &&
        <div className={styles.formError}>{errorMessage}</div>}

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
