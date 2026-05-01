import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';

export function useInviteToken(): string | null {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      navigate(ROUTES.HOME, { replace: true });
    }
  }, [token, navigate]);

  return token;
}