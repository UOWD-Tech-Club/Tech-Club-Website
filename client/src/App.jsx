import Navbar from './layout/Navbar';
import EventsPage from './pages/Eventspage';
import Homepage from './pages/Homepage';
import ProjectsPage from './pages/ProjectsPage';
import NewsPage from './pages/NewsPage';
import Footer from './layout/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EventsSection from './layout/EventsSection';

function App() {
  return (
    <BrowserRouter>
      <>
        <Navbar />
        <EventsSection />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/newsletter" element={<NewsPage />} />
        </Routes>
        <Footer />
      </>
    </BrowserRouter>
  );
}

export default App;
