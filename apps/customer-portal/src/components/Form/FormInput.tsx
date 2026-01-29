import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import styles from './FormInput.module.css';

interface FormInputProps {
  id: string;
  label: string;
  type?: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
}

function FormInput({
  id,
  label,
  type = 'text',
  register,
  error,
}: FormInputProps) {
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>

      <input
        id={id}
        type={type}
        className={`${styles.input} ${error ? styles.inputError : ''}`}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        {...register}
      />

      {error && (
        <div id={`${id}-error`} className={styles.error}>
          {error.message}
        </div>
      )}
    </div>
  );
}

export default FormInput;
