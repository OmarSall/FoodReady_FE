import { useForm } from 'react-hook-form';
import styles from './CreateOrderForm.module.css';
import FormInput from '../../Form/FormInput';

export interface CreateOrderFormValues {
  title: string;
  description?: string;
}

interface CreateOrderFormProps {
  onSubmit: (values: CreateOrderFormValues) => Promise<void> | void;
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

  const handleFormSubmit = async (values: CreateOrderFormValues) => {
    await onSubmit(values);

    if (successMessage && !errorMessage) {
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <h3 className={styles.title}>Create new order</h3>
      <FormInput
        id="title"
        label="Order title"
        register={register('title', {
          required: 'Order title is required',
          minLength: {
            value: 2,
            message: 'Title must be at least 2 characters long',
          },
        })}
        error={errors.title}
      />
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
