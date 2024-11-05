import { useState } from 'react';
import styles from './EventsPage.module.css';
import eventimg from '../assets/events_img.png';

function EventsPage() {
  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({ name: '', studentId: '', email: '' });

  const nameRegex = /^[A-Za-z\s]{3,50}$/;
  const studentIdRegex = /^\d{7}$/;
  const emailRegex = /^[^\s@]+@uowmail\.edu\.au$/;

  const validateForm = () => {
    const newErrors = {};
    if (!nameRegex.test(name)) {
      newErrors.name = 'Valid name required';
    }
    if (!studentIdRegex.test(studentId)) {
      newErrors.studentId = '7 digit university ID';
    }
    if (!emailRegex.test(email)) {
      newErrors.email = 'University email format required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert('Form submitted successfully!');
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
        <h1>Event Name</h1>
        <h2>October 31 - Room 2.22</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa
          mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla,
          mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis
          tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non
          suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at
          maximus ante fermentum sit amet. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Ut et massa mi...
        </p>

        <h3>Interested? Register Now</h3>
        <form className={styles.registrationForm} onSubmit={handleSubmit}>
          <label className={styles.username}>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <span className={styles.error}>{errors.name}</span>}
          </label>

          <label className={styles.userid}>
            <input
              type="text"
              placeholder="Student ID"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
            />
            {errors.studentId && (
              <span className={styles.error}>{errors.studentId}</span>
            )}
          </label>

          <label className={styles.useremail}>
            <input
              type="email"
              placeholder="University Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
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
