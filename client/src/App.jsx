import Navbar from './layout/Navbar';

import Homepage from './pages/Homepage';
// import Eventspage from './pages/Eventspage';
// import Projectspage from './pages/Projectspage';
// import Newsletterpage from './pages/Newsletterpage';

import Footer from './layout/Footer';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Newsletter from './components/Newsletter';
import EventsSection from './components/EventsSection';

function App() {
  return (
    <BrowserRouter>
      <>
        <Navbar />
        <EventsSection />
        <Newsletter />
        <Routes>
          <Route path="/" element={<Homepage />} />
          {/* <Route path="/events" element={<Eventspage />} /> */}
          {/* <Route path="/projects" element={<Projectspage />} /> */}
          {/* <Route path="/newsletter" element={<Newsletterpage />} /> */}
        </Routes>
        <Footer />
      </>
    </BrowserRouter>
  );
}

export default App;
