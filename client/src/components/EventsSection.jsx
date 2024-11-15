import Slider from 'react-slick';
import styles from './EventsSection.module.css'; // Import CSS module
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ArrowIcon from '../assets/button-arrow.svg';

function EventsSection() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch events from the backend
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:8080/events/');
        const data = await response.json();
        console.log('API Response:', data); // Log the full response
        setEvents(data.events); // Access the 'events' array
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  function formatDateTime(isoString) {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  const handleRegisterClick = (event) => {
    navigate(`/events/${event.event_id}`, { state: { event } });
  };

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
              <div className={styles.eventContent}>
                <h3 className={styles.eventTitle}>{event.event_title}</h3>
                <div className={styles.eventInfo}>
                  <p className={styles.eventDetails}>
                    {formatDateTime(event.event_date)}
                    <br />
                    {event.event_time}
                    <br />
                    {event.event_location}
                  </p>
                  <button
                    className={styles.registerButton}
                    onClick={() => handleRegisterClick(event)}
                  >
                    Register →
                  </button>
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
