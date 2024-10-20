import Slider from 'react-slick';
import styles from './Newsletterpage.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ArrowIcon from '../assets/button-arrow.svg';

function Newsletter() {
  // Settings for the first carousel
  const settings1 = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 1500,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Settings for the second carousel
  const settings2 = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 1100,
    autoplay: true,
    autoplaySpeed: 4500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={styles.newsletterContainer}>
      <div className={styles.newsletter}>
        <h1>News</h1>
      </div>

      {/* First Carousel */}
      <div className={styles.carousel}>
        <Slider {...settings1}>
          <div className={styles.carouselItem}>
            <h2>News Headline 1</h2>
          </div>
          <div className={styles.carouselItem}>
            <h2>News Headline 2</h2>
          </div>
          <div className={styles.carouselItem}>
            <h2>News Headline 3</h2>
          </div>
        </Slider>
      </div>

      {/* Second Carousel */}
      <div className={styles.carousel}>
        <Slider {...settings2}>
          <div className={styles.carouselItem}>
            <h2>News Headline 4</h2>
          </div>
          <div className={styles.carouselItem}>
            <h2>News Headline 5</h2>
          </div>
          <div className={styles.carouselItem}>
            <h2>News Headline 6</h2>
          </div>
          <div className={styles.carouselItem}>
            <h2>News Headline 7</h2>
          </div>
        </Slider>
      </div>

      <div className={styles.buttonContainer}>
        <button className={styles.seeMoreButton}>
          All News
          <img src={ArrowIcon} alt="Arrow Icon" className={styles.arrowIcon} />
        </button>
      </div>
    </div>
  );
}

export default Newsletter;
