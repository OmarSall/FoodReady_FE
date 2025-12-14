import type { AuthenticatedUser } from '../../auth/auth-types';
import { useAuth } from '../../auth/AuthContext';
import styles from './DashboardLayout.module.css';
import { NavLink, Outlet } from 'react-router-dom';
type Role = AuthenticatedUser['position'];

interface MenuItem {
  route: string;
  label: string;
  allowedRoles: Role[];
}

const MENU_ITEMS: MenuItem[] = [
  {
    route: '/orders',
    label: 'Orders',
    allowedRoles: ['OWNER', 'EMPLOYEE', 'ADMIN'],
  },
  {
    route: '/employees',
    label: 'Employees',
    allowedRoles: ['OWNER', 'ADMIN'],
  },
];

function DashboardLayout() {
  const { user } = useAuth();
  const role = user?.position as Role | undefined;
  const visibleMenuItems = role
    ? MENU_ITEMS.filter((item) => item.allowedRoles.includes(role))
    : [];

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
        </aside>

        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
