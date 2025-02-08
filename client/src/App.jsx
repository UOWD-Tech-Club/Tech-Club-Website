import EventsPage from './pages/EventsPage';
import Homepage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import NewsPage from './pages/NewsPage';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <span className="banner">
        This site is in beta—expect improvements and occasional bugs
      </span>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/events/:eventId" element={<EventsPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/newsletter" element={<NewsPage />} />
      </Routes>
    </>
  );
}

export default App;
