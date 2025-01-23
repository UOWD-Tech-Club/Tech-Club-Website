import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import Slider from 'react-slick';
import styles from './NewsSection.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import newsImage from '../assets/newsletter-bg.png';
import { format } from 'date-fns';
import { NextArrow, PrevArrow } from './CustomArrows/CustomArrows';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

function Newsletter() {
  const [car1, setCar1] = useState(null);
  const [car2, setCar2] = useState(null);
  const [loading, setLoading] = useState(true);

  const sliderRef1 = useRef(null);
  const sliderRef2 = useRef(null);

  const mobileSize = 599;
  const tabletSize = 959;
  const [isMobile, setIsMobile] = useState(window.innerWidth <= mobileSize);
  const [isTablet, setIsTablet] = useState(window.innerWidth <= tabletSize);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= mobileSize);
      setIsTablet(window.innerWidth <= tabletSize);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setCar1(sliderRef1.current);
    setCar2(sliderRef2.current);
  }, []);

  const handleClick = (newsId) => {
    // Handle click on news card
    console.log('News ' + newsId);
  };

  // ------------------------ Fetching News ---------------------------

  const [news, setNews] = useState([]);

  const fetchNews = async () => {
    try {
      const response = await fetch('http://localhost:8080/news');
      const data = await response.json();
      console.log(data.news);
      setNews(data.news);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  useEffect(() => {
    // Fetch news from the backend
    fetchNews();
  }, []);

  // ------------------------------------------------------------------

  // Sample News for testing

  // const news = [
  //   {
  //     news_id: 1,
  //     news_title: 'News Headline 1',
  //     news_date: '2024-10-25',
  //     news_img_link: newsImage,
  //   },
  //   {
  //     news_id: 2,
  //     news_title: 'News Headline 2',
  //     news_date: '2024-10-25',
  //     news_img_link: newsImage,
  //   },
  //   {
  //     news_id: 3,
  //     news_title: 'News Headline 3',
  //     news_date: '2024-10-25',
  //     news_img_link: newsImage,
  //   },
  //   {
  //     news_id: 4,
  //     news_title: 'News Headline 4',
  //     news_date: '2024-10-25',
  //     news_img_link: newsImage,
  //   },
  //   {
  //     news_id: 5,
  //     news_title: 'News Headline 5',
  //     news_date: '2024-10-25',
  //     news_img_link: newsImage,
  //   },
  //   {
  //     news_id: 6,
  //     news_title: 'News Headline 6',
  //     news_date: '2024-10-25',
  //     news_img_link: newsImage,
  //   },
  //   {
  //     news_id: 7,
  //     news_title: 'News Headline 7',
  //     news_date: '2024-10-25',
  //     news_img_link: newsImage,
  //   },
  //   {
  //     news_id: 8,
  //     news_title: 'News Headline 8',
  //     news_date: '2024-10-25',
  //     news_img_link: newsImage,
  //   },
  //   {
  //     news_id: 9,
  //     news_title: 'News Headline 9',
  //     news_date: '2024-10-25',
  //     news_img_link: newsImage,
  //   },
  //   {
  //     news_id: 10,
  //     news_title: 'News Headline 10',
  //     news_date: '2024-10-25',
  //     news_img_link: newsImage,
  //   },
  // ];

  // Settings for the first carousel
  const settings1 = {
    dots: false,
    arrows: loading ? false : true,
    infinite: true,
    speed: 300,
    adaptiveHeight: false,
    variableWidth: true,
    draggable: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <PrevArrow news={true} />,
    nextArrow: <NextArrow news={true} />,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: tabletSize,
        settings: {
          arrows: false,
          slidesToShow: 2,
        },
      },
      {
        breakpoint: mobileSize,
        settings: {
          arrows: false,
          slidesToShow: 1,
        },
      },
    ],
  };

  // Settings for the second carousel
  const settings2 = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 300,
    variableWidth: true,
    adaptiveHeight: false,
    slidesToScroll: 1,
    draggable: false,
    responsive: [],
  };

  const renderLoadingComponent = (settings, first) => (
    <SkeletonTheme baseColor="#434343" highlightColor="#686868">
      <Slider {...settings}>
        {Array.from({ length: isMobile ? 2 : 6 }).map((_, index) => (
          <div key={index}>
            <Skeleton
              width={isMobile || !first ? 290 : 400}
              height={185}
              borderRadius="25px"
            />
          </div>
        ))}
      </Slider>
    </SkeletonTheme>
  );

  return (
    <div className={styles.newsletterContainer}>
      <div className={styles.newsletter}>
        <h1>News</h1>
      </div>

      {/* First Carousel */}

      <div className={styles.carousel}>
        {loading ? (
          renderLoadingComponent(settings1, true)
        ) : (
          <Slider
            {...settings1}
            asNavFor={isTablet ? null : car2} // Conditionally set asNavFor
            ref={(slider) => {
              sliderRef1.current = slider;
            }} // Correctly set ref
          >
            {news
              .slice(0, Math.floor(news.length * (isMobile ? 1 : 0.5)))
              .map((item) => (
                <div
                  key={item.news_id}
                  className={styles.carouselItem}
                  onClick={() => handleClick(item.news_id)}
                >
                  <img
                    src={item.news_img_link}
                    alt={item.news_title}
                    className={styles.newsImage}
                  />
                  <div className={styles.newsContent}>
                    <h2>{item.news_title}</h2>
                    <p className={styles.newsDate}>
                      {format(new Date(item.news_date), 'd MMMM, yyyy')}
                    </p>
                  </div>
                </div>
              ))}
          </Slider>
        )}
      </div>

      {/* Second Carousel for Desktop/Tablet */}

      {isMobile ? null : (
        <div className={classNames(styles.carousel, styles.secondCarousel)}>
          {loading ? (
            renderLoadingComponent(settings2, false)
          ) : (
            <Slider
              {...settings2}
              asNavFor={isTablet ? null : car1} // Conditionally set asNavFor
              ref={(slider) => {
                sliderRef2.current = slider;
              }}
            >
              {news.slice(Math.floor(news.length * 0.5)).map((item) => (
                <div
                  key={item.news_id}
                  className={styles.secondCarouselItem}
                  onClick={() => handleClick(item.news_id)}
                >
                  <img
                    src={item.news_img_link}
                    alt={item.news_title}
                    className={styles.newsImage}
                  />
                  <div className={styles.newsContent}>
                    <h2>{item.news_title}</h2>
                    <p className={styles.newsDate}>
                      {format(new Date(item.news_date), 'd MMMM, yyyy')}
                    </p>
                  </div>
                </div>
              ))}
            </Slider>
          )}
        </div>
      )}

      <div className={styles.buttonContainer}>
        <button className={styles.seeMoreButton}>
          All news
          <svg
            className={styles.arrow}
            width="20"
            height="16"
            viewBox="0 0 20 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.3972 0.644005C11.5924 0.448743 11.909 0.448743 12.1043 0.644005L19.1067 7.64645C19.302 7.84171 19.302 8.1583 19.1067 8.35356L12.1043 15.356C11.909 15.5513 11.5924 15.5513 11.3972 15.356C11.2019 15.1607 11.2019 14.8442 11.3972 14.6489L17.5461 8.50001H1.24707C0.970928 8.50001 0.74707 8.27615 0.74707 8.00001C0.74707 7.72386 0.970928 7.50001 1.24707 7.50001H17.5461L11.3972 1.35111C11.2019 1.15585 11.2019 0.839267 11.3972 0.644005Z"
              fill="#121212"
            />
            <path
              d="M12.1043 0.644005L11.7507 0.997558V0.997559L12.1043 0.644005ZM11.3972 0.644005L11.7507 0.997559L11.7507 0.997558L11.3972 0.644005ZM19.1067 7.64645L19.4603 7.2929V7.2929L19.1067 7.64645ZM19.1067 8.35356L19.4603 8.70711V8.70711L19.1067 8.35356ZM11.3972 14.6489L11.7507 15.0025L11.3972 14.6489ZM17.5461 8.50001L17.8996 8.85356L18.7532 8.00001H17.5461V8.50001ZM17.5461 7.50001V8.00001H18.7532L17.8996 7.14645L17.5461 7.50001ZM11.3972 1.35111L11.7507 0.997559L11.7507 0.997558L11.3972 1.35111ZM12.4578 0.290452C12.0673 -0.100073 11.4342 -0.100073 11.0436 0.290452L11.7507 0.997558H11.7507L12.4578 0.290452ZM19.4603 7.2929L12.4578 0.290452L11.7507 0.997559L18.7532 8.00001L19.4603 7.2929ZM19.4603 8.70711C19.8508 8.31659 19.8508 7.68342 19.4603 7.2929L18.7532 8V8.00001L19.4603 8.70711ZM12.4578 15.7096L19.4603 8.70711L18.7532 8.00001L11.7507 15.0025L12.4578 15.7096ZM11.0436 15.7096C11.4342 16.1001 12.0673 16.1001 12.4578 15.7096L11.7507 15.0025H11.7507L11.0436 15.7096ZM11.0436 14.2953C10.6531 14.6859 10.6531 15.319 11.0436 15.7096L11.7507 15.0025L11.0436 14.2953ZM17.1925 8.14645L11.0436 14.2953L11.7507 15.0025L17.8996 8.85356L17.1925 8.14645ZM1.24707 9.00001H17.5461V8.00001H1.24707V9.00001ZM0.24707 8.00001C0.24707 8.55229 0.694786 9.00001 1.24707 9.00001V8.00001H0.24707ZM1.24707 7.00001C0.694786 7.00001 0.24707 7.44772 0.24707 8.00001H1.24707V7.00001ZM17.5461 7.00001H1.24707V8.00001H17.5461V7.00001ZM11.0436 1.70467L17.1925 7.85356L17.8996 7.14645L11.7507 0.997559L11.0436 1.70467ZM11.0436 0.290451C10.6531 0.680976 10.6531 1.31414 11.0436 1.70467L11.7507 0.997558V0.997559L11.0436 0.290451Z"
              fill="#121212"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Newsletter;
