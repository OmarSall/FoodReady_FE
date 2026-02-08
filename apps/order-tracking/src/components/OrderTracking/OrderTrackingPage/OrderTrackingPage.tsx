import {
  getOrderTrackingStatus,
  type OrderTrackingResponse,
  type PublicOrderStatus,
} from '../../../api/orderTrackingApi';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './OrderTrackingPage.module.css';
import OrderTrackingLoading from './OrderTrackingLoading';
import OrderTrackingError from './OrderTrackingError';
import OrderTrackingStatus from './OrderTrackingStatus';
import { mapOrderTrackingError } from './orderTrackingErrorMapper';
import { connectOrderTrackingStream } from '../../../api/orderTrackingStream';

type ViewState =
  | { kind: 'loading' }
  | { kind: 'error'; message: string; canRetry: boolean }
  | { kind: 'success'; data: OrderTrackingResponse };


function isFinalStatus(status: PublicOrderStatus) {
  return status === 'COMPLETED' || status === 'CANCELLED';
}

function OrderTrackingPage() {
  const { trackingId } = useParams<{ trackingId: string }>();
  const [state, setState] = useState<ViewState>({ kind: 'loading' });
  const disconnectSseRef = useRef<null | (() => void)>(null);
  const hasReceivedSseRef = useRef(false);

  const stopSse = useCallback(() => {
    if (disconnectSseRef.current) {
      disconnectSseRef.current();
      disconnectSseRef.current = null;
    }
  }, []);

  const fetchStatus = useCallback(
    async (options?: { showLoading?: boolean }) => {
      if (!trackingId) {
        setState({
          kind: 'error',
          message: 'Missing tracking id.',
          canRetry: false,
        });
        stopSse();
        return;
      }

      if (hasReceivedSseRef.current && !options?.showLoading) {
        return;
      }

      if (options?.showLoading) {
        setState({ kind: 'loading' });
      }

      try {
        const result = await getOrderTrackingStatus(trackingId);


        setState({ kind: 'success', data: result });

        if (isFinalStatus(result.status)) {
          stopSse();
        }
      } catch (error) {

        setState(mapOrderTrackingError(error));
      }
    },
    [trackingId, stopSse],
  );

  const startSse = useCallback(() => {
    if (!trackingId) {
      return;
    }
    if (disconnectSseRef.current) {
      return;
    }

    disconnectSseRef.current = connectOrderTrackingStream(trackingId, {
      onMessage: (data) => {

        hasReceivedSseRef.current = true;

        setState({ kind: 'success', data });

        if (isFinalStatus(data.status)) {
          stopSse();
        }
      },
      onError: (err) => {
        console.warn("[OrderTracking] SSE error", err);
      },
    });
  }, [trackingId, stopSse]);

  useEffect(() => {
    hasReceivedSseRef.current = false;

    if (!trackingId) {
      setState({
        kind: 'error',
        message: 'Missing tracking id.',
        canRetry: false,
      });
      stopSse();
    }

    void fetchStatus({ showLoading: true });

    startSse();

    return () => {
      stopSse();
    };
  }, [fetchStatus, startSse, stopSse, trackingId]);

  const title = trackingId ? 'Track your order' : 'Invalid tracking link';
  const handleRetry =
    state.kind === 'error' && state.canRetry
      ? () => void fetchStatus({ showLoading: true })
      : undefined;

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

        {state.kind === 'success' && (
          <>
            <OrderTrackingStatus data={state.data} />
          </>
          )}
      </section>
    </main>
  );
}

export default OrderTrackingPage;
