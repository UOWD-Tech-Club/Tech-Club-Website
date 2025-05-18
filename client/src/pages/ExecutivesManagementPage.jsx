import ExecutivesManagement from '../components/ExecutivesManagement.jsx';
import AdminLayout from '../layout/AdminPageLayout.jsx';
import styles from './ExecutivesManagementPage.module.css';

const ExecutivesManagementPage = () => {
  return (
    <AdminLayout>
      <div className={styles.newsContainer}>
        <ExecutivesManagement />
      </div>
    </AdminLayout>
  );
};
export default ExecutivesManagementPage;
