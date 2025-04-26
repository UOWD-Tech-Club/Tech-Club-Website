// EventsManagementPage.jsx
import { useState, useEffect } from 'react';
import EventsManagement from '../components/EventsManagement';
import styles from './EventsManagementPage.module.css';
import EventsModal from '../components/EventsModal';
import AdminLayout from '../layout/AdminPageLayout';

export default function EventsManagementPage() {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          'https://tech-club-website.onrender.com/events',
        );
        const data = await response.json();
        setEvents(data.events);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // const formatDate = (dateString) => {
  //   const options = { year: 'numeric', month: 'short', day: 'numeric' };
  //   return new Date(dateString).toLocaleDateString(undefined, options);
  // };

  // const formatTime = (timeString) => {
  //   return new Date(`2000-01-01T${timeString}`).toLocaleTimeString([], {
  //     hour: '2-digit',
  //     minute: '2-digit',
  //   });
  // };

  return (
    <AdminLayout>
      <div className={styles.eventsContainer}>
        <h2 className={styles.header}>Events</h2>
        <div className={styles.tableWrapper}>
          <div className={styles.tableHeader}>
            <div>Title</div>
            <div>Location</div>
            {!isMobile && (
              <>
                <div>Time</div>
                <div>Date</div>
              </>
            )}
            <div>Attendees</div>
          </div>
          <div className={styles.tableBody}>
            {events.map((event) => (
              <div
                key={event.event_id}
                onClick={() => {
                  setSelectedEvent(event);
                  setShowModal(true);
                }}
                className={styles.eventRow}
              >
                <EventsManagement
                  key={event.event_id}
                  event={event}
                  isMobile={isMobile}
                />
              </div>
            ))}
          </div>
        </div>
        {showModal && selectedEvent && (
          <EventsModal
            event={selectedEvent}
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
    </AdminLayout>
  );
}
