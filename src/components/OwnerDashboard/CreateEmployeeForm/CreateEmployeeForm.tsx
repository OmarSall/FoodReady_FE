import { useForm } from 'react-hook-form';
import styles from './CreateEmployeeForm.module.css';
import { useEffect } from 'react';

export interface CreateEmployeeFormValues {
  name: string;
  email: string;
}

interface CreateEmployeeFormProps {
  onSubmit: (values: CreateEmployeeFormValues) => void;
  isSubmitting: boolean;
  errorMessage?: string | null;
  successMessage?: string | null;
}

function CreateEmployeeForm({
  onSubmit,
  isSubmitting = false,
  errorMessage = null,
  successMessage = null,
}: CreateEmployeeFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateEmployeeFormValues>({
    defaultValues: {
      name: '',
      email: '',
    },
  });

  useEffect(() => {
    if (successMessage) {
      reset();
    }
  }, [successMessage, reset]);

  const handleFormSubmit = (values: CreateEmployeeFormValues) => {
    onSubmit(values);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(handleFormSubmit)}>
      <h3 className={styles.title}>Create employee</h3>
      <div className={styles.field}>
        <label htmlFor="name" className={styles.label}>
          Employee name
        </label>
        <input
          id="name"
          type="text"
          className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'name-error' : undefined}
          {...register('name', {
            required: 'Name is required',
            minLength: {
              value: 2,
              message: 'Name must be at least 2 characters long',
            },
          })}
        />
        {errors.name?.message && (
          <div className={styles.error}>{errors.name?.message}</div>
        )}
      </div>
      <div className={styles.field}>
        <label htmlFor="email" className={styles.label}>
          Employee email
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
          <div className={styles.error}>{errors.email?.message}</div>
        )}
        {errorMessage && <div className={styles.formError}>{errorMessage}</div>}
        {successMessage && (
          <div className={styles.success}>{successMessage}</div>
        )}
      </div>
      <button
        type="submit"
        className={styles.submitButton}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Creating employee...' : 'Create employee'}
      </button>
    </form>
  );
}
export default CreateEmployeeForm;
