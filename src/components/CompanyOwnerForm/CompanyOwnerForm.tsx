import { type ChangeEvent, type FormEvent, useState } from 'react';
import styles from './CompanyOwnerForm.module.css';

export interface CompanyOwnerFormValues {
  companyName: string;
  email: string;
  password: string;
  slugUrl?: string;
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
    slugUrl: '',
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
      slugUrl: formValues.slugUrl || undefined,
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

      <div className={styles.field}>
        <label htmlFor="slugUrl" className={styles.label}>
          Company URL slug (optional)
        </label>
        <input
          id="slugUrl"
          name="slugUrl"
          type="text"
          className={styles.input}
          placeholder="my-company-name"
          value={formValues.slugUrl ?? ''}
          onChange={handleChange}
        />
        <p className={styles.helperText}>
          If you leave this empty, we will generate it from your company name.
        </p>
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