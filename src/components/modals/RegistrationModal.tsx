import type { ReactNode } from 'react';
import styles from './RegistrationModal.module.css';

interface ModalProps {
  isOpen: boolean;
  title?: string;
  onClose: () => void;
  children: ReactNode;
}

function Modal({ isOpen, title, onClose, children }: ModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(event) => event.stopPropagation()}
      >
        {title && <h2 className={styles.title}>{title}</h2>}

        <div className={styles.content}>{children}</div>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
