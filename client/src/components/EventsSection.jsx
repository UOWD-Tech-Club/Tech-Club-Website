import Slider from 'react-slick';
import styles from './EventsSection.module.css'; // Import CSS module
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ArrowIcon from '../assets/button-arrow.svg';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';

function EventsSection() {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:8080/events');
      const data = await response.json();
      console.log(data.events);
      setEvents(data.events);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    // Fetch events from the backend
    fetchEvents();
  }, []);

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
            <div key={event.event_id} className={styles.eventsItem}>
              <div
                className={styles.eventContent}
                style={{
                  backgroundImage: `linear-gradient(
                    to bottom,
                    rgba(255, 255, 255, 0.1),
                    rgba(0, 0, 0, 0.7)
                  ),
                  url(${event.event_img_link})`,
                }}
              >
                <div>
                  <h3 className={styles.eventTitle}>{event.event_title}</h3>
                </div>
                <div className={styles.eventInfo}>
                  <p className={styles.eventDetails}>
                    {format(new Date(event.event_date), 'yyyy-MM-dd')}
                    <br />
                    {event.event_time}
                    <br />
                    {event.event_location}
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
