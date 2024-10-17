import styles from './Navbar.module.css';
import { useState } from 'react';

function Navbar() {
  const [showNavbar, setShowNavbar] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
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
      <div className={styles.logo}>
        <span className={styles.logo_tech}>Tech</span>
        <span className={styles.logo_club}>Club</span>
      </div>

      {/* Main Navigation and Join Us Button */}
      <div className={styles.nav_action}>
        <div
          className={`${styles.nav_links} ${showNavbar ? styles.active : ''}`}
        >
          <a className={styles.nav_link}>Events</a>
          <a className={styles.nav_link}>Projects</a>
          <a className={styles.nav_link}>Newsletter</a>
        </div>
        <button className={styles.joinus}>Join Us</button>
      </div>
    </nav>
  );
}

export default Navbar;
