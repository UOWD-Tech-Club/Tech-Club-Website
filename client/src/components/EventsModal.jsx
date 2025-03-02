import { useState, useEffect, useRef } from 'react';
import styles from './EventsModal.module.css';
import { format } from 'date-fns';
import { FaUpload } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function EventsModal({ event, onClose }) {
  const [image, setImage] = useState(null);
  const modalRef = useRef(null);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    event_id: event.event_id,
    event_title: event.event_title,
    event_location: event.event_location,
    event_date: format(new Date(event.event_date), 'dd/MM/yyyy'),
    event_time: String(event.event_time).split(':').slice(0, 2).join(':'),
    event_description: event.event_details,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAttendeesClick = () => {
    navigate('/eventsmanagement/attendees', { state: { event: event } });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className={styles.modal} ref={modalRef}>
      <div className={styles.modalClose} onClick={onClose}>
        X
      </div>
      <div className={styles.modalContent}>
        <div className={styles.imageWrapper}>
          <div
            className={styles.imageContainer}
            onClick={() => fileInputRef.current.click()}
          >
            {image ? <img src={image} className={styles.eventImage} /> : null}
          </div>
          <FaUpload
            className={styles.uploadIcon}
            onClick={() => fileInputRef.current.click()}
          />
          <input
            type="file"
            id="imageUpload"
            ref={fileInputRef}
            style={{ display: 'none' }}
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <div className={styles.editForm}>
          <input
            type="text"
            name="event_title"
            value={formData.event_title}
            onChange={handleChange}
            placeholder="Event Title"
            className={styles.eventTitle}
          />
          <div>
            <input
              type="text"
              name="event_date"
              value={formData.event_date}
              onChange={handleChange}
              placeholder="Event Date"
              className={styles.eventDate}
            />
            <input
              type="text"
              name="event_time"
              value={formData.event_time}
              onChange={handleChange}
              placeholder="Event Time"
              className={styles.eventTime}
            />
          </div>
          <div>
            <input
              type="text"
              name="event_location"
              value={formData.event_location}
              onChange={handleChange}
              placeholder="Event Location"
              className={styles.eventLocation}
            />
            <button
              className={styles.attendeesButton}
              onClick={handleAttendeesClick}
            >
              Attendees List
            </button>
          </div>
          <textarea
            name="event_description"
            value={formData.event_description}
            onChange={handleChange}
            placeholder="Event Description"
            className={styles.eventDescription}
          />
        </div>
      </div>
    </div>
  );
}
