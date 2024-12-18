// import styles from './Homepage.module.css';
import { useEffect, useRef, useState } from 'react';
import styles from './AnimatedNavbar.module.css';

// eslint-disable-next-line react/prop-types
export default function AnimatedNavbar({ navbar, footer, img, children }) {
  const [scroll, setScroll] = useState(0);
  const scrollContainerRef = useRef(null);

  const handleScroll = () => {
    const { scrollTop } = scrollContainerRef.current;
    setScroll(scrollTop);
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    scrollContainer.addEventListener('scroll', handleScroll);
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={scrollContainerRef} className={styles.scrollable}>
      <div className={scroll > 0 ? styles.isSticky : null}>
        <section
          className={styles.first}
          style={{
            '--img': `url(${img}) no-repeat right / cover`,
          }}
        >
          <header className={styles.pageHeader}>{navbar}</header>
          <div className={styles.logo_wrapper}>
            <div className={styles.logo}>
              <span className={styles.logo_tech}>Tech</span>
              <span className={styles.logo_club}>Club</span>
            </div>
          </div>
        </section>
        <section className={styles.second}>{children}</section>
        {footer}
      </div>
    </div>
  );
}
