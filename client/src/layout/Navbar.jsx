import styles from './Navbar.module.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [showNavbar, setShowNavbar] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const closeNavbar = () => {
    setShowNavbar(false);
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
            to="/projects"
            className={styles.nav_link}
            onClick={closeNavbar}
          >
            Projects
          </Link>
          <Link
            to="/newsletter"
            className={styles.nav_link}
            onClick={closeNavbar}
          >
            Newsletter
          </Link>
        </div>
        <button className={styles.joinus}>Join Us</button>
      </div>
    </nav>
  );
}

export default Navbar;
