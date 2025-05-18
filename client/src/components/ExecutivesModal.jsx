import { useState, useEffect, useRef } from 'react';
import styles from './ExecutivesModal.module.css';
import { FaTimes, FaTrash } from 'react-icons/fa';

export default function ExecutivesModal({ exec, onClose, action }) {
  const modalRef = useRef(null);
  const [selectedExecutive, setSelectedExecutive] = useState(
    exec || {
      admin_id: '',
      email: '',
    },
  );
  const [errors, setErrors] = useState({});

  const API_BASE_URL =
    'https://tech-club-website.onrender.com/executivesManagement';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedExecutive({ ...selectedExecutive, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    const execErrors = {};
    if (!selectedExecutive.email.trim()) execErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(selectedExecutive.email))
      execErrors.email = 'Email is invalid';

    setErrors(execErrors);
    return Object.keys(execErrors).length === 0;
  };

  const handleSaveChanges = async () => {
    if (!validateForm()) {
      return;
    }

    /*const url = action === 'edit' 
      ? `${API_BASE_URL}/executives/${selectedExecutive.admin_id}` 
      : `${API_BASE_URL}/executives/invite`;
    */
    const url = `${API_BASE_URL}/executives/invite`;
    //const method = action === 'edit' ? 'PUT' : 'POST';
    const method = 'POST';
    /*const requestBody = action === 'edit' 
    ? { newRole: selectedExecutive.role } 
    : selectedExecutive;
    */
    const requestBody = selectedExecutive;
    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save changes');
      }

      const data = await response.json();
      console.log('Response from server:', data);
      onClose(true);
    } catch (error) {
      console.error('Error saving changes:', error);
      setErrors({ general: 'Error adding executive' });
    }
  };

  const handleResetPassword = () => {
    console.log('Reset Password Handler');
  };
  const handleDeleteExec = async () => {
    /*
    if (!confirm('Are you sure you want to delete this executive?')) {
      return;
    }
*/
    try {
      const response = await fetch(
        `${API_BASE_URL}/executives/${selectedExecutive.admin_id}`,
        {
          method: 'DELETE',
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete executive');
      }

      const data = await response.json();
      console.log('Response from server:', data);
      onClose(true);
    } catch (error) {
      console.error('Error deleting executive:', error);
      setErrors({ general: 'Error deleting executive' });
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
    <div className={styles.execContainer}>
      <div className={styles.modal}>
        <div className={styles.modalContent} ref={modalRef}>
          <button className={styles.modalClose} onClick={() => onClose(false)}>
            <FaTimes />
          </button>
          {errors.general && (
            <div className={styles.errorText}>{errors.general}</div>
          )}
          <div className={styles.modalRow}>
            {action !== 'add' && (
              <div className={styles.formGroup}>
                <label>Executive ID</label>
                <input
                  type="text"
                  name="admin_id"
                  value={selectedExecutive.admin_id}
                  placeholder="Executive ID"
                  onChange={handleChange}
                  className={`${styles.inputField} ${errors.name ? styles.inputError : ''}`}
                  disabled
                />
              </div>
            )}
            <div className={styles.formGroup}>
              <label>Email</label>
              <input
                type="text"
                name="email"
                value={selectedExecutive.email}
                placeholder="Executive Email"
                onChange={handleChange}
                className={`${styles.inputField} ${errors.email ? styles.inputError : ''}`}
                disabled={action !== 'add'}
              />
              {errors.email && (
                <span className={styles.errorText}>{errors.email}</span>
              )}
            </div>
          </div>
          {action === 'edit' ? (
            <div className={styles.modalActions}>
              <button
                className={styles.deleteButton}
                onClick={handleDeleteExec}
              >
                Delete Executive <FaTrash />
              </button>
              <button
                className={styles.resetButton}
                onClick={handleResetPassword}
              >
                Reset Password
              </button>
            </div>
          ) : (
            <div className={styles.modalActions}>
              <button className={styles.saveButton} onClick={handleSaveChanges}>
                Invite Executive
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
