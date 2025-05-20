import { useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './AllExecutives.module.css';
import PageLayout from '../layout/PageLayout';

function AllExecutives() {
  useEffect(() => {
    const handleResize = () => {
      // logic for resizing if needed
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const carouselSettings = {
    slidesToShow: 3,
    dots: false,
    arrows: false,
    infinite: true,
    speed: 300,
    variableWidth: true,
    adaptiveHeight: false,
    slidesToScroll: 1,
    draggable: true,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const TeamSlider = ({ title }) => (
    <div className={styles.teamSection}>
      <div className={styles.teamTitle}>
        <h3>{title}</h3>
      </div>
      <Slider {...carouselSettings} className={styles.carousel}>
        <div className={styles.carouselItem}>
          <div className={styles.memberImage}></div>
          <h3 className={styles.memberName}>Name</h3>
          <p className={styles.memberRole}>Head</p>
        </div>
        <div className={styles.carouselItem}>
          <div className={styles.memberImage}></div>
          <h3 className={styles.memberName}>Name</h3>
          <p className={styles.memberRole}>Deputy</p>
        </div>
        <div className={styles.carouselItem}>
          <div className={styles.memberImage}></div>
          <h3 className={styles.memberName}>Name</h3>
          <p className={styles.memberRole}>Executive</p>
        </div>
        <div className={styles.carouselItem}>
          <div className={styles.memberImage}></div>
          <h3 className={`${styles.memberName} ${styles.inactiveName}`}>
            Name
          </h3>
          <p className={styles.memberRole}>Executive</p>
        </div>
      </Slider>
    </div>
  );

  return (
    <PageLayout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.subHeading}>Meet the Tech Club</h2>
          <h1 className={styles.mainHeading}>All Executives</h1>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.content}>
          <TeamSlider title="The AI Team" />
          <TeamSlider title="The CyberSecurity Team" />
          <TeamSlider title="The Engineering Team" />
          <TeamSlider title="The Web Dev Team" />
          <TeamSlider title="The Media Team" />
          <TeamSlider title="The Events Team" />
        </div>
      </div>
    </PageLayout>
  );
}

export default AllExecutives;
