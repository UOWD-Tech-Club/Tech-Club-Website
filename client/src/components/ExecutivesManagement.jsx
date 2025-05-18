import { useState, useEffect } from 'react';
import styles from './ExecutivesManagement.module.css';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import ExecutivesModal from './ExecutivesModal.jsx';

const ExecutivesManagement = () => {
  const [executivesList, setExecutivesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedExecutive, setSelectedExecutive] = useState(null);
  const [modalAction, setModalAction] = useState('edit');

  const API_BASE_URL =
    'https://tech-club-website.onrender.com/executivesManagement';

  const fetchExecutives = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/executives`);

      if (!response.ok) {
        throw new Error('Failed to fetch executives.');
      }

      const data = await response.json();
      setExecutivesList(data.executives || []); // Account for the structure returned by the API
      setError(null);
    } catch (error) {
      console.error('Error fetching executives:', error);
      setError('Failed to load executives. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExecutives();
  }, []);

  const handleModalClose = (dataChanged = false) => {
    setShowModal(false);
    setSelectedExecutive(null);
    if (dataChanged) {
      fetchExecutives();
    }
  };

  const handleAddExec = () => {
    setSelectedExecutive(null);
    setModalAction('add');
    setShowModal(true);
  };

  const handleEditExec = (exec) => {
    setSelectedExecutive(exec);
    setModalAction('edit');
    setShowModal(true);
  };

  const ExecutivesSkeletonLoader = () => (
    <SkeletonTheme baseColor="#434343" highlightColor="#686868">
      {[...Array(5)].map((_, index) => (
        <div className={styles.tableRow} key={index}>
          <div className={styles.adminID}>
            <Skeleton height={20} width="90%" />
          </div>
          <div className={styles.adminEmail}>
            <Skeleton height={20} width="100%" />
          </div>
        </div>
      ))}
    </SkeletonTheme>
  );

  return (
    <div className={styles.execContainer}>
      <div className={styles.header}>
        <h1>Executives</h1>
        <button className={styles.createButton} onClick={handleAddExec}>
          Invite Executive
        </button>
      </div>

      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <div className={styles.adminID}>ID</div>
          <div className={styles.adminEmail}>Email</div>
        </div>
        <div className={styles.tableContent}>
          {loading ? (
            <ExecutivesSkeletonLoader />
          ) : error ? (
            <div className={styles.error}>{error}</div>
          ) : executivesList.length > 0 ? (
            executivesList.map((exec) => (
              <div
                className={styles.tableRow}
                key={exec.admin_id}
                onClick={() => handleEditExec(exec)}
              >
                <div className={styles.adminID}>{exec.admin_id}</div>
                <div className={styles.adminEmail}>{exec.email}</div>
              </div>
            ))
          ) : (
            <div className={styles.noExec}>No Executives exist</div>
          )}
        </div>
      </div>
      {showModal && (
        <ExecutivesModal
          exec={selectedExecutive}
          onClose={handleModalClose}
          action={modalAction}
        />
      )}
    </div>
  );
};

export default ExecutivesManagement;
