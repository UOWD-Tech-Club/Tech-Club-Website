import { useState, useEffect, useRef } from 'react';
import styles from './NewsModal.module.css';
import { FaTimes, FaTrash, FaEdit } from 'react-icons/fa';

export default function NewsModal({ news, onClose, action }) {
  const modalRef = useRef(null);
  const [selectedNews, setSelectedNews] = useState(
    news || {
      news_id: '',
      news_title: '',
      news_img: '',
      news_pubdate: new Date().toISOString().slice(0, 10),
      news_source: '',
      news_description: '',
      news_article: '',
    },
  );
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedNews({ ...selectedNews, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!selectedNews.news_title.trim())
      newErrors.news_title = 'Title is required';
    if (!selectedNews.news_source.trim())
      newErrors.news_source = 'Author is required';
    if (!selectedNews.news_pubdate) newErrors.news_pubdate = 'Date is required';
    if (!selectedNews.news_description.trim())
      newErrors.news_description = 'Description is required';
    if (!selectedNews.news_img.trim())
      newErrors.news_img = 'Image URL is required';
    else if (!isValidUrl(selectedNews.news_img))
      newErrors.news_img = 'Please enter a valid URL';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const handleSaveChanges = async () => {
    if (!validateForm()) {
      return;
    }

    const backendJSON = {
      newsID: selectedNews.news_id,
      newsTitle: selectedNews.news_title,
      author: selectedNews.news_source,
      dateTime: selectedNews.news_pubdate,
      imageUrl: selectedNews.news_img,
      description: selectedNews.news_description,
      articleBody: '',
    };

    const url =
      action === 'edit' ? `/admin/news/${selectedNews.news_id}` : '/admin/news';
    const method = action === 'edit' ? 'PUT' : 'POST';

    try {
      const response = await fetch(
        `https://tech-club-website.onrender.com${url}`,
        {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(backendJSON),
        },
      );

      const data = await response.json();
      console.log('Response from server:', data);
      onClose(true);
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  const handleDeleteNews = async () => {
    if (!confirm('Are you sure you want to delete this news item?')) {
      return;
    }

    try {
      const response = await fetch(
        `https://tech-club-website.onrender.com/admin/news/${selectedNews.news_id}`,
        {
          method: 'DELETE',
        },
      );

      const data = await response.json();
      console.log('Response from server:', data);
      onClose(true);
    } catch (error) {
      console.error('Error deleting news:', error);
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
    <div className={styles.newsContainer}>
      <div className={styles.modal}>
        <div className={styles.modalContent} ref={modalRef}>
          <button className={styles.modalClose} onClick={() => onClose(false)}>
            <FaTimes />
          </button>
          <div className={styles.formGroup}>
            <label>News Title</label>
            <input
              type="text"
              name="news_title"
              value={selectedNews.news_title}
              placeholder="News Title"
              onChange={handleChange}
              className={`${styles.inputField} ${errors.news_title ? styles.inputError : ''}`}
            />
            {errors.news_title && (
              <span className={styles.errorText}>{errors.news_title}</span>
            )}
          </div>
          <div className={styles.formGroup}>
            <label>Image URL</label>
            <input
              type="text"
              name="news_img"
              value={selectedNews.news_img}
              placeholder="Paste image link here..."
              onChange={handleChange}
              className={`${styles.inputField} ${errors.news_img ? styles.inputError : ''}`}
            />
            {errors.news_img && (
              <span className={styles.errorText}>{errors.news_img}</span>
            )}
          </div>
          <div className={styles.modalRow}>
            <div className={styles.formGroup}>
              <label>News Date</label>
              <input
                type="date"
                name="news_pubdate"
                value={selectedNews.news_pubdate}
                onChange={handleChange}
                className={`${styles.inputField} ${errors.news_pubdate ? styles.inputError : ''}`}
              />
              {errors.news_pubdate && (
                <span className={styles.errorText}>{errors.news_pubdate}</span>
              )}
            </div>
            <div className={styles.formGroup}>
              <label>Author</label>
              <input
                type="text"
                name="news_source"
                value={selectedNews.news_source}
                placeholder="Author Name"
                onChange={handleChange}
                className={`${styles.inputField} ${errors.news_source ? styles.inputError : ''}`}
              />
              {errors.news_source && (
                <span className={styles.errorText}>{errors.news_source}</span>
              )}
            </div>
          </div>
          <div className={styles.formGroup}>
            <label>Description</label>
            <textarea
              name="news_description"
              value={selectedNews.news_description}
              placeholder="Short Description"
              onChange={handleChange}
              className={`${styles.textAreaField} ${errors.news_description ? styles.inputError : ''}`}
            ></textarea>
            {errors.news_description && (
              <span className={styles.errorText}>
                {errors.news_description}
              </span>
            )}
          </div>

          {action === 'edit' ? (
            <div className={styles.modalActions}>
              <button
                className={styles.deleteButton}
                onClick={handleDeleteNews}
              >
                Delete News <FaTrash />
              </button>
              <button className={styles.editButton} onClick={handleSaveChanges}>
                Save News <FaEdit />
              </button>
            </div>
          ) : (
            <div className={styles.modalActions}>
              <button className={styles.saveButton} onClick={handleSaveChanges}>
                Create News
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
