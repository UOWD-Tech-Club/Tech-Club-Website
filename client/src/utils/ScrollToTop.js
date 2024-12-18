import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    console.log('ScrollToTop triggered for:', pathname);
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, [pathname]); // Run this effect when the pathname changes

  return null; // No UI component is rendered
}

export default ScrollToTop;
