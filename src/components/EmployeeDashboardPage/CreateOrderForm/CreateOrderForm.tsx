import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import styles from './CreateOrderForm.module.css';

export interface CreateOrderFormValues {
  title: string;
  description?: string;
}

interface CreateOrderFormProps {
  onSubmit: (values: CreateOrderFormValues) => void;
  isSubmitting?: boolean;
  errorMessage?: string | null;
  successMessage?: string | null;
}

function CreateOrderForm({
  onSubmit,
  isSubmitting,
  errorMessage,
  successMessage,
}: CreateOrderFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateOrderFormValues>({
    defaultValues: {
      title: '',
      description: '',
    },
  });

  useEffect(() => {
    if (successMessage) {
      reset();
    }
  }, [successMessage, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3 className={styles.title}>Create new order</h3>
      <div className={styles.field}>
        <label htmlFor="title">Order title</label>
        <input
          id="title"
          type="text"
          className={`${styles.input} ${errors.title ? styles.inputError : ''}`}
          aria-invalid={Boolean(errors.title)}
          aria-describedby={errors.title ? 'order-title-error' : undefined}
          {...register('title', {
            required: 'Order title is required',
            minLength: {
              value: 2,
              message: 'Title must be at least 2 characters long',
            },
          })}
        />
        {errors.title?.message && (
          <div id="order-title-error" className={styles.error}>
            {errors.title.message}
          </div>
        )}
      </div>
      <div className={styles.field}>
        <label htmlFor="description" className={styles.label}>
          Description (optional)
        </label>
        <textarea
          id="description"
          className={styles.textarea}
          {...register('description')}
        />
        {errorMessage && <div className={styles.formError}>{errorMessage}</div>}
        {successMessage && (
          <div className={styles.success}>{successMessage}</div>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={styles.submitButton}
      >
        {isSubmitting ? 'Creating order...' : 'Create order'}
      </button>
    </form>
  );
}

export default CreateOrderForm;
