// import styles from './Homepage.module.css';
import Navbar from '../layout/Navbar';
import EventsSection from '../components/EventsSection';
import NewsSection from '../components/NewsSection';
import Footer from '../layout/Footer';
import AnimatedNavbar from '../layout/AnimatedNavbar';

function Homepage() {
  return (
    <AnimatedNavbar
      navbar={<Navbar />}
      footer={<Footer />}
      img={'src/img/bgWithText.png'}
    >
      <EventsSection />
      <NewsSection />
    </AnimatedNavbar>
  );
}

export default Homepage;
