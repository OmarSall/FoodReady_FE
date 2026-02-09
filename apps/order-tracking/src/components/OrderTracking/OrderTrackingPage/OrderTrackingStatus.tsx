import styles from './OrderTrackingPage.module.css';
import {
  type OrderTrackingResponse,
  getProgressIndex,
  PublicOrderStatus,
} from '../../../api/orderTrackingApi.ts';

const STATUS_LABEL: Record<PublicOrderStatus, string> = {
  [PublicOrderStatus.PENDING]: "Pending",
  [PublicOrderStatus.IN_PROGRESS]: "In progress",
  [PublicOrderStatus.COMPLETED]: "Completed",
  [PublicOrderStatus.CANCELLED]: "Cancelled",
};

type Props = {
  data: OrderTrackingResponse;
};

function OrderTrackingStatus({ data }: Props) {
  const progressIndex = getProgressIndex(data.status);

  const isPendingActive = progressIndex !== null && progressIndex >= 0;
  const isInProgressActive = progressIndex !== null && progressIndex >= 1;
  const isCompletedActive = progressIndex !== null && progressIndex >= 2;
  return (
    <div className={styles.content}>
      <div className={styles.statusRow}>
        <span className={styles.label}>Current status</span>
        <span className={styles.statusPill} data-status={data.status}>
          {STATUS_LABEL[data.status]}
        </span>
      </div>
      <div className={styles.metaRow}>
        <span className={styles.label}>Last updated</span>
        <span className={styles.value}>
          {new Date(data.updatedAt).toLocaleString()}
        </span>
      </div>
      <div className={styles.stepper} aria-label="Order progress">
        <div className={styles.step}>
          <div
            className={styles.dot}
            data-active={isPendingActive}
          />
          <span className={styles.stepLabel}>Pending</span>
        </div>
        <div className={styles.stepLine} />
        <div className={styles.step}>
          <div
            className={styles.dot}
            data-active={isInProgressActive}
          />
          <span className={styles.stepLabel}>In progress</span>
        </div>
        <div className={styles.stepLine} />
        <div className={styles.step}>
          <div
            className={styles.dot}
            data-active={isCompletedActive}
          />
          <span className={styles.stepLabel}>Completed</span>
        </div>
      </div>
      {data.status === 'CANCELLED' && (
        <div className={styles.notice}>
          This order was cancelled. If you believe this is a mistake, please
          contact the restaurant.
        </div>
      )}
    </div>
  );
}
export default OrderTrackingStatus;
