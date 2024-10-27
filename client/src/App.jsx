import Navbar from './layout/Navbar';

import Homepage from './pages/Homepage';
import EventsPage from './pages/EventsPage';
import ProjectsPage from './pages/ProjectsPage';
import NewsPage from './pages/NewsPage';
import Footer from './layout/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <>
        <Navbar />

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
