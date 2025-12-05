import styles from './CompanyOwnerForm.module.css';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import FormInput from '../../../Form/FormInput';

export interface CompanyOwnerFormValues {
  companyName: string;
  ownerName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface CompanyOwnerFormProps {
  onSubmit: (values: CompanyOwnerFormValues) => void;
  isSubmitting: boolean;
  errorMessage: string | null;
  successMessage?: string | null;
}

function CompanyOwnerForm({
  onSubmit,
  isSubmitting,
  errorMessage,
  successMessage,
}: CompanyOwnerFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CompanyOwnerFormValues>({
    defaultValues: {
      companyName: '',
      ownerName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    if (successMessage) {
      reset();
    }
  }, [successMessage, reset]);

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={styles.title}>Register your company</h1>
      <FormInput
        id="companyName"
        label="Company name"
        type="text"
        register={register('companyName', {
          required: 'Company name is required',
        })}
        error={errors.companyName}
      />
      <FormInput
        id="ownerName"
        label="Owner name"
        type="text"
        register={register('ownerName', {
          required: 'Owner name is required',
        })}
        error={errors.ownerName}
      />
      <FormInput
        id="email"
        label="Owner email"
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
        label="Password (min. 8 characters)"
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
          validate: (value, formValues) =>
            value === formValues.password || 'Passwords do not match',
        })}
        error={errors.confirmPassword}
      />

      {errorMessage && <div className={styles.formError}>{errorMessage}</div>}

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
