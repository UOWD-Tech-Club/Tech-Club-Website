import { useState } from 'react';
import styles from './EventsPage.module.css';
import eventimg from '../assets/events_img.png';
import { useLocation } from 'react-router-dom';
import PageLayout from '../layout/PageLayout';

function EventsPage() {
  const [name, setName] = useState('');
  const [user_studentid, setUser_studentId] = useState('');
  const [email, setEmail] = useState('');
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

  const nameRegex = /^[A-Za-z\s]{3,50}$/;
  const studentIdRegex = /^\d{7}$/;
  const emailRegex = /^[^\s@]+@uowmail\.edu\.au$/;

  const validateForm = () => {
    const newErrors = {};
    if (!nameRegex.test(name)) {
      newErrors.name = 'Valid name required';
    }
    if (!studentIdRegex.test(user_studentid)) {
      newErrors.user_studentid = '7 digit university ID';
    }
    if (!emailRegex.test(email)) {
      newErrors.email = 'University email format required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formattedDate = new Date(event.event_date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleSubmit1 = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert('Please Enter the Details as per the format.');
      return;
    }
    try {
      //This is the approach for the submission
      //check if the user is a user in the db
      //if not, then add him.
      //if he is a user, check if he is in the registered users list
      //if he is, return already registered
      //if he is not then register him

      const fetchUserDetails = await fetch(
        `https://tech-club-website.onrender.com/events/user/${user_studentid}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const userExists = await fetchUserDetails.json();
      if (!userExists.exists) {
        const addUserResponse = await fetch(
          'https://tech-club-website.onrender.com/events/user',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user: {
                studentId: user_studentid,
                name: name,
                studentEmail: email,
              },
            }),
          },
        );
        const responseData = await addUserResponse.json();
        if (!addUserResponse.ok) {
          throw new Error(responseData.message || 'Failed to add user');
        }
      }

      //check for registered users.

      const registeredUsers = await fetch(
        `https://tech-club-website.onrender.com/events/users/${event.event_id}`,
      );

      const regUsers = await registeredUsers.json();
      const registeredUser = regUsers.users.find(
        (user) => Number(user.user_studentid) === Number(user_studentid),
      );

      if (registeredUser) {
        console.log('You have already registered for this event');
        alert('You have already registered for the event');
      } else {
        const registerResponse = await fetch(
          'https://tech-club-website.onrender.com/events/register',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user_studentid: user_studentid,
              event_id: event.event_id,
            }),
          },
        );

        if (registerResponse.ok) {
          alert('Registration successful!');
        } else {
          alert('Failed to register for event.');
        }
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <PageLayout>
      <div className={styles.eventContainer}>
        <div className={styles.eventImage}>
          <img src={eventimg} alt="Event" />
        </div>
        <div className={styles.eventDetails}>
          <h1>{event.event_title}</h1>
          <h2>
            {formattedDate},{event.event_time} - {event.event_location}
          </h2>
          <p>{event.event_details}</p>

          <h3>Interested? Register Now</h3>
          <form className={styles.registrationForm} onSubmit={handleSubmit1}>
            <label className={`${styles.customField} ${styles.one}`}>
              <input
                type="text"
                className={`${styles.customFieldInput} ${styles.oneCustomFieldInput}`}
                placeholder=" "
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <span
                className={`${styles.placeholder} ${styles.onePlaceholder}`}
              >
                Your Name
              </span>
              {errors.name && (
                <span className={styles.error}>{errors.name}</span>
              )}
            </label>

            <label className={`${styles.customField} ${styles.one}`}>
              <input
                type="text"
                className={`${styles.customFieldInput} ${styles.oneCustomFieldInput}`}
                value={user_studentid}
                placeholder=""
                onChange={(e) => setUser_studentId(e.target.value)}
              />
              <span
                className={`${styles.placeholder} ${styles.onePlaceholder}`}
              >
                Student ID
              </span>
              {errors.user_studentid && (
                <span className={styles.error}>{errors.user_studentid}</span>
              )}
            </label>

            <label className={`${styles.customField} ${styles.one}`}>
              <input
                type="email"
                className={`${styles.customFieldInput} ${styles.oneCustomFieldInput}`}
                placeholder=" "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span
                className={`${styles.placeholder} ${styles.onePlaceholder}`}
              >
                University Email
              </span>
              {errors.email && (
                <span className={styles.error}>{errors.email}</span>
              )}
            </label>

            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </PageLayout>
  );
}

export default EventsPage;
