import { useState, useEffect } from 'react';
import Slider from 'react-slick';
// import eventImage from '../img/Picture1.png';
import styles from './EventsSection.module.css'; // Import CSS module
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function EventsSection() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events from the backend
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/events'); // Adjust the URL based on your backend server
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const settings = {
    dots: false,
    variableWidth: true, // Disable variable width for consistent card sizing
    arrows: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 3, // This will ensure 3 cards are shown
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          variableWidth: false,
        },
      },
      {
        breakpoint: 970,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          variableWidth: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          variableWidth: false,
        },
      },
      {
        breakpoint: 300,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          variableWidth: false,
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
          <div key={event.event_id} className={styles.eventsItem}>
            <div className={styles.eventContent}>
              <div>
                <h3 className={styles.eventTitle}>{event.event_title}</h3>
                <p className={styles.eventDetails}>
                  {event.event_date}
                  <br />
                  {event.event_date}
                  <br />
                  {event.event_location}
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
