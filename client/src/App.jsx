import EventsPage from './pages/EventsPage';
import Homepage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import NewsPage from './pages/NewsPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter basename="/Tech-Club-Website">
      <>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/events/:eventId" element={<EventsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/newsletter" element={<NewsPage />} />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
