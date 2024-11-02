// import styles from './Homepage.module.css';
import EventsSection from '../components/EventsSection';
import NewsSection from '../components/NewsSection';
import HeroSection from '../components/HeroSection';

function Homepage() {
  return (
    <div>
      <HeroSection />
      <EventsSection />
      <NewsSection />
    </div>
  );
}

export default Homepage;
