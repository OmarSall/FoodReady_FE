import { useCallback, useEffect, useState } from 'react';
import {
  createOrder,
  getOrders,
  type Order,
  type OrderStatus,
  updateOrderStatus,
} from '../../api/ordersApi';
import { ApiError } from '../../http/api-error';
import CreateOrderForm, {
  type CreateOrderFormValues,
} from './CreateOrderForm/CreateOrderForm';
import OrdersList from './OrdersList';
import styles from './OrdersPage.module.css';

function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState<boolean>(false);
  const [ordersError, setOrdersError] = useState<string | null>(null);

  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [createSuccess, setCreateSuccess] = useState<string | null>(null);

  const [updatingOrderId, setUpdatingOrderId] = useState<number | null>(null);

  const fetchOrders = useCallback(async () => {
    setIsLoadingOrders(true);
    setOrdersError(null);

    try {
      const data = await getOrders();
      setOrders(data);
    } catch (error) {
      if (error instanceof ApiError) {
        setOrdersError('Unable to load orders. Please try again later.');
        return;
      }
      setOrdersError('Unexpected error. Please try again.');
    } finally {
      setIsLoadingOrders(false);
    }
  }, []);

  useEffect(() => {
    void fetchOrders();
  }, [fetchOrders]);

  const handleCreateOrder = useCallback(
    async (values: CreateOrderFormValues) => {
      setIsCreating(true);
      setCreateError(null);
      setCreateSuccess(null);

      try {
        const newOrder = await createOrder({
          title: values.title,
          description: values.description,
        });

        setOrders((previousOrders) => [...previousOrders, newOrder]);
        setCreateSuccess('Order has been created.');
      } catch (error) {
        if (error instanceof ApiError) {
          setCreateError(error.message ?? 'Failed to create order');
          return;
        }
        setCreateError('Unexpected error. Please try again.');
      } finally {
        setIsCreating(false);
      }
    },
    [],
  );

  const handleStatusChange = useCallback(
    async (id: number, status: OrderStatus) => {
      setUpdatingOrderId(id);

      try {
        await updateOrderStatus(id, { status });

        setOrders((previousOrders) =>
          previousOrders.map((order) =>
            order.id === id ? { ...order, status } : order,
          ),
        );
      } catch (error) {
        if (error instanceof ApiError) {
          setOrdersError(error.message ?? 'Failed to update order');
          return;
        }
        setOrdersError('Unexpected error while updating order status.');
      } finally {
        setUpdatingOrderId(null);
      }
    },
    [],
  );

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Orders</h1>
        <p className={styles.subtitle}>
          Create new orders and update their status as you work on them.
        </p>
      </header>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Create new order</h2>
        <CreateOrderForm
          onSubmit={handleCreateOrder}
          isSubmitting={isCreating}
          errorMessage={createError}
          successMessage={createSuccess}
        />
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Orders list</h2>

        {isLoadingOrders && (
          <p className={styles.sectionText}>Loading orders...</p>
        )}

        {ordersError && (
          <p className={styles.sectionText}>{ordersError}</p>
        )}

        {!isLoadingOrders && !ordersError && (
          <OrdersList
            orders={orders}
            onStatusChange={handleStatusChange}
            isUpdatingId={updatingOrderId}
          />
        )}
      </div>
    </section>
  );
}

export default OrdersPage;
