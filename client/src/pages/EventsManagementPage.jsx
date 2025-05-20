// EventsManagementPage.jsx
import EventsManagement from '../components/EventsManagement.jsx';
import styles from './EventsManagementPage.module.css';
import AdminLayout from '../layout/AdminPageLayout.jsx';

const EventsManagementPage = () => {
  return (
    <AdminLayout>
      <div className={styles.eventsContainer}>
        <EventsManagement />
      </div>
    </AdminLayout>
  );
};

export default EventsManagementPage;
