import EventsPage from './pages/EventsPage';
import Homepage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import NewsPage from './pages/NewsPage';
import NewsArticle from './pages/NewsArticle';
import { Routes, Route } from 'react-router-dom';
import EventsManagementPage from './pages/EventsManagementPage';
import Attendees from './pages/AttendeesList';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <>
      <span className="banner">
        This site is in beta—expect improvements and occasional bugs
      </span>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/eventsmanagement/attendees" element={<Attendees />} />
        <Route path="/eventsmanagement" element={<EventsManagementPage />} />
        <Route path="/events/:eventId" element={<EventsPage />} />
        <Route path="/news/:newsID" element={<NewsArticle />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/newsletter" element={<NewsPage />} />
        <Route path="/newsarticle" element={<NewsArticle />} />
      </Routes>
    </>
  );
}

export default App;
