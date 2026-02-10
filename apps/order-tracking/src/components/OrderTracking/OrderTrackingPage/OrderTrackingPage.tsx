import {
  getOrderTrackingStatus,
  type OrderTrackingResponse,
  isFinalPublicStatus,
} from '../../../api/orderTrackingApi';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './OrderTrackingPage.module.css';
import OrderTrackingLoading from './OrderTrackingLoading';
import OrderTrackingError from './OrderTrackingError';
import OrderTrackingStatus from './OrderTrackingStatus';
import { mapOrderTrackingError } from './orderTrackingErrorMapper';
import { connectOrderTrackingStream } from '../../../api/orderTrackingStream';
import { type OrderTrackingErrorViewState, ViewStateKind } from './orderTrackingViewState';

type ViewState =
  | { kind: ViewStateKind.LOADING }
  | OrderTrackingErrorViewState
  | { kind: ViewStateKind.SUCCESS; data: OrderTrackingResponse };

function OrderTrackingPage() {
  const { trackingId } = useParams<{ trackingId: string }>();
  const [state, setState] = useState<ViewState>({ kind: ViewStateKind.LOADING });
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
          kind: ViewStateKind.ERROR,
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
        setState({ kind: ViewStateKind.LOADING });
      }

      try {
        const result = await getOrderTrackingStatus(trackingId);

        setState({ kind: ViewStateKind.SUCCESS, data: result });

        if (isFinalPublicStatus(result.status)) {
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

        setState({ kind: ViewStateKind.SUCCESS, data });

        if (isFinalPublicStatus(data.status)) {
          stopSse();
        }
      },
      onError: (err) => {
        console.warn('[OrderTracking] SSE error', err);
      },
    });
  }, [trackingId, stopSse]);

  useEffect(() => {
    hasReceivedSseRef.current = false;

    if (!trackingId) {
      setState({
        kind: ViewStateKind.ERROR,
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
    state.kind === ViewStateKind.ERROR && state.canRetry
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

        {state.kind === ViewStateKind.LOADING && <OrderTrackingLoading />}

        {state.kind === ViewStateKind.ERROR && (
          <OrderTrackingError message={state.message} onRetry={handleRetry} />
        )}

        {state.kind === ViewStateKind.SUCCESS && (
          <>
            <OrderTrackingStatus data={state.data} />
          </>
        )}
      </section>
    </main>
  );
}

export default OrderTrackingPage;
