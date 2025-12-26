import { useAuth } from '../../auth/AuthContext';
import styles from './DashboardLayout.module.css';
import { NavLink, Outlet } from 'react-router-dom';
import LogoutButton from '../Auth/LogoutButton/LogoutButton.tsx';
import { ROUTES } from '../../constants/routes';
import { useMemo } from 'react';
import type { Role } from '../../auth/auth-types';

interface MenuItem {
  route: string;
  label: string;
  allowedRoles: Role[];
}

const MENU_ITEMS: MenuItem[] = [
  {
    route: ROUTES.ORDERS,
    label: 'Orders',
    allowedRoles: ['OWNER', 'EMPLOYEE'],
  },
  {
    route: ROUTES.EMPLOYEES,
    label: 'Employees',
    allowedRoles: ['OWNER'],
  },
];

function DashboardLayout() {
  const { user } = useAuth();
  const role = user?.position;
  const visibleMenuItems = useMemo(() => {
    if (!role) {
      return [];
    }
    return MENU_ITEMS.filter((item) => item.allowedRoles.includes(role));
  }, [role]);

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <aside className={styles.sidebar}>
          <div className={styles.brand}>
            <span className={styles.logoDot} />
            <span className={styles.appName}>FoodReady</span>
          </div>

          <nav className={styles.nav}>
            {visibleMenuItems.map((item) => (
              <NavLink
                key={item.route}
                to={item.route}
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navItem} ${styles.navItemActive}`
                    : styles.navItem
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <LogoutButton />
        </aside>

        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
