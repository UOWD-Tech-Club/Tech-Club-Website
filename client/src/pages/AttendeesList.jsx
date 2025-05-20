import { useEffect, useState } from 'react';
import styles from './AttendeesList.module.css';
import { useParams } from 'react-router-dom';
import AdminLayout from '../layout/AdminPageLayout';

export default function Attendees() {
  const { eventId } = useParams();
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!eventId) return;

    const fetchAttendees = async () => {
      try {
        const response = await fetch(
          `https://tech-club-website.onrender.com/events/users/${eventId}`,
        );
        const data = await response.json();
        console.log('Fetched attendees data:', data); // Debug log
        setAttendees(data.users);
      } catch (error) {
        console.error('Error fetching attendees:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendees();
  }, [eventId]);

  if (loading) {
    return (
      <AdminLayout>
        <div className={styles.attendeesContainer}>
          <p>Loading attendees...</p>
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
            <div>Name</div>
            <div>Student ID</div>
            <div>Email</div>
            <div>Phone</div>
            <div>Degree</div>
          </div>
          <div className={styles.tableBody}>
            {attendees.length > 0 ? (
              attendees.map((attendee) => (
                <div key={attendee.user_studentid} className={styles.tableRow}>
                  <div className={styles.tableCell}>{attendee.user_name}</div>
                  <div className={styles.tableCell}>
                    {attendee.user_studentid}
                  </div>
                  <div
                    className={styles.tableCell}
                    title={attendee.user_studentemail}
                  >
                    {attendee.user_studentemail}
                  </div>
                  <div className={styles.tableCell}>{attendee.user_phone}</div>
                  <div className={styles.tableCell}>{attendee.user_degree}</div>
                </div>
              ))
            ) : (
              <div className={styles.tableRow}>
                <div className={styles.tableCell} colSpan="3">
                  No attendees found
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
