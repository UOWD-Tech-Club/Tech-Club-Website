import EventsPage from './pages/EventsPage';
import Homepage from './pages/HomePage';
// import NewsPage from './pages/NewsPage';
// import NewsArticle from './pages/NewsArticle';
import { Routes, Route } from 'react-router-dom';
// import AboutPage from './pages/AboutPage';
import PageNotBuilt from './pages/PageNotBuilt';
import PageNotFound from './pages/PageNotFound';

function App() {
  return (
    <>
      <span className="banner">
        This site is in beta—expect improvements and occasional bugs
      </span>
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/events/:eventId" element={<EventsPage />} />
        <Route path="/about" element={<PageNotBuilt />} />
        <Route path="/news" element={<PageNotBuilt />} />
        <Route path="/events" element={<PageNotBuilt />} />
        {/* <Route path="/newsletter" element={<NewsPage />} /> */}
        {/* <Route path="/newsarticle" element={<NewsArticle />} /> */}
      </Routes>
    </>
  );
}

export default App;
