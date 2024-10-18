import { useCallback, useEffect } from 'react';
import useEvents from 'embla-carousel-react';
import eventImage from '../../public/img/Picture1.png';
import styles from './Eventspage.module.css'; // Import CSS module

function Eventspage() {
  const [emblaRef, emblaApi] = useEvents({
    watchDrag: true,
  });

  useEffect(() => {
    if (emblaApi) {
      // Recheck scroll bounds when the window is resized
      const handleResize = () => {
        emblaApi.reInit();
      };

      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
    }
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  //TESTING DATA
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
      title: 'Event Example 3 ',
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
    {
      id: 5,
      title: 'Event Example 5',
      date: '25th October, 2024',
      time: '3:00pm - 4:30pm',
      location: '@2.55',
    },
    {
      id: 6,
      title: 'Event Example 6',
      date: '25th October, 2024',
      time: '3:00pm - 4:30pm',
      location: '@2.55',
    },
    {
      id: 7,
      title: 'Event Example 7',
      date: '25th October, 2024',
      time: '3:00pm - 4:30pm',
      location: '@2.55',
    },
    {
      id: 8,
      title: 'Event Example 8',
      date: '25th October, 2024',
      time: '3:00pm - 4:30pm',
      location: '@2.55',
    },
    {
      id: 9,
      title: 'Event Example 9',
      date: '25th October, 2024',
      time: '3:00pm - 4:30pm',
      location: '@2.55',
    },
  ];

  //Make real fetches...

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.carouselHeader}>
        <h2 className={styles.carouselHeading}>Upcoming Events</h2>
        <button className={styles.allEventsButton}>All Events →</button>
      </div>
      <div className={styles.embla}>
        <div className={styles.emblaViewport} ref={emblaRef}>
          <div className={styles.emblaContainer}>
            {events.map((event) => (
              <div key={event.id} className={styles.emblaSlide}>
                <h3 className={styles.heading}>{event.title}</h3>
                <img
                  src={eventImage}
                  alt={event.title}
                  className={styles.slideImage}
                />
                <div className={styles.slideContent}>
                  <p>
                    {event.date}
                    <br />
                    {event.time}
                    <br />
                    {event.location}
                    <br />
                  </p>
                </div>
                <button className={styles.registerButton}>Register →</button>
              </div>
            ))}
          </div>
        </div>
        <button className={styles.emblaPrev} onClick={scrollPrev}>
          ‹
        </button>
        <button className={styles.emblaNext} onClick={scrollNext}>
          ›
        </button>
      </div>
    </div>
  );
}

export default Eventspage;
