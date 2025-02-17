import PageLayout from '../layout/PageLayout';
import styles from './NewsPage.module.css';
import { format } from 'date-fns';
import { useState, useEffect } from 'react';

function NewsPage() {
  const [newsItems, setNewsItems] = useState([]);
  const [filter, setFilter] = useState('dailyNews');
  const [latestNews, setLatestNews] = useState([]); // Initialize as empty array instead of null
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const fetchNews = async () => {
    try {
      setIsLoading(true);
      const apiUrl =
        filter === 'techClubNews'
          ? 'https://tech-club-website.onrender.com/news/techClubNews'
          : 'https://tech-club-website.onrender.com/news/dailynews';

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      const allNews = data.news;

      if (allNews && allNews.length > 0) {
        setLatestNews(allNews.slice(0, 1));
        setNewsItems(allNews.slice(1));
      } else {
        setLatestNews([]);
        setNewsItems([]);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      setLatestNews([]);
      setNewsItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [filter]); // Add filter as dependency

  if (isLoading) {
    return (
      <PageLayout>
        <div className={styles.newsContainer}>
          <div>Loading...</div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className={styles.newsContainer}>
        <div className={styles.newsHeader}>
          <h3>Filter : </h3>
          <div className={styles.filterOptions}>
            <button
              className={styles.filterButton}
              onClick={() => setFilter('techClubNews')}
            >
              Tech Club
            </button>
            <button
              className={styles.filterButton}
              onClick={() => setFilter('dailyNews')}
            >
              Daily News
            </button>
          </div>
        </div>

        <div className={styles.featuredNews}>
          {latestNews.length > 0 &&
            latestNews.map((news) => (
              <div key={news.news_id} className={styles.newsItem}>
                <div className={styles.imageWrapper}>
                  <img
                    src={news.news_img}
                    alt={news.news_title}
                    className={styles.featuredImage}
                  />
                </div>
                <div className={styles.featuredContent}>
                  <span className={styles.tag}>
                    {news.news_category || ' '}
                  </span>
                  <h2 className={styles.featuredTitle}>{news.news_title}</h2>
                  <p className={styles.featuredExcerpt}>
                    {news.news_description}
                  </p>
                  <div className={styles.meta}>
                    <span className={styles.date}>
                      {new Date(news.news_pubdate).toLocaleDateString()}
                    </span>
                    <span className={styles.author}>
                      • by {news.news_source}
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <h1 className={styles.sectionTitle}>Latest News</h1>

        <div className={styles.newsGrid}>
          {newsItems.map((news) => (
            <article key={news.news_id} className={styles.newsCard}>
              <div className={styles.imageWrapper}>
                <img
                  src={news.news_img}
                  alt={news.news_title}
                  className={styles.newsImage}
                />
                <a href={news.news_url} className={styles.readMore}>
                  Read More
                </a>
              </div>
              <div className={styles.newsContent}>
                <span className={styles.tag}>{news.news_category || ' '}</span>
                <h3 className={styles.newsTitle}>{news.news_title}</h3>
                <p className={styles.newsExcerpt}>{news.news_description}</p>
                <div className={styles.meta}>
                  <span className={styles.date}>
                    {format(new Date(news.news_pubdate), 'd MMMM, yyyy')}
                  </span>
                  <span className={styles.author}>• by {news.news_source}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}

export default NewsPage;
