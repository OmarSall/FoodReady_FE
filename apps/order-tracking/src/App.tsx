import { Route, Routes } from 'react-router-dom';
import { ROUTES } from './constants/routes';
import OrderTrackingPage from './components/OrderTracking/OrderTrackingPage/OrderTrackingPage';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route path={ROUTES.TRACK_ORDER} element={<OrderTrackingPage />} />
      <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
