import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './AllEventsPage.module.css';
import PageLayout from '../layout/PageLayout';
import { format } from 'date-fns';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

function AllEventsPage() {
  const [events, setEvents] = useState([]);
  const [latestEvent, setLatestEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          'https://tech-club-website.onrender.com/events',
        );
        const data = await response.json();
        const allEvents = data.events || [];

        if (allEvents.length > 0) {
          setLatestEvent(allEvents[0]);
          setEvents(allEvents.slice(1));
        } else {
          setEvents([]);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
        setEvents([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (isLoading) {
    return (
      <PageLayout>
        <div className={styles.eventsContainer}>
          <SkeletonTheme baseColor="#434343" highlightColor="#686868">
            <div className={styles.skeletonWrapper}>
              <Skeleton
                height={400}
                width={600}
                borderRadius="25px"
                inline={true}
              />
              <div className={styles.skeletonTextContainer}>
                <Skeleton count={3} height={30} />
              </div>
            </div>
          </SkeletonTheme>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className={styles.eventsContainer}>
        {/* Featured Event Section */}
        {latestEvent && (
          <Link
            to={`/events/${latestEvent.event_id}`}
            state={{ event: latestEvent }}
            className={styles.featuredEvent}
          >
            <div className={styles.imageWrapper}>
              <img
                src={
                  latestEvent.event_img_link || 'https://placehold.co/600x400'
                }
                alt={latestEvent.event_title}
                className={styles.featuredImage}
              />
              <div className={styles.readMore}>Register Now</div>
            </div>
            <div className={styles.featuredContent}>
              <span className={styles.tag}>Featured Event</span>
              <h2 className={styles.featuredTitle}>
                {latestEvent.event_title}
              </h2>
              <p className={styles.featuredExcerpt}>
                {latestEvent.event_details.length > 150
                  ? `${latestEvent.event_details.substring(0, 150)}...`
                  : latestEvent.event_details}
              </p>
              <div className={styles.meta}>
                <span className={styles.date}>
                  {format(new Date(latestEvent.event_date), 'd MMMM, yyyy')}
                </span>
                <span className={styles.location}>
                  • {latestEvent.event_location}
                </span>
              </div>
            </div>
          </Link>
        )}

        {/* Upcoming Events Section */}
        <h1 className={styles.sectionTitle}>Upcoming Events</h1>
        <div className={styles.eventsGrid}>
          {events.map((event) => (
            <Link
              key={event.event_id}
              to={`/events/${event.event_id}`}
              state={{ event }}
              className={styles.eventCard}
            >
              <div className={styles.imageWrapper}>
                <img
                  src={event.event_img_link || 'https://placehold.co/400x250'}
                  alt={event.event_title}
                  className={styles.eventImage}
                />
                <div className={styles.readMore}>Register Now</div>
              </div>
              <div className={styles.eventContent}>
                <span className={styles.tag}>Upcoming Event</span>
                <h3 className={styles.eventTitle}>{event.event_title}</h3>
                <p className={styles.eventExcerpt}>
                  {event.event_details.length > 100
                    ? `${event.event_details.substring(0, 100)}...`
                    : event.event_details}
                </p>
                <div className={styles.meta}>
                  <span className={styles.date}>
                    {format(new Date(event.event_date), 'd MMMM, yyyy')}
                  </span>
                  <span className={styles.location}>
                    • {event.event_location}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}

export default AllEventsPage;
