import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { request } from '../http/request.ts';
import { isApiError, isUnauthorized } from './auth-helpers.ts';
import type { AuthenticatedUser } from './auth-types.ts';

interface AuthContextValue {
  user: AuthenticatedUser | null;
  isAuthenticated: boolean;
  isOwner: boolean;
  isEmployee: boolean;
  isLoading: boolean;
  authError: string | null;
  refreshUser: () => Promise<void>;
  clearUser: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthenticatedUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);

  const refreshUser = async () => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const data = await request<AuthenticatedUser>('GET', '/authentication');
      setUser(data);
      setAuthError(null);
    } catch (error) {
      if (isUnauthorized(error)) {
        setUser(null);
        setAuthError(null);
        return;
      }

      if (isApiError(error)) {
        console.error('Failed to refresh current user', {
          statusCode: error.statusCode,
          rawMessage: error.rawMessage,
        });
        setAuthError('Failed to verify authentication. Please try again later');
        return;
      }
      console.error('Unexpected error while refreshing current user', error);
      setAuthError('Unexpected error. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const clearUser = () => {
    setUser(null);
    setAuthError(null);
  };

  useEffect(() => {
    void refreshUser();
  }, []);

  const value: AuthContextValue = {
    user,
    isAuthenticated: user !== null,
    isOwner: user?.position === 'OWNER',
    isEmployee: user?.position === 'EMPLOYEE',
    isLoading,
    authError,
    refreshUser,
    clearUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
