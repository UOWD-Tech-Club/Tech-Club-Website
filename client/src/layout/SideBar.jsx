import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './SideBar.module.css';

function Sidebar() {
  const location = useLocation();
  const [showSidebar, setShowSidebar] = useState(false);

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  // Navigation items
  const navItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Events', path: '/eventsmanagement' },
    { name: 'Tech News', path: '/news' },
    { name: 'Executives', path: '/executives' },
  ];

  return (
    <div className={styles.sidebar_container}>
      {/* Sidebar Content */}
      <div className={`${styles.sidebar} ${showSidebar ? styles.active : ''}`}>
        {/* Logo Section */}
        <Link to="/" className={styles.sidebar_logo}>
          <span className={styles.logo_tech}>Tech</span>
          <span className={styles.logo_club}>Club</span>
        </Link>

        {/* Navigation Links */}
        <div className={styles.nav_links}>
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`${styles.nav_item} ${
                location.pathname === item.path ||
                (item.path !== '/' && location.pathname.startsWith(item.path))
                  ? styles.active
                  : ''
              }`}
              onClick={closeSidebar}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
