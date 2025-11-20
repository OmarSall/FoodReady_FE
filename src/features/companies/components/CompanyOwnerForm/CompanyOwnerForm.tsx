import { type ChangeEvent, type FormEvent, useState } from 'react';
import styles from './CompanyOwnerForm.module.css';

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
  const [formValues, setFormValues] = useState<CompanyOwnerFormValues>({
    companyName: '',
    email: '',
    password: '',
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const payload: CompanyOwnerFormValues = {
      ...formValues,
    };

    onSubmit(payload);
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className={styles.title}>Register your company</h1>

      <div className={styles.field}>
        <label htmlFor="companyName" className={styles.label}>
          Company name
        </label>
        <input
          id="companyName"
          name="companyName"
          type="text"
          className={styles.input}
          value={formValues.companyName}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="email" className={styles.label}>
          Owner email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className={styles.input}
          value={formValues.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="password" className={styles.label}>
          Password (min. 8 characters)
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className={styles.input}
          value={formValues.password}
          onChange={handleChange}
          required
          minLength={8}
        />
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
