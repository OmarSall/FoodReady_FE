export function buildOrderTrackingUrl(trackingId: string) {
  const baseUrl =
    import.meta.env.VITE_PUBLIC_APP_URL ??
    'http://localhost:5173';

  return `${baseUrl}/order-tracking/${trackingId}`;
}
