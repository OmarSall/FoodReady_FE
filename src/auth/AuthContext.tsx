import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import type { AuthenticatedUser } from './auth-types.ts';
import { logOut } from '../api/logoutApi.ts';
import { request } from '../http/request';
import { isApiError, isUnauthorized } from './auth-helpers';

interface AuthContextValue {
  user: AuthenticatedUser | null;
  isAuthenticated: boolean;
  isOwner: boolean;
  isEmployee: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  authError: string | null;
  refreshUser: () => Promise<void>;
  clearUser: () => void;
  logout: () => Promise<void>;
  login: (user: AuthenticatedUser) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthenticatedUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);

  const refreshUser = useCallback(async () => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const data = await request<AuthenticatedUser>('GET', '/authentication');
      setUser(data);
      setAuthError(null);
    } catch (error) {
      if (isUnauthorized(error)) {
        clearUser()
        return;
      }

      if (isApiError(error)) {
        console.error('Failed to refresh current user', {
          statusCode: error.statusCode,
          rawMessage: error.rawMessage,
        });
        clearUser();
        setAuthError('Failed to verify authentication. Please try again later');
        return;
      }
      console.error('Unexpected error while refreshing current user', error);
      setAuthError('Unexpected error. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  },[]);

  const clearUser = () => {
    setUser(null);
    setAuthError(null);
  };

  const logout = useCallback(async () => {
    try {
      await logOut();
    } catch (error) {
      console.warn('Failed to log out', error);
    } finally {
      clearUser();
    }
  },[clearUser]);

  useEffect(() => {
    void refreshUser();
  }, [refreshUser]);

  const login = useCallback((authenticatedUser: AuthenticatedUser) => {
    setUser(authenticatedUser);
    setAuthError(null);
    setIsLoading(false);
  },[])

  const value: AuthContextValue = {
    user,
    isAuthenticated: user !== null,
    isOwner: user?.position === 'OWNER',
    isEmployee: user?.position === 'EMPLOYEE',
    isAdmin: user?.position === 'ADMIN',
    isLoading,
    authError,
    refreshUser,
    clearUser,
    logout,
    login,
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
