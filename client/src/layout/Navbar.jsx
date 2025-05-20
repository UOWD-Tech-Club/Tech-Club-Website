import styles from './Navbar.module.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaSignOutAlt } from 'react-icons/fa';

function Navbar() {
  const [showNavbar, setShowNavbar] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const closeNavbar = () => {
    setShowNavbar(false);
  };

  const handleLogout = () => {
    logout();
    closeNavbar();
  };

  return (
    <nav className={styles.navbar}>
      {/* Menu Icon with Toggle */}
      <div className={styles.menu_icon}>
        <input
          checked={showNavbar}
          type="checkbox"
          className={styles.input_checkbox}
          id="checkbox"
          onChange={handleShowNavbar}
        />
        <label htmlFor="checkbox" className={styles.toggle}>
          <div className={styles.bars} id={styles['bar1']}></div>
          <div className={styles.bars} id={styles['bar2']}></div>
          <div className={styles.bars} id={styles['bar3']}></div>
        </label>
      </div>

      {/* Logo Section */}
      <Link to="/" className={styles.logo} onClick={closeNavbar}>
        <span className={styles.logo_tech}>Tech</span>
        <span className={styles.logo_club}>Club</span>
      </Link>

      {/* Main Navigation and Join Us Button */}
      <div className={styles.nav_action}>
        <div
          className={`${styles.nav_links} ${showNavbar ? styles.active : ''}`}
        >
          <Link to="/events" className={styles.nav_link} onClick={closeNavbar}>
            Events
          </Link>
          <Link
            to="/newsletter"
            className={styles.nav_link}
            onClick={closeNavbar}
          >
            Newsletter
          </Link>
          <Link to="/aboutus" className={styles.nav_link} onClick={closeNavbar}>
            About Us
          </Link>
          {isAuthenticated && (
            <>
              <div className={styles.mobile_logout} onClick={handleLogout}>
                <FaSignOutAlt className={styles.mobile_logout_icon} />
                <span>Logout</span>
              </div>
            </>
          )}
        </div>
        {isAuthenticated ? (
          <>
            <Link
              to="/dashboard"
              className={styles.nav_link}
              onClick={closeNavbar}
            >
              <button className={styles.joinus}>Dashboard</button>
            </Link>
            <FaSignOutAlt
              className={`${styles.logout_icon} ${styles.desktop_logout}`}
              onClick={handleLogout}
              aria-label="Logout"
            />
          </>
        ) : (
          <Link to="/login" className={styles.nav_link} onClick={closeNavbar}>
            <button className={styles.joinus}>Login</button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
