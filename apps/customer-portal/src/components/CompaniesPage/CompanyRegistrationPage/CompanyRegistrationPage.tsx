import { useState } from 'react';
import CompanyOwnerForm, {
  type CompanyOwnerFormValues,
} from './CompanyOwnerForm/CompanyOwnerForm';
import {
  registerCompany,
  type RegisterCompanyResponse,
} from '../../../api/companiesApi';
import { ApiError } from '../../../http/api-error';
import Modal from '../../modals/RegistrationModal';
import styles from './CompanyRegistrationPage.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';

function CompanyRegistrationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successData, setSuccessData] =
    useState<RegisterCompanyResponse | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values: CompanyOwnerFormValues) => {
    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessData(null);

    try {
      const data = await registerCompany(values);
      setSuccessData(data);
      setIsSuccessModalOpen(true);
    } catch (error) {
      if (error instanceof ApiError) {
        setErrorMessage(error.message || 'Failed to register company.');
      } else {
        setErrorMessage('Unexpected error. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
    navigate(ROUTES.LOGIN, { replace: true });
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <CompanyOwnerForm
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          errorMessage={errorMessage}
          successMessage={
            successData ? 'Company registered successfully' : null
          }
        />
        <div className={styles.links}>
          <p className={styles.linkText}>
            Already have a company?{' '}
            <Link to={ROUTES.LOGIN} className={styles.link}>
              Log in
            </Link>
          </p>
          <p className={styles.linkText}>
            Back to{' '}
            <Link to={ROUTES.HOME} className={styles.link}>
              welcome page
            </Link>
          </p>
        </div>
      </div>
      <Modal
        isOpen={isSuccessModalOpen && Boolean(successData)}
        title="Company registered successfully!"
        onClose={handleCloseSuccessModal}
      >
        {successData && (
          <>
            <p>
              Owner account: <b>{successData.owner.email}</b>
            </p>
          </>
        )}
      </Modal>
    </div>
  );
}

export default CompanyRegistrationPage;
