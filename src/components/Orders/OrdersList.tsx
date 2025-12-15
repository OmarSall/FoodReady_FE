import styles from '../EmployeeDashboardPage/EmployeeDashboardPage.module.css';
import type { Order, OrderStatus } from '../../api/ordersApi';

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
      {orders.map((order) => (
        <div key={order.id} className={styles.orderItem}>
          <div className={styles.orderInfo}>
            <div className={styles.orderTitle}>{order.title}</div>
            {order.description && (
              <div className={styles.orderDescription}>{order.description}</div>
            )}
            <div className={styles.orderMeta}>
              Status: <strong>{order.status}</strong>
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
                {status.replace('_', ' ')}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}

export default OrdersList;
