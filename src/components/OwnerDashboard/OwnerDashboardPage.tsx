import styles from './OwnerDashboardPage.module.css';
import CreateEmployeeForm, {
  type CreateEmployeeFormValues,
} from '../Employees/CreateEmployeeForm/CreateEmployeeForm.tsx';
import { useCallback, useState } from 'react';
import { useAuth } from '../../auth/AuthContext.tsx';
import { useNavigate } from 'react-router-dom';
import { createEmployee } from '../../api/createEmployeeApi.ts';
import { ApiError } from '../../http/api-error.ts';

function OwnerDashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

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
          setCreateError(error.message ?? 'Failed to create employee');
          return;
        }
        setCreateError('Unexpected error. Please try again.');
      } finally {
        setIsCreating(false);
      }
    },
    [],
  );

  const handleLogOut = useCallback(async () => {
    await logout();
    navigate('/', { replace: true });
  }, [logout, navigate]);

  return (
    <>
      <main className={styles.page}>
        <section className={styles.card}>
          <header className={styles.header}>
            <div>
              <h1 className={styles.title}>Owner dashboard</h1>
              <p className={styles.subtitle}>
                Welcome,{' '}
                <span className={styles.highlight}>
                  {user?.name ?? 'Owner'}
                </span>
              </p>
            </div>
            <button
              type="button"
              className={styles.logOutButton}
              onClick={handleLogOut}
            >
              Log out
            </button>
          </header>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Your Company</h2>
            <p className={styles.sectionText}>
              You are logged in as <strong>OWNER</strong> of{' '}
              <strong>{user?.company?.name}</strong>
            </p>
            <p className={styles.sectionText}>
              In the next steps we will show full company details and employees
              list here.
            </p>
          </div>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Employees</h2>
            <p className={styles.sectionText}>
              Create employee accounts for your team. They will be able to log
              in and use the system with their own access level.
            </p>

            <CreateEmployeeForm
              onSubmit={handleCreateEmployee}
              isSubmitting={isCreating}
              errorMessage={createError}
              successMessage={createSuccess}
            />
          </div>
        </section>
      </main>
    </>
  );
}
export default OwnerDashboardPage;
