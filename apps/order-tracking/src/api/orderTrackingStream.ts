import type { OrderTrackingResponse } from './orderTrackingApi';
import { API_BASE_URL, API_PATHS } from '../constants/api';

type Handlers = {
  onMessage: (data: OrderTrackingResponse) => void;
  onError: (error: unknown) => void;
};

export function connectOrderTrackingStream(
  trackingId: string,
  handlers: Handlers,
) {
  const url = API_BASE_URL + API_PATHS.orderTrackingStreamById(trackingId);
  const eventSource = new EventSource(url);

  eventSource.onopen = () => {
    console.log('[SSE] open', url);
  };

  eventSource.onmessage = (event: MessageEvent<string>) => {
    try {
      const parsed = JSON.parse(event.data) as OrderTrackingResponse;
      handlers.onMessage(parsed);
    } catch (error) {
      handlers.onError(error);
    }
  };

  eventSource.onerror = (error) => {
    console.warn('[SSE] error', error);
    handlers.onError(error);
  };

  return () => {
    eventSource.close();
  };
}
