import { useCallback, useState } from 'react';
import styles from './EmployeesPage.module.css';
import { useAuth } from '../../auth/AuthContext';
import CreateEmployeeForm, {
  type CreateEmployeeFormValues,
} from './CreateEmployeeForm/CreateEmployeeForm';
import { createEmployee } from '../../api/createEmployeeApi';
import { ApiError } from '../../http/api-error';

function EmployeesPage() {
  const { user } = useAuth();

  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [createSuccess, setCreateSuccess] = useState<string | null>(null);

  const handleCreateEmployee = useCallback(
    async (values: CreateEmployeeFormValues) => {
      setIsCreating(true);
      setCreateError(null);
      setCreateSuccess(null);

      try {
        const employee = await createEmployee({
          name: values.name,
          email: values.email,
          position: 'EMPLOYEE',
        });

        setCreateSuccess(
          `Employee ${employee.name} (${employee.email}) has been created.`,
        );
      } catch (error) {
        if (error instanceof ApiError) {
          setCreateError(error.message ?? 'Failed to create employee.');
          return;
        }
        setCreateError('Unexpected error. Please try again.');
      } finally {
        setIsCreating(false);
      }
    },
    [],
  );

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Employees</h1>
        <p className={styles.subtitle}>
          Manage employee accounts in your company.
        </p>
      </header>

      <div className={styles.companyBox}>
        <h2 className={styles.sectionTitle}>Your company</h2>
        <p className={styles.sectionText}>
          You are logged in as <strong>OWNER</strong> of{' '}
          <strong>{user?.company?.name ?? 'your company'}</strong>.
        </p>
        <p className={styles.sectionText}>
          Here you can create accounts for your team. In the next steps we will
          also show full company details and employees list.
        </p>
      </div>

      <div className={styles.formBox}>
        <h2 className={styles.sectionTitle}>Create new employee</h2>
        <p className={styles.sectionText}>
          Fill in the form below to create an employee account with access to
          FoodReady.
        </p>

        <CreateEmployeeForm
          onSubmit={handleCreateEmployee}
          isSubmitting={isCreating}
          errorMessage={createError}
          successMessage={createSuccess}
        />
      </div>
    </section>
  );
}

export default EmployeesPage;
