import NewsManagement from '../components/NewsManagement.jsx';
import AdminLayout from '../layout/AdminPageLayout.jsx';
import styles from './NewsManagementPage.module.css';

const NewsManagementPage = () => {
  return (
    <AdminLayout>
      <div className={styles.newsContainer}>
        <NewsManagement />
      </div>
    </AdminLayout>
  );
};
export default NewsManagementPage;
