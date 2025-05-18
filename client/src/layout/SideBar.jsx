import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import styles from './SideBar.module.css';

function Sidebar() {
  const location = useLocation();
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  // Navigation items
  const navItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Events', path: '/eventsmanagement' },
    { name: 'Tech News', path: '/newsmanagement' },
    { name: 'Executives', path: '/executivesmanagement' },
  ];

  return (
    <>
      {/* Hamburger Menu Button */}
      <button
        className={`${styles.hamburger} ${showSidebar ? styles.active : ''}`}
        onClick={toggleSidebar}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Sidebar Content */}
      <div className={`${styles.sidebar} ${showSidebar ? styles.active : ''}`}>
        {/* Close Button */}
        <button
          className={styles.closeButton}
          onClick={toggleSidebar}
          aria-label="Close menu"
        >
          <FaTimes />
        </button>

        {/* Logo Section */}
        <Link
          to="/"
          className={styles.sidebar_logo}
          onClick={() => setShowSidebar(false)}
        >
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
              onClick={() => setShowSidebar(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Sidebar;
