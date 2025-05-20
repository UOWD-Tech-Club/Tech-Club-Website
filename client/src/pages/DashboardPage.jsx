// import { useState } from 'react';
import styles from './DashboardPage.module.css';
import Sidebar from '../layout/SideBar';

function DashboardPage() {
  return (
    <div className={styles.dashboardContainer}>
      <Sidebar />
      <main className={styles.mainContent}>
        <h1 className={styles.dashboardTitle}>Dashboard</h1>
        <div className={styles.dashboardContent}>
          {/* Dashboard content will go here */}
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;
