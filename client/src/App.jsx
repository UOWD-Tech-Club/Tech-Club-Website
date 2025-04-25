import EventsPage from './pages/EventsPage';
import Homepage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import NewsPage from './pages/NewsPage';
import NewsArticle from './pages/NewsArticle';
import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './utils/ScrollToTop';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <>
      <span className="banner">
        This site is in beta—expect improvements and occasional bugs
      </span>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/events/:eventId" element={<EventsPage />} />
        <Route path="/news/:newsID" element={<NewsArticle />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/newsletter" element={<NewsPage />} />
        <Route path="/newsarticle" element={<NewsArticle />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
