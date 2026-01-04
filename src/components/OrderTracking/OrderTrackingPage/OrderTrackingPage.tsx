import {
  getOrderTrackingStatus,
  type OrderTrackingResponse,
} from '../../../api/orderTrackingApi.ts';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ApiError } from '../../../http/api-error.ts';
import styles from './OrderTrackingPage.module.css';
import OrderTrackingLoading from './OrderTrackingLoading.tsx';
import OrderTrackingError from './OrderTrackingError.tsx';
import OrderTrackingStatus from './OrderTrackingStatus.tsx';

type ViewState =
  | { kind: 'loading' }
  | { kind: 'error'; message: string }
  | { kind: 'success'; data: OrderTrackingResponse };

function OrderTrackingPage() {
  const { trackingId } = useParams<{ trackingId: string }>();
  const [state, setState] = useState<ViewState>({ kind: 'loading' });
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let isActive = true;

    const load = async () => {
      if (!trackingId) {
        setState({ kind: 'error', message: 'Missing tracking id.' });
        return;
      }
      setState({ kind: 'loading' });

      try {
        const result = await getOrderTrackingStatus(trackingId);
        if (!isActive) {
          return;
        }
        setState({ kind: 'success', data: result });
      } catch (error) {
        if (!isActive) {
          return;
        }

        if (error instanceof ApiError && error.statusCode === 404) {
          setState({
            kind: 'error',
            message: 'Invalid or expired tracking link.',
          });
          return;
        }

        if (error instanceof Error) {
          setState({ kind: 'error', message: error.message });
          return;
        }

        setState({ kind: 'error', message: 'Could not load tracking status.' });
      }
    };
    void load();
    return () => {
      isActive = false;
    };
  }, [trackingId, refreshKey]);

  const handleRetry = () => {
    setRefreshKey((previousValue) => previousValue + 1);
  };

  const title = trackingId ? 'Track your order' : 'invalid tracking link';
  console.log('STATE', state);

  return (
    <main className={styles.page} aria-labelledby="order-tracking-title">
      <section className={styles.card}>
        <header className={styles.header}>
          <h1 id="order-tracking-title" className="title">
            {title}
          </h1>
          <p className={styles.subtitle}>
            Tracking id:{' '}
            <span className={styles.mono}>{trackingId ?? '-'}</span>
          </p>
        </header>

        {state.kind === 'loading' && <OrderTrackingLoading />}

        {state.kind === 'error' && (
          <OrderTrackingError message={state.message} onRetry={handleRetry} />
        )}

        {state.kind === 'success' && <OrderTrackingStatus data={state.data} />}
      </section>
    </main>
  );
}
export default OrderTrackingPage;
