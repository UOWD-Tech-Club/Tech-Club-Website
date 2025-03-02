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
  }, []);

  return (
    <AdminLayout>
      <div className={styles.eventsContainer}>
        <h2 className={styles.header}>Events</h2>
        <div className={styles.tableWrapper}>
          <div className={styles.tableHeader}>
            <div>Title</div>
            <div>Location</div>
            <div>Time</div>
            <div>Date</div>
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
              >
                <EventsManagement key={event.event_id} event={event} />
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
