import { useState, useEffect, useRef } from 'react';
import styles from './EventsModal.module.css';
import { FaTimes, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function EventsModal({ event, onClose }) {
  const [image, setImage] = useState(null);
  const modalRef = useRef(null);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    event_id: event.event_id,
    event_title: event.event_title,
    event_location: event.event_location,
    event_date: event.event_date
      ? new Date(event.event_date).toISOString().split('T')[0]
      : '',
    event_time: event.event_time || '',
    event_description: event.event_details || '',
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
        console.log(image);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAttendeesClick = () => {
    navigate(`/eventsmanagement/attendees/${event.event_id}`);
  };

  const handleDeleteEvent = () => {
    // Add delete functionality here
    console.log('Delete event:', event.event_id);
    // After deletion, close modal
    onClose();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  return (
    <div className={styles.modal} ref={modalRef}>
      <button className={styles.modalClose} onClick={onClose}>
        <FaTimes />
      </button>
      <div className={styles.modalContent}>
        <div className={styles.formGroup}>
          <label>Event Name</label>
          <input
            type="text"
            name="event_title"
            value={formData.event_title}
            onChange={handleChange}
            placeholder="Event name"
            className={styles.inputField}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Image URL</label>
          <input
            type="text"
            name="image_url"
            placeholder="Paste image link here..."
            className={styles.inputField}
            onClick={() => fileInputRef.current.click()}
          />
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        <div className={styles.rowContainer}>
          <div className={styles.formGroup}>
            <label>Date</label>
            <input
              type="date"
              name="event_date"
              value={formData.event_date}
              onChange={handleChange}
              className={styles.inputField}
              placeholder="Date"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Time</label>
            <input
              type="time"
              name="event_time"
              value={formData.event_time}
              onChange={handleChange}
              className={styles.inputField}
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>Location</label>
          <input
            type="text"
            name="event_location"
            value={formData.event_location}
            onChange={handleChange}
            placeholder="Location"
            className={styles.inputField}
          />
        </div>

        <div className={styles.formGroup}>
          <div className={styles.attendeesContainer}>
            <button
              className={styles.attendeesButton}
              onClick={handleAttendeesClick}
            >
              Attendees list
            </button>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>Description</label>
          <textarea
            name="event_description"
            value={formData.event_description}
            onChange={handleChange}
            placeholder="Description"
            className={styles.descriptionField}
          />
        </div>

        <div className={styles.formGroup}>
          <div className={styles.deleteContainer}>
            <button className={styles.deleteButton} onClick={handleDeleteEvent}>
              Delete Event <FaTrash />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
