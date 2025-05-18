// EventsManagement.jsx
import { useState, useEffect } from 'react';
import styles from './EventsManagement.module.css';
import EventsModal from './EventsModal.jsx';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { format } from 'date-fns';

const EventsManagement = () => {
  const [eventsList, setEventsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalAction, setModalAction] = useState('edit');

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/events');

      if (!response.ok) {
        throw new Error('Failed to fetch events.');
      }

      const data = await response.json();

      // Fetch attendees for each event
      const eventsWithAttendees = await Promise.all(
        data.events.map(async (event) => {
          try {
            const attendeesResponse = await fetch(
              `http://localhost:3000/events/users/${event.event_id}`,
            );
            if (!attendeesResponse.ok) {
              throw new Error('Failed to fetch attendees');
            }
            const attendeesData = await attendeesResponse.json();
            return {
              ...event,
              attendees_count: attendeesData.users.length,
            };
          } catch (error) {
            console.error(
              `Error fetching attendees for event ${event.event_id}:`,
              error,
            );
            return {
              ...event,
              attendees_count: 0,
            };
          }
        }),
      );

      setEventsList(eventsWithAttendees);
      setError(null);
    } catch (error) {
      console.error('Error fetching events:', error);
      setError('Failed to load events. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleModalClose = (dataChanged = false) => {
    setShowModal(false);
    setSelectedEvent(null);
    if (dataChanged) {
      fetchEvents();
    }
  };

  const handleAddEvent = () => {
    setSelectedEvent(null);
    setModalAction('add');
    setShowModal(true);
  };

  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setModalAction('edit');
    setShowModal(true);
  };

  const EventsSkeletonLoader = () => (
    <SkeletonTheme baseColor="#434343" highlightColor="#686868">
      {[...Array(5)].map((_, index) => (
        <div className={styles.tableRow} key={index}>
          <div className={styles.eventTitle}>
            <Skeleton height={20} width="90%" />
          </div>
          <div className={styles.eventLocation}>
            <Skeleton height={20} width="80%" />
          </div>
          <div className={styles.eventTime}>
            <Skeleton height={20} width="70%" />
          </div>
          <div className={styles.eventDate}>
            <Skeleton height={20} width="70%" />
          </div>
          <div className={styles.attendees}>
            <Skeleton height={20} width="50%" />
          </div>
        </div>
      ))}
    </SkeletonTheme>
  );

  return (
    <div className={styles.eventsContainer}>
      <div className={styles.header}>
        <h1>Events</h1>
        <button className={styles.createButton} onClick={handleAddEvent}>
          Create Event
        </button>
      </div>

      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <div className={styles.eventTitle}>Title</div>
          <div className={styles.eventLocation}>Location</div>
          <div className={styles.eventTime}>Time</div>
          <div className={styles.eventDate}>Date</div>
          <div className={styles.attendees}>Attendees</div>
        </div>
        <div className={styles.tableContent}>
          {loading ? (
            <EventsSkeletonLoader />
          ) : error ? (
            <div className={styles.error}>{error}</div>
          ) : eventsList.length > 0 ? (
            eventsList.map((event) => (
              <div
                className={styles.tableRow}
                key={event.event_id}
                onClick={() => handleEditEvent(event)}
              >
                <div className={styles.eventTitle}>{event.event_title}</div>
                <div className={styles.eventLocation}>
                  {event.event_location}
                </div>
                <div className={styles.eventTime}>
                  {String(event.event_time).split(':').slice(0, 2).join(':')}
                </div>
                <div className={styles.eventDate}>
                  {format(new Date(event.event_date), 'dd/MM/yyyy')}
                </div>
                <div className={styles.attendees}>{event.attendees_count}</div>
              </div>
            ))
          ) : (
            <div className={styles.noEvents}>No events available</div>
          )}
        </div>
      </div>
      {showModal && (
        <EventsModal
          event={selectedEvent}
          onClose={handleModalClose}
          action={modalAction}
        />
      )}
    </div>
  );
};

export default EventsManagement;
