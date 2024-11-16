import Slider from 'react-slick';
import styles from './NewsSection.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useState, useEffect } from 'react';

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

  const [dailyNews, setDailyNews] = useState([]);
  const fetchDailyNews = async () => {
    try {
      const response = await fetch('http://localhost:8080/news/dailynews');
      const data = await response.json();
      setDailyNews(data.news);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };
  useEffect(() => {
    fetchDailyNews();
  }, []);

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

      <div className={styles.carousel}>
        <Slider {...settings2}>
          {dailyNews.map((news, index) => (
            <div
              key={index}
              className={styles.carouselItem}
              style={{
                height: '200px !important',
                backgroundColor: 'black',
              }}
            >
              <div>
                <p>{news.news_title}</p>
              </div>
              <div style={{ backgroundColor: 'yellow' }}>
                <p>{news.news_pubDate}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <div className={styles.buttonContainer}>
        <button className={styles.seeMoreButton}>
          All News
          <img alt="Arrow Icon" className={styles.arrowIcon} />
        </button>
      </div>
    </div>
  );
}

export default Newsletter;
