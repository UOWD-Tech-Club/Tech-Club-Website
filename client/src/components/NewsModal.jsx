import { useState, useEffect, useRef } from 'react';
import styles from './NewsModal.module.css';
import { FaTimes, FaTrash, FaEdit } from 'react-icons/fa';

function formatDateYYYYMMDD(date) {
  if (!date) return '';
  const d = new Date(date);
  if (isNaN(d)) return '';
  return d.toISOString().slice(0, 10);
}

export default function NewsModal({ news, onClose, action, isTechClubNews }) {
  const modalRef = useRef(null);
  const fileInputRef = useRef(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [selectedNews, setSelectedNews] = useState(
    news
      ? {
          ...news,
          news_pubdate: formatDateYYYYMMDD(news.news_pubdate),
        }
      : {
          news_id: '',
          news_title: '',
          news_img: '',
          news_pubdate: formatDateYYYYMMDD(new Date()),
          news_source: '',
          news_description: '',
          news_url: '',
          news_category: '',
        },
  );

  const [errors, setErrors] = useState({});
  const [previewImage, setPreviewImage] = useState(news?.news_img || '');
  const [targetTable, setTargetTable] = useState(
    news?.target_table
      ? news.target_table
      : news?.news_category !== undefined
        ? 'techclubnews'
        : 'dailynews',
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedNews((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setPreviewImage(imageURL);
      setSelectedNews((prev) => ({ ...prev, news_img: imageURL }));
    }
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
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
    if (!selectedNews.news_img.trim()) newErrors.news_img = 'Image is required';
    else if (!isValidUrl(selectedNews.news_img))
      newErrors.news_img = 'Invalid image URL';
    if (!selectedNews.news_url.trim())
      newErrors.news_url = 'News URL is required';
    else if (!isValidUrl(selectedNews.news_url))
      newErrors.news_url = 'Invalid news URL';
    if (isTechClubNews && !selectedNews.news_category.trim())
      newErrors.news_category = 'Category is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveChanges = async () => {
    if (!validateForm()) return;
    setIsSaving(true);

    const formData = new FormData();

    formData.append('newsSource', selectedNews.news_source);
    formData.append('newsTitle', selectedNews.news_title);
    formData.append('newsDescription', selectedNews.news_description);
    formData.append('newsUrl', selectedNews.news_url);
    formData.append('newsPubdate', selectedNews.news_pubdate);
    formData.append('targetTable', targetTable);

    if (isTechClubNews) {
      formData.append('newsCategory', selectedNews.news_category);
    }

    const file = fileInputRef.current.files[0];
    if (file) {
      formData.append('newsImage', file);
    }

    const url =
      action === 'edit'
        ? `/newsManagement/admin/news/${selectedNews.news_id}`
        : '/newsManagement/admin/news';
    const method = action === 'edit' ? 'PUT' : 'POST';

    try {
      const response = await fetch(`http://localhost:5000${url}`, {
        method,
        body: formData,
      });

      const data = await response.json();
      console.log('Server response:', data);
      onClose(true);
    } catch (error) {
      console.error('Error saving news:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteNews = async () => {
    if (!confirm('Are you sure you want to delete this news item?')) return;
    setIsDeleting(true);

    try {
      const response = await fetch(
        `http://localhost:5000/newsManagement/admin/news/${selectedNews.news_id}`,
        {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ targetTable }),
        },
      );

      if (response.status !== 204) {
        const data = await response.json();
        console.log('Server response:', data);
      }
      onClose(true);
    } catch (error) {
      console.error('Error deleting news:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose(false);
      }
    };
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
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
              onChange={handleChange}
              className={`${styles.inputField} ${errors.news_title ? styles.inputError : ''}`}
            />
            {errors.news_title && (
              <span className={styles.errorText}>{errors.news_title}</span>
            )}
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
              {previewImage && (
                <div className={styles.imagePreview}>
                  <img
                    src={previewImage}
                    alt="Preview"
                    className={styles.previewImage}
                  />
                </div>
              )}
            </div>
            {errors.news_img && (
              <span className={styles.errorText}>{errors.news_img}</span>
            )}
          </div>

          <div className={styles.modalRow}>
            <div className={styles.formGroup}>
              <label>Date</label>
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
              onChange={handleChange}
              className={`${styles.textAreaField} ${errors.news_description ? styles.inputError : ''}`}
            />
            {errors.news_description && (
              <span className={styles.errorText}>
                {errors.news_description}
              </span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label>News URL</label>
            <input
              type="text"
              name="news_url"
              value={selectedNews.news_url}
              onChange={handleChange}
              className={`${styles.inputField} ${errors.news_url ? styles.inputError : ''}`}
            />
            {errors.news_url && (
              <span className={styles.errorText}>{errors.news_url}</span>
            )}
          </div>

          {isTechClubNews && (
            <div className={styles.formGroup}>
              <label>Category</label>
              <input
                type="text"
                name="news_category"
                value={selectedNews.news_category}
                onChange={handleChange}
                className={`${styles.inputField} ${errors.news_category ? styles.inputError : ''}`}
              />
              {errors.news_category && (
                <span className={styles.errorText}>{errors.news_category}</span>
              )}
            </div>
          )}

          <div className={styles.formGroup}>
            <label>Target Table</label>
            <select
              value={targetTable}
              onChange={(e) => setTargetTable(e.target.value)}
              className={styles.selectField}
            >
              <option value="techclubnews">Tech Club News</option>
              <option value="dailynews">Daily News</option>
            </select>
          </div>

          <div className={styles.modalActions}>
            {action === 'edit' && (
              <button
                className={styles.deleteButton}
                onClick={handleDeleteNews}
                disabled={isDeleting || isSaving}
              >
                {isDeleting ? 'Deleting...' : 'Delete News'} <FaTrash />
              </button>
            )}
            <button
              className={
                action === 'edit' ? styles.editButton : styles.saveButton
              }
              onClick={handleSaveChanges}
              disabled={isDeleting || isSaving}
            >
              {action === 'edit' ? (
                <>
                  {isSaving ? 'Saving...' : 'Save News'} <FaEdit />
                </>
              ) : isSaving ? (
                'Creating...'
              ) : (
                'Create News'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
