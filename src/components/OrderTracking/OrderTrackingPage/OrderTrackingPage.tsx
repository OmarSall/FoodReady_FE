import {
  getOrderTrackingStatus,
  type OrderTrackingResponse,
} from '../../../api/orderTrackingApi.ts';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './OrderTrackingPage.module.css';
import OrderTrackingLoading from './OrderTrackingLoading.tsx';
import OrderTrackingError from './OrderTrackingError.tsx';
import OrderTrackingStatus from './OrderTrackingStatus.tsx';
import { mapOrderTrackingError } from './orderTrackingErrorMapper.ts';

type ViewState =
  | { kind: 'loading' }
  | { kind: 'error'; message: string; canRetry: boolean }
  | { kind: 'success'; data: OrderTrackingResponse };

const POLL_INTERVAL_MS = 10_000;

function isFinalStatus(status: OrderTrackingResponse['status']) {
  return status === 'COMPLETED' || status === 'CANCELLED';
}

function OrderTrackingPage() {
  const { trackingId } = useParams<{ trackingId: string }>();
  const [state, setState] = useState<ViewState>({ kind: 'loading' });
  const isActiveRef = useRef(true);
  const intervalIdRef = useRef<number | null>(null);

  const stopPolling = useCallback(() => {
    if (intervalIdRef.current !== null) {
      window.clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
  }, []);

  const fetchStatus = useCallback(async () => {
    if (!trackingId) {
      setState({
        kind: 'error',
        message: 'Missing tracking id.',
        canRetry: false,
      });
      stopPolling();
      return;
    }

    try {
      const result = await getOrderTrackingStatus(trackingId);

      if (!isActiveRef.current) {
        return;
      }

      setState({ kind: 'success', data: result });

      if (isFinalStatus(result.status)) {
        stopPolling();
      }
    } catch (error) {
      if (!isActiveRef.current) {
        return;
      }
      setState(mapOrderTrackingError(error));
    }
  }, [trackingId, stopPolling]);

  useEffect(() => {
    isActiveRef.current = true;

    if (!trackingId) {
      setState({
        kind: 'error',
        message: 'Missing tracking id.',
        canRetry: false,
      });
      stopPolling();
      return () => {
        isActiveRef.current = false;
      };
    }

    setState({ kind: 'loading' });
    void fetchStatus();

    intervalIdRef.current = window.setInterval(() => {
      void fetchStatus();
    }, POLL_INTERVAL_MS);

    return () => {
      isActiveRef.current = false;
      stopPolling();
    };
  }, [fetchStatus, stopPolling, trackingId]);

  const title = trackingId ? 'Track your order' : 'Invalid tracking link';

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
          <OrderTrackingError
            message={state.message}
            onRetry={
              state.canRetry
                ? () => {
                    setState({ kind: 'loading' });
                    void fetchStatus();
                  }
                : undefined
            }
          />
        )}

        {state.kind === 'success' && <OrderTrackingStatus data={state.data} />}
      </section>
    </main>
  );
}

export default OrderTrackingPage;
