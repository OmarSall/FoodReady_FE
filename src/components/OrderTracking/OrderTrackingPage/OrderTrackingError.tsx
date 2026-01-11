import styles from './OrderTrackingPage.module.css';

interface OrderTrackingErrorProps {
  message?: string;
  onRetry?: () => void;
}

function OrderTrackingError({ message, onRetry }: OrderTrackingErrorProps) {
  return (
    <div className={styles.stateBoxError} role="alert">
      <p className={styles.stateTitle}>We could not load your order.</p>
      <p className={styles.stateText}>{message}</p>

      {onRetry && (
        <button
          type="button"
          className={styles.primaryButton}
          onClick={onRetry}
        >
          Try again
        </button>
      )}
    </div>
  );
}
export default OrderTrackingError;
