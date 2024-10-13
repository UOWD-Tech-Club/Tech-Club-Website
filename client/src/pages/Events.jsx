import { useCallback } from 'react';
import useEvents from 'embla-carousel-react';
import eventImage from './Screenshot 2024-03-26 022152.png';
import styles from './Events.module.css'; // Import CSS module

export const Events = () => {
  const [emblaRef, emblaApi] = useEvents({ watchDrag: true, skipSnaps: true });

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
      title: 'Zain Example',
      date: '25th October, 2024',
      time: '3:00pm - 4:30pm',
      location: '@2.55',
    },
    {
      id: 2,
      title: 'Event Example',
      date: '25th October, 2024',
      time: '3:00pm - 4:30pm',
      location: '@2.55',
    },
    {
      id: 3,
      title: 'Event Example',
      date: '25th October, 2024',
      time: '3:00pm - 4:30pm',
      location: '@2.55',
    },
    {
      id: 4,
      title: 'Event Example',
      date: '25th October, 2024',
      time: '3:00pm - 4:30pm',
      location: '@2.55',
    },
    {
      id: 5,
      title: 'Event Example',
      date: '25th October, 2024',
      time: '3:00pm - 4:30pm',
      location: '@2.55',
    },
    {
      id: 6,
      title: 'Event Example',
      date: '25th October, 2024',
      time: '3:00pm - 4:30pm',
      location: '@2.55',
    },
    {
      id: 7,
      title: 'Event Example',
      date: '25th October, 2024',
      time: '3:00pm - 4:30pm',
      location: '@2.55',
    },
  ];

  //Make real fetches...

  return (
    <div className={styles.carouselContainer}>
      <h2 className={styles.carouselHeading}>Upcoming Events</h2>
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
                  <p>{event.date}</p>
                  <p>{event.time}</p>
                  <p>{event.location}</p>
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
      <button className={styles.allEventsButton}>All Events →</button>
    </div>
  );
};
