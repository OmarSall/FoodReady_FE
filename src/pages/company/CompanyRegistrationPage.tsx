import { useState } from 'react';
import CompanyOwnerForm, {
  type CompanyOwnerFormValues,
} from '../../components/CompanyOwnerForm/CompanyOwnerForm';
import {
  registerCompany,
  type RegisterCompanyResponse,
} from '../../api/registerCompanyApi';
import { ApiError } from '../../lib/http';
import Modal from '../../modals/RegistrationModal';
import styles from "./CompanyRegistrationPage.module.css";

function CompanyRegistrationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<RegisterCompanyResponse | null>(
    null,
  );
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

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
  };

  return (
    <div className={styles.page}>
      <CompanyOwnerForm
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        errorMessage={errorMessage}
      />

      <Modal
        isOpen={isSuccessModalOpen && !!successData}
        title="Company registered successfully!"
        onClose={handleCloseSuccessModal}
      >
        {successData && (
          <>
            <p>
              Company: <b>{successData.company.name}</b> (slug:{' '}
              <code>{successData.company.slugUrl}</code>)
            </p>
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