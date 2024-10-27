import Slider from 'react-slick';
import styles from './EventsSection.module.css'; // Import CSS module
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ArrowIcon from '../assets/button-arrow.svg';

function EventsSection() {
  const events = [
    {
      id: 1,
      title: 'Event Example 1',
      date: '25th October, 2024',
      time: '3:00pm - 4:30pm',
      location: '@2.55',
    },
    {
      id: 2,
      title: 'Event Example 2',
      date: '25th October, 2024',
      time: '3:00pm - 4:30pm',
      location: '@2.55',
    },
    {
      id: 3,
      title: 'Event Example 3',
      date: '25th October, 2024',
      time: '3:00pm - 4:30pm',
      location: '@2.55',
    },
    {
      id: 4,
      title: 'Event Example 4',
      date: '25th October, 2024',
      time: '3:00pm - 4:30pm',
      location: '@2.55',
    },
    // more events...
  ];

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 1500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1100,
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

  return (
    <div className={styles.eventsContainer}>
      <div className={styles.eventsHeader}>
        <h1>Upcoming Events</h1>
      </div>

      <div className={styles.events}>
        <Slider {...settings}>
          {events.map((event) => (
            <div key={event.id} className={styles.eventsItem}>
              <div className={styles.eventContent}>
                <h3 className={styles.eventTitle}>{event.title}</h3>
                <div className={styles.eventInfo}>
                  <p className={styles.eventDetails}>
                    {event.date}
                    <br />
                    {event.time}
                    <br />
                    {event.location}
                  </p>
                  <button className={styles.registerButton}>Register →</button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <div className={styles.buttonContainer}>
        <button className={styles.allEventsButton}>All Events →</button>
        <img src={ArrowIcon} alt="Arrow Icon" className={styles.arrowIcon} />
      </div>
    </div>
  );
}

export default EventsSection;
