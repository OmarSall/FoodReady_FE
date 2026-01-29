import styles from './OrderTrackingPage.module.css';

function OrderTrackingLoading() {
  return (
    <div className={styles.stateBox} role="status" aria-live="polite">
      <div className={styles.spinner}></div>
      <p className={styles.stateText}>Loading order status...</p>
    </div>
  );
}
export default OrderTrackingLoading;
