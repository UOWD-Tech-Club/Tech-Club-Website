import { useState } from 'react';
import styles from './EventsPage.module.css';
import eventimg from '../assets/events_img.png';
import { useLocation } from 'react-router-dom';

function EventsPage() {
  const [name, setName] = useState('');
  const [user_studentId, setUser_studentId] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    user_studentId: '',
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
    if (!studentIdRegex.test(user_studentId)) {
      newErrors.user_studentId = '7 digit university ID';
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch(
          'https://tech-club-website.onrender.com/events/register',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user_studentId,
              event_id: event.event_id, // Use the correct syntax here
            }),
          },
        );
        if (response.ok) {
          alert('Form submitted successfully!');
        } else {
          alert('Failed to submit form. Please try again.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
      }
    } else {
      alert('Please fix the errors in the form.');
    }
  };

  return (
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
        <form className={styles.registrationForm} onSubmit={handleSubmit}>
          <label className={`${styles.customField} ${styles.one}`}>
            <input
              type="text"
              className={`${styles.customFieldInput} ${styles.oneCustomFieldInput}`}
              placeholder=" "
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <span className={`${styles.placeholder} ${styles.onePlaceholder}`}>
              Your Name
            </span>
            {errors.name && <span className={styles.error}>{errors.name}</span>}
          </label>

          <label className={`${styles.customField} ${styles.one}`}>
            <input
              type="text"
              className={`${styles.customFieldInput} ${styles.oneCustomFieldInput}`}
              placeholder=" "
              value={user_studentId}
              onChange={(e) => setUser_studentId(e.target.value)}
            />
            <span className={`${styles.placeholder} ${styles.onePlaceholder}`}>
              Student ID
            </span>
            {errors.user_studentId && (
              <span className={styles.error}>{errors.user_studentId}</span>
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
            <span className={`${styles.placeholder} ${styles.onePlaceholder}`}>
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
  );
}

export default EventsPage;
