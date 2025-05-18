import { useEffect, useState } from 'react';
import styles from './AttendeesList.module.css';
import { useParams } from 'react-router-dom';
import AdminLayout from '../layout/AdminPageLayout';

export default function Attendees() {
  const { eventId } = useParams();
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [eventDetails, setEventDetails] = useState(null);

  useEffect(() => {
    if (!eventId) return;

    const fetchEventAndAttendees = async () => {
      try {
        // Fetch event details
        const eventResponse = await fetch(
          `http://localhost:3000/events/${eventId}`,
        );
        const eventData = await eventResponse.json();
        setEventDetails(eventData.event);

        // Fetch attendees
        const attendeesResponse = await fetch(
          `http://localhost:3000/events/users/${eventId}`,
        );
        const attendeesData = await attendeesResponse.json();
        setAttendees(attendeesData.users);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventAndAttendees();
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
        <h2 className={styles.header}>
          {eventDetails
            ? `Attendees - ${eventDetails.event_title}`
            : 'Attendees'}
        </h2>
        <div className={styles.tableWrapper}>
          <div className={styles.tableHeader}>
            <div>Name</div>
            <div>Student ID</div>
            <div>Email</div>
            <div>Registration Date</div>
          </div>
          <div className={styles.tableBody}>
            {attendees.length > 0 ? (
              attendees.map((attendee) => (
                <div key={attendee.user_studentid} className={styles.tableRow}>
                  <div className={styles.tableCell}>{attendee.user_name}</div>
                  <div className={styles.tableCell}>
                    {attendee.user_studentid}
                  </div>
                  <div className={styles.tableCell}>
                    {attendee.user_studentemail}
                  </div>
                  <div className={styles.tableCell}>
                    {new Date(attendee.registration_date).toLocaleDateString()}
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.tableRow}>
                <div className={styles.tableCell} colSpan="4">
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
