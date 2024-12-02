import Slider from 'react-slick';
import styles from './Newsletter.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useState, useEffect } from 'react';

const Newsletter = () => {
  // Settings for the first carousel
  const settings1 = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
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
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
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

  const [newsPart1, setNewsPart1] = useState([]);
  const [newsPart2, setNewsPart2] = useState([]);

  const fetchDailyNews = async () => {
    try {
      const response = await fetch('http://localhost:8080/news/dailynews');
      const data = await response.json();

      const allNews = data.news;
      // Split news into two parts
      const midIndex = Math.ceil(allNews.length / 2);
      setNewsPart1(allNews.slice(0, midIndex));
      setNewsPart2(allNews.slice(midIndex));
    } catch (error) {
      console.error('Error fetching news:', error);
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
          {newsPart1.map((news, index) => (
            <div key={index} className={styles.carouselItem}>
              <h2>{news.news_title}</h2>
              <p>{news.summary}</p>
            </div>
          ))}
        </Slider>
      </div>

      {/* Second Carousel */}
      <div className={styles.carousel}>
        <Slider {...settings2}>
          {newsPart2.map((news, index) => (
            <div key={index} className={styles.carouselItem}>
              <h2>{news.news_title}</h2>
            </div>
          ))}
        </Slider>
      </div>

      <div className={styles.buttonContainer}>
        <button className={styles.seeMoreButton}>All News</button>
      </div>
    </div>
  );
};

export default Newsletter;
