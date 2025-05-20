import { useState, useEffect, useRef } from 'react';
import styles from './ExecutivesModal.module.css';
import { FaTimes, FaTrash } from 'react-icons/fa';
import axios from 'axios';

export default function ExecutivesModal({ exec, onClose, action }) {
  const modalRef = useRef(null);
  const [selectedExecutive, setSelectedExecutive] = useState(
    exec || {
      admin_id: '',
      email: '',
    },
  );
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const API_BASE_URL = 'https://tech-club-website.onrender.com';

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
    if (!validateForm()) return;
    setIsLoading(true);

    setErrors({});
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/invite-admin`,
        { email: selectedExecutive.email },
        { withCredentials: true },
      );

      if (response.data.message === 'Magic link sent') {
        console.log('Magic link sent!');
        onClose(true);
      } else {
        throw new Error('Failed to send magic link');
      }
    } catch (err) {
      console.error('Failed to send magic link:', err);
      setErrors({
        general:
          err.response?.data?.message ||
          'Failed to send magic link. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/invite-admin`,
        { email: selectedExecutive.email },
        { withCredentials: true },
      );

      if (response.data.message === 'Magic link sent') {
        console.log('Reset password link sent!');
        onClose(true);
      } else {
        throw new Error('Failed to send reset link');
      }
    } catch (err) {
      console.error('Failed to send reset link:', err);
      setErrors({
        general:
          err.response?.data?.message ||
          'Failed to send reset link. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteExec = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/executivesManagement/executives/${selectedExecutive.admin_id}`,
        {
          method: 'DELETE',
          credentials: 'include',
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
    } finally {
      setIsLoading(false);
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
                disabled={isLoading}
              >
                {isLoading ? 'Deleting...' : 'Delete Executive'} <FaTrash />
              </button>
              <button
                className={styles.resetButton}
                onClick={handleResetPassword}
                disabled={isLoading}
              >
                {isLoading ? 'Sending Reset Link...' : 'Reset Password'}
              </button>
            </div>
          ) : (
            <div className={styles.modalActions}>
              <button
                className={styles.saveButton}
                onClick={handleSaveChanges}
                disabled={isLoading}
              >
                {isLoading ? 'Sending Invite...' : 'Invite Executive'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
