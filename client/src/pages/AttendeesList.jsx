import { useEffect, useState } from 'react';
import styles from './AttendeesList.module.css';
import { useLocation } from 'react-router-dom';
import AdminLayout from '../layout/AdminPageLayout';

export default function Attendees() {
  const location = useLocation();
  const { event } = location.state || {};
  const [attendees, setAttendees] = useState([]);

  useEffect(() => {
    if (!event) return; // Prevent fetching if event is undefined

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
  }, [event]); // Depend on event to prevent unnecessary calls

  if (!event) {
    return <p>No Attendees data available.</p>;
  }

  return (
    <AdminLayout>
      <div className={styles.attendeesContainer}>
        <h2 className={styles.header}>Attendees</h2>
        <div className={styles.tableWrapper}>
          <div className={styles.tableHeader}>
            <div className={styles.fName}>First Name</div>
            <div className={styles.lName}>Last Name</div>
            <div className={styles.sID}>Student ID</div>
            <div className={styles.email}>Email</div>
          </div>
          <div className={styles.tableBody}>
            {attendees.map((attendee) => (
              <div key={attendee.user_studentid}>
                <div>{attendee.fname}</div>
                <div>{attendee.lname}</div>
                <div>{attendee.studentId}</div>
                <div>{attendee.studentEmail}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
