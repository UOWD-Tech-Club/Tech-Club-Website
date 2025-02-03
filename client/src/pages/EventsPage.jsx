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
          {statusMessage.text && (
            <div
              className={`${styles.statusMessage} ${styles['status' + statusMessage.type]}`}
            >
              {statusMessage.text}
            </div>
          )}
          <div className={styles.formContainer}>
            {showOverlay && (
              <div className={styles.overlay}>
                <button
                  className={styles.nextButton}
                  onClick={() => setShowOverlay(false)}
                >
                  OK
                  <svg
                    className={styles.arrow}
                    width="20"
                    height="16"
                    viewBox="0 0 20 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M11.3972 0.644005C11.5924 0.448743 11.909 0.448743 12.1043 0.644005L19.1067 7.64645C19.302 7.84171 19.302 8.1583 19.1067 8.35356L12.1043 15.356C11.909 15.5513 11.5924 15.5513 11.3972 15.356C11.2019 15.1607 11.2019 14.8442 11.3972 14.6489L17.5461 8.50001H1.24707C0.970928 8.50001 0.74707 8.27615 0.74707 8.00001C0.74707 7.72386 0.970928 7.50001 1.24707 7.50001H17.5461L11.3972 1.35111C11.2019 1.15585 11.2019 0.839267 11.3972 0.644005Z"
                      fill="#121212"
                    />
                    <path
                      d="M12.1043 0.644005L11.7507 0.997558V0.997559L12.1043 0.644005ZM11.3972 0.644005L11.7507 0.997559L11.7507 0.997558L11.3972 0.644005ZM19.1067 7.64645L19.4603 7.2929V7.2929L19.1067 7.64645ZM19.1067 8.35356L19.4603 8.70711V8.70711L19.1067 8.35356ZM11.3972 14.6489L11.7507 15.0025L11.3972 14.6489ZM17.5461 8.50001L17.8996 8.85356L18.7532 8.00001H17.5461V8.50001ZM17.5461 7.50001V8.00001H18.7532L17.8996 7.14645L17.5461 7.50001ZM11.3972 1.35111L11.7507 0.997559L11.7507 0.997558L11.3972 1.35111ZM12.4578 0.290452C12.0673 -0.100073 11.4342 -0.100073 11.0436 0.290452L11.7507 0.997558H11.7507L12.4578 0.290452ZM19.4603 7.2929L12.4578 0.290452L11.7507 0.997559L18.7532 8.00001L19.4603 7.2929ZM19.4603 8.70711C19.8508 8.31659 19.8508 7.68342 19.4603 7.2929L18.7532 8V8.00001L19.4603 8.70711ZM12.4578 15.7096L19.4603 8.70711L18.7532 8.00001L11.7507 15.0025L12.4578 15.7096ZM11.0436 15.7096C11.4342 16.1001 12.0673 16.1001 12.4578 15.7096L11.7507 15.0025H11.7507L11.0436 15.7096ZM11.0436 14.2953C10.6531 14.6859 10.6531 15.319 11.0436 15.7096L11.7507 15.0025L11.0436 14.2953ZM17.1925 8.14645L11.0436 14.2953L11.7507 15.0025L17.8996 8.85356L17.1925 8.14645ZM1.24707 9.00001H17.5461V8.00001H1.24707V9.00001ZM0.24707 8.00001C0.24707 8.55229 0.694786 9.00001 1.24707 9.00001V8.00001H0.24707ZM1.24707 7.00001C0.694786 7.00001 0.24707 7.44772 0.24707 8.00001H1.24707V7.00001ZM17.5461 7.00001H1.24707V8.00001H17.5461V7.00001ZM11.0436 1.70467L17.1925 7.85356L17.8996 7.14645L11.7507 0.997559L11.0436 1.70467ZM11.0436 0.290451C10.6531 0.680976 10.6531 1.31414 11.0436 1.70467L11.7507 0.997558V0.997559L11.0436 0.290451Z"
                      fill="#121212"
                    />
                  </svg>
                </button>
              </div>
            )}

            <form className={styles.registrationForm} onSubmit={handleSubmit}>
              <div
                className={styles.inputFields}
                style={{
                  pointerEvents: showOverlay ? 'none' : 'auto',
                  opacity: showOverlay ? 0.5 : 1,
                }}
              >
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
