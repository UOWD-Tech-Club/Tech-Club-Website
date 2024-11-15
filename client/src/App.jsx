import Navbar from './layout/Navbar';
import EventsPage from './pages/EventsPage';
import Homepage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import NewsPage from './pages/NewsPage';
import Footer from './layout/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter basename="/Tech-Club-Website">
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/events/:eventId" element={<EventsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/newsletter" element={<NewsPage />} />
        </Routes>
        <Footer />
      </>
    </BrowserRouter>
  );
}

export default App;
