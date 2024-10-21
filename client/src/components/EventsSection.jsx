import Slider from 'react-slick';
import styles from './EventsSection.module.css'; // Import CSS module
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
    variableWidth: true,
    arrows: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 970,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 300,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  return (
    <div className={styles.eventsContainer}>
      <div className={styles.eventsHeader}>
        <h2 className={styles.eventsHeading}>Upcoming Events</h2>
        <button className={styles.allEventsButton}>All Events →</button>
      </div>
      <Slider {...settings} className={styles.events}>
        {events.map((event) => (
          <div key={event.id} className={styles.eventsItem}>
            <div className={styles.eventContent}>
              <div>
                <h3 className={styles.eventTitle}>{event.title}</h3>
                <p className={styles.eventDetails}>
                  {event.date}
                  <br />
                  {event.time}
                  <br />
                  {event.location}
                </p>
              </div>
              <button className={styles.registerButton}>Register →</button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default EventsSection;
