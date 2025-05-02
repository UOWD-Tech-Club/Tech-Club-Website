// EventsManagement.jsx
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import styles from './EventsManagement.module.css';

export default function EventsManagement(props) {
  const [attendeesCount, setAttendeesCount] = useState(0);
  const event = props.event;

  useEffect(() => {
    const fetchAttendees = async () => {
      try {
        const response = await fetch(
          `https://tech-club-website.onrender.com/events/users/${event.event_id}`,
        );
        const data = await response.json();

        setAttendeesCount(data.users.length);
      } catch (error) {
        console.error('Error fetching attendees:', error);
      }
    };
    fetchAttendees();
  }, [event.event_id]);

  return (
    <div className={styles.tableRow}>
      <div className={styles.eventTitle}>{event.event_title}</div>
      <div className={styles.eventLocation}>{event.event_location}</div>
      <div className={styles.eventTime}>
        {String(event.event_time).split(':').slice(0, 2).join(':')}
      </div>
      <div className={styles.eventDate}>
        {format(new Date(event.event_date), 'dd/MM/yyyy')}
      </div>
      <div className={styles.attendees}>{attendeesCount}</div>
    </div>
  );
}
