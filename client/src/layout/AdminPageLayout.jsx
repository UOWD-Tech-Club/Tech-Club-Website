import Sidebar from './SideBar';
import styles from './AdminPageLayout.module.css';

export default function AdminLayout({ children }) {
  return (
    <div className={styles.pageContainer}>
      <Sidebar />
      <main className={styles.contentArea}>{children}</main>
    </div>
  );
}
