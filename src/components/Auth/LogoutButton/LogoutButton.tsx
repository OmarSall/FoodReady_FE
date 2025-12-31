import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../auth/AuthContext';
import styles from './LogoutButton.module.css';
import { ROUTES } from '../../../constants/routes';

interface LogoutButtonProps {
  className?: string;
}

function LogoutButton({ className }: LogoutButtonProps) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.HOME, { replace: true });
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className={`${styles.button} ${className ?? ''}`}
    >
      Log out
    </button>
  );
}

export default LogoutButton;
