export function buildOrderTrackingUrl(trackingId: string) {
  const baseUrl =
    import.meta.env.VITE_TRACKING_APP_URL ??
    'http://localhost:5174';

  return `${baseUrl}/order-tracking/${trackingId}`;
}
