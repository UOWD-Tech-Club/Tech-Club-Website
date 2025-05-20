import { useState, useEffect, useRef } from 'react';
import styles from './EventsModal.module.css';
import { FaTimes, FaTrash, FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const EventsModal = ({ event, onClose, action }) => {
  const modalRef = useRef(null);
  const fileInputRef = useRef(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    event_id: event?.event_id || '',
    event_title: event?.event_title || '',
    event_location: event?.event_location || '',
    event_date: event?.event_date
      ? new Date(event.event_date).toISOString().split('T')[0]
      : '',
    event_time: event?.event_time || '',
    event_description: event?.event_details || '',
    event_img: event?.event_img_link || '',
    preview_url: event?.event_img_link || '',
  });

  const navigate = useNavigate();

  const handleOpenGoogleSheet = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/eventManagement/admin/google-sheet/${event.event_id}`,
      );
      const data = await response.json();
      console.log(data.sheetUrl);
      if (data.sheetUrl) {
        window.open(data.sheetUrl, '_blank');
      } else {
        alert('No Google Sheet found for this event.');
      }
    } catch (error) {
      console.error('Error fetching Google Sheet:', error);
      alert('Failed to fetch Google Sheet.');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        event_img: file, // store file for backend
        preview_url: URL.createObjectURL(file), // for preview only
      });
    }
  };

  const handleAttendeesClick = () => {
    if (event?.event_id) {
      navigate(`/eventsmanagement/attendees/${event.event_id}`);
    }
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    try {
      const url =
        action === 'edit'
          ? `http://localhost:5000/eventManagement/admin/events/${event.event_id}`
          : 'http://localhost:5000/eventManagement/admin/events';

      const method = action === 'edit' ? 'PUT' : 'POST';

      const payload = new FormData();
      payload.append('event_title', formData.event_title);
      payload.append('event_location', formData.event_location);
      payload.append('event_date', formData.event_date);
      payload.append('event_time', formData.event_time);
      payload.append('event_details', formData.event_description);
      payload.append('event_img', formData.event_img); // image file

      const response = await fetch(url, {
        method,
        body: payload,
      });

      const data = await response.json();
      console.log('Response from server:', data);
      onClose(true);
    } catch (error) {
      console.error('Error saving event:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteEvent = async () => {
    if (!confirm('Are you sure you want to delete this event?')) {
      return;
    }
    setIsDeleting(true);

    try {
      const response = await fetch(
        `http://localhost:5000/eventManagement/admin/events/${event.event_id}`,
        {
          method: 'DELETE',
        },
      );

      const data = await response.json();
      console.log('Response from server:', data);
      onClose(true);
    } catch (error) {
      console.error('Error deleting event:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose(false);
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
      <button className={styles.modalClose} onClick={() => onClose(false)}>
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
          <label>Image Upload</label>
          <div className={styles.imageUploadContainer}>
            <button
              onClick={() => fileInputRef.current.click()}
              className={styles.uploadButton}
            >
              Choose Image
            </button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              accept="image/*"
              onChange={handleImageChange}
            />
            {formData.preview_url && (
              <div className={styles.imagePreview}>
                <img
                  src={formData.preview_url}
                  alt="Preview"
                  className={styles.previewImage}
                />
              </div>
            )}
          </div>
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

        {action === 'edit' && (
          <div className={styles.formGroup}>
            <div className={styles.attendeesContainer}>
              <button
                className={styles.attendeesButton}
                onClick={handleAttendeesClick}
              >
                Attendees list
              </button>
              <button
                className={styles.attendeesButton}
                onClick={handleOpenGoogleSheet}
                disabled={!event?.event_id}
              >
                Google Sheet
              </button>
            </div>
          </div>
        )}

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
          <div className={styles.buttonContainer}>
            {action === 'edit' ? (
              <>
                <button
                  className={styles.deleteButton}
                  onClick={handleDeleteEvent}
                  disabled={isDeleting || isSaving}
                >
                  {isDeleting ? 'Deleting...' : 'Delete Event'} <FaTrash />
                </button>
                <button
                  className={styles.saveButton}
                  onClick={handleSaveChanges}
                  disabled={isDeleting || isSaving}
                >
                  {isSaving ? 'Saving...' : 'Save Changes'} <FaEdit />
                </button>
              </>
            ) : (
              <button
                className={styles.saveButton}
                onClick={handleSaveChanges}
                disabled={isSaving}
              >
                {isSaving ? 'Creating...' : 'Create Event'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsModal;
