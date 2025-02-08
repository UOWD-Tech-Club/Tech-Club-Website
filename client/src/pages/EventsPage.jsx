import { useState } from 'react';
import styles from './EventsPage.module.css';
import { useLocation } from 'react-router-dom';
import PageLayout from '../layout/PageLayout';

function EventsPage() {
  const [name, setName] = useState('');
  const [user_studentid, setUser_studentId] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ text: '', type: '' });
  const [showOverlay, setShowOverlay] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    user_studentid: '',
    email: '',
  });

  const location = useLocation();
  const { event } = location.state || {};

  if (!event) {
    return <p>No event data available.</p>;
  }

  const validateForm = () => {
    const newErrors = {};
    if (!/^[A-Za-z\s]{3,50}$/.test(name)) {
      newErrors.name = 'Valid name required';
    }
    if (!/^\d{7}$/.test(user_studentid)) {
      newErrors.user_studentid = '7 digit university ID';
    }
    if (!/^[^\s@]+@uowmail\.edu\.au$/.test(email)) {
      newErrors.email = 'University email format required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setStatusMessage({
        text: 'Please enter details in the correct format.',
        type: 'error',
      });
      return;
    }

    setLoading(true);
    setStatusMessage({ text: '', type: '' });

    try {
      const fetchUserDetails = await fetch(
        `https://tech-club-website.onrender.com/events/user/${user_studentid}`,
        { method: 'GET', headers: { 'Content-Type': 'application/json' } },
      );

      const userExists = await fetchUserDetails.json();
      if (!userExists.exists) {
        const addUserResponse = await fetch(
          'https://tech-club-website.onrender.com/events/user',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              user: { studentId: user_studentid, name, studentEmail: email },
            }),
          },
        );
        if (!addUserResponse.ok) throw new Error('Failed to add user');
      }

      const registeredUsers = await fetch(
        `https://tech-club-website.onrender.com/events/users/${event.event_id}`,
      );
      const regUsers = await registeredUsers.json();
      const registeredUser = regUsers.users.find(
        (user) => Number(user.user_studentid) === Number(user_studentid),
      );

      if (registeredUser) {
        setStatusMessage({
          text: 'You have already registered for this event.',
          type: 'info',
        });
      } else {
        const registerResponse = await fetch(
          'https://tech-club-website.onrender.com/events/register',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_studentid, event_id: event.event_id }),
          },
        );

        if (registerResponse.ok) {
          setStatusMessage({
            text: 'Registration successful!',
            type: 'success',
          });
          setShowOverlay(true);
        } else {
          setStatusMessage({
            text: 'Failed to register for the event.',
            type: 'error',
          });
        }
      }
    } catch {
      setStatusMessage({
        text: 'An error occurred. Please try again.',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout>
      <div className={styles.eventContainer}>
        <div className={styles.eventImage}>
          <img src={event.event_img_link} alt="Event" />
        </div>
        <div className={styles.eventDetails}>
          <h1>{event.event_title}</h1>
          <p>{event.event_details}</p>
          <h3>Interested? Register Now</h3>
          {statusMessage.text && !showOverlay && (
            <div
              className={`${styles.statusMessage} ${styles['status' + statusMessage.type]}`}
            >
              {statusMessage.text}
            </div>
          )}
          <div className={styles.formContainer}>
            <form className={styles.registrationForm} onSubmit={handleSubmit}>
              <div
                className={styles.inputFields}
                style={{
                  pointerEvents: showOverlay ? 'none' : 'auto',
                }}
              >
                {showOverlay && (
                  <div className={styles.overlay}>
                    <div className={styles.successModal}>
                      <svg
                        width="50px"
                        height="50px"
                        viewBox="0 -0.5 25 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.5 12.5L10.167 17L19.5 8"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span>You&apos;re in!</span>
                      <p>Thanks for registering! Enjoy the event.</p>
                    </div>
                  </div>
                )}
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={showOverlay}
                />
                {errors.name && (
                  <span className={styles.error}>{errors.name}</span>
                )}

                <input
                  type="text"
                  placeholder="Student ID"
                  value={user_studentid}
                  onChange={(e) => setUser_studentId(e.target.value)}
                  disabled={showOverlay}
                />
                {errors.user_studentid && (
                  <span className={styles.error}>{errors.user_studentid}</span>
                )}

                <input
                  type="email"
                  placeholder="University Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={showOverlay}
                />
                {errors.email && (
                  <span className={styles.error}>{errors.email}</span>
                )}
              </div>

              <button type="submit" disabled={loading || showOverlay}>
                Register {loading && <span className={styles.loader}></span>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default EventsPage;
