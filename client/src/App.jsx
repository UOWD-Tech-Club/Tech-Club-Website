import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import EventsManagementPage from './pages/EventsManagementPage';
import NewsPage from './pages/NewsPage';
// import ExecutivesPage from './pages/ExecutivesPage';
import HomePage from './pages/HomePage';
import './index.css';
import EventsPage from './pages/EventsPage';
import ProjectsPage from './pages/ProjectsPage';
import AboutUsPage from './pages/AboutUsPage';
import AllExecutives from './pages/AllExecutives';
import Attendees from './pages/AttendeesList';
import ScrollToTop from './utils/ScrollToTop';
import AllEventsPage from './pages/AllEventsPage';
import NewsManagementPage from './pages/NewsManagementPage';
import AdminMagicLogin from './pages/AdminLoginPage';
import ExecutivesManagementPage from './pages/ExecutivesManagementPage';

function App() {
  return (
    <AuthProvider>
      <span className="banner">
        This site is in beta—expect improvements and occasional bugs
      </span>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="news" element={<NewsPage />} />
        <Route path="events" element={<AllEventsPage />} />
        {/* <Route path="/executives" element={<ExecutivesPage />} /> */}
        <Route path="events/:eventId" element={<EventsPage />} />
        <Route path="news/:newsID" element={<NewsPage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="newsletter/" element={<NewsPage />} />
        <Route path="/aboutus" element={<AboutUsPage />} />
        <Route path="all-executives" element={<AllExecutives />} />
        <Route path="/newsmanagement" element={<NewsManagementPage />} />
        <Route path="/magic-login" element={<AdminMagicLogin />} />
        <Route
          path="/executivesmanagement"
          element={
            <ProtectedRoute>
              <ExecutivesManagementPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/executivesmanagement"
          element={<ExecutivesManagementPage />}
        />
        {/* Protected Routes */}
        <Route
          path="dashboard/*"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="eventsmanagement/*"
          element={
            <ProtectedRoute>
              <EventsManagementPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="eventsmanagement/attendees/:eventId"
          element={
            <ProtectedRoute>
              <Attendees />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
