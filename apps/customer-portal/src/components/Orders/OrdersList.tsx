import styles from './OrdersList.module.css';
import type { Order, OrderStatus } from '../../api/ordersApi';
import { buildOrderTrackingUrl } from './orderTrackingLink';
import QRCode from 'react-qr-code';

interface OrdersListProps {
  orders: Order[];
  onStatusChange: (id: number, status: OrderStatus) => void;
  isUpdatingId?: number | null;
}

const STATUS_OPTIONS: OrderStatus[] = [
  'PENDING',
  'IN_PROGRESS',
  'COMPLETED',
  'CANCELLED',
];

function OrdersList({
  orders,
  onStatusChange,
  isUpdatingId = null,
}: OrdersListProps) {
  if (orders.length === 0) {
    return (
      <p className={styles.sectionText}>
        No orders yet. Create your first order using the form.
      </p>
    );
  }

  return (
    <div className={styles.ordersList}>
      {orders.map((order) => {
        const trackingUrl = buildOrderTrackingUrl(order.trackingId);

        return (
          <div key={order.id} className={styles.orderItem}>
            <div className={styles.orderInfo}>
              <div className={styles.orderTitle}>{order.title}</div>
              {order.description && (
                <div className={styles.orderDescription}>
                  {order.description}
                </div>
              )}
              <div className={styles.orderMeta}>
                Status: <strong>{order.status}</strong>
              </div>
              <div className={styles.trackingBox}>
                <div className={styles.trackingLabel}>Customer tracking</div>

                <div
                  className={styles.qrWrap}
                  aria-label="Order tracking QR code"
                >
                  <QRCode value={trackingUrl} size={96} />
                </div>

                <a
                  className={styles.trackingLink}
                  href={trackingUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open tracking page
                </a>
              </div>
            </div>

            <select
              className={styles.statusSelect}
              value={order.status}
              onChange={(event) =>
                onStatusChange(order.id, event.target.value as OrderStatus)
              }
              disabled={isUpdatingId === order.id}
            >
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status.replaceAll('_', ' ')}
                </option>
              ))}
            </select>
          </div>
        );
      })}
    </div>
  );
}

export default OrdersList;
