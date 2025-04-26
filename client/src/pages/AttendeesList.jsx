import { useEffect, useState } from 'react';
import styles from './AttendeesList.module.css';
import { useLocation } from 'react-router-dom';
import AdminLayout from '../layout/AdminPageLayout';

export default function Attendees() {
  const location = useLocation();
  const { event } = location.state || {};
  const [attendees, setAttendees] = useState([]);

  useEffect(() => {
    if (!event) return;

    const fetchAttendees = async () => {
      try {
        const response = await fetch(
          `https://tech-club-website.onrender.com/events/users/${event.event_id}`,
        );
        const data = await response.json();
        setAttendees(data.users);
      } catch (error) {
        console.error('Error fetching attendees:', error);
      }
    };

    fetchAttendees();
  }, [event]);

  if (!event) {
    return (
      <AdminLayout>
        <div className={styles.attendeesContainer}>
          <p>No event data available.</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className={styles.attendeesContainer}>
        <h2 className={styles.header}>Attendees</h2>
        <div className={styles.tableWrapper}>
          <div className={styles.tableHeader}>
            <div>First Name</div>
            <div>Last Name</div>
            <div>Student ID</div>
            <div>Email</div>
          </div>
          <div className={styles.tableBody}>
            {attendees.map((attendee) => (
              <div key={attendee.user_studentid} className={styles.tableRow}>
                <div className={styles.tableCell}>{attendee.fname}</div>
                <div className={styles.tableCell}>{attendee.lname}</div>
                <div className={styles.tableCell}>{attendee.studentId}</div>
                <div className={styles.tableCell}>{attendee.studentEmail}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
