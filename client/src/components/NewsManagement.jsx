import { useState, useEffect } from 'react';
import styles from './NewsManagement.module.css';
import NewsModal from './NewsModal.jsx';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { format } from 'date-fns';

const NewsManagement = () => {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [modalAction, setModalAction] = useState('edit');

  const fetchNews = async () => {
    setLoading(true);
    try {
      const parseJSONSafely = async (res, label) => {
        const text = await res.text();
        try {
          return JSON.parse(text);
        } catch {
          throw new Error(
            `${label} returned invalid JSON or HTML: ${text.slice(0, 100)}`,
          );
        }
      };

      const [techClubNewsRes, dailyNewsRes] = await Promise.all([
        fetch('https://tech-club-website.onrender.com/news/techClubNews'),
        fetch('https://tech-club-website.onrender.com/news/dailynews'),
      ]);

      let techClubNews = [];
      let dailyNews = [];

      if (techClubNewsRes.ok) {
        const parsed = await parseJSONSafely(techClubNewsRes, 'Tech Club News');
        techClubNews = (parsed.news || []).map((n) => ({
          ...n,
          target_table: 'techclubnews',
        }));
      } else if (techClubNewsRes.status === 404) {
        console.warn('Tech Club News: No articles found.');
      }

      if (dailyNewsRes.ok) {
        const parsed = await parseJSONSafely(dailyNewsRes, 'Daily News');
        dailyNews = (parsed.news || []).map((n) => ({
          ...n,
          target_table: 'dailynews',
        }));
      } else if (dailyNewsRes.status === 404) {
        console.warn('Daily News: No articles found.');
      }

      const combinedNews = [...techClubNews, ...dailyNews];

      if (combinedNews.length === 0) {
        throw new Error('No news available at the moment.');
      }

      setNewsList(combinedNews);
      setError(null);
    } catch (error) {
      console.error('News Fetching Error:', error.message);
      setError(error.message || 'Failed to fetch news.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleModalClose = (dataChanged = false) => {
    setShowModal(false);
    setSelectedNews(null);
    if (dataChanged) {
      fetchNews();
    }
  };

  const handleAddNews = () => {
    setSelectedNews(null);
    setModalAction('add');
    setShowModal(true);
  };

  const handleEditNews = (news) => {
    setSelectedNews(news);
    setModalAction('edit');
    setShowModal(true);
  };

  const NewsSkeletonLoader = () => (
    <SkeletonTheme baseColor="#434343" highlightColor="#686868">
      {[...Array(5)].map((_, index) => (
        <div className={styles.tableRow} key={index}>
          <div className={styles.newsTitle}>
            <Skeleton height={20} width="90%" />
          </div>
          <div className={styles.newsAuthor}>
            <Skeleton height={20} width="80%" />
          </div>
          <div className={styles.newsDate}>
            <Skeleton height={20} width="70%" />
          </div>
          <div className={styles.newsDescription}>
            <Skeleton height={20} width="90%" />
          </div>
        </div>
      ))}
    </SkeletonTheme>
  );

  return (
    <div className={styles.newsContainer}>
      <div className={styles.header}>
        <h1>Tech News</h1>
        <button className={styles.createButton} onClick={handleAddNews}>
          Create News
        </button>
      </div>

      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <div className={styles.newsTitle}>Title</div>
          <div className={styles.newsAuthor}>Author</div>
          <div className={styles.newsDate}>Date</div>
          <div className={styles.newsDescription}>Description</div>
        </div>
        <div className={styles.tableContent}>
          {loading ? (
            <NewsSkeletonLoader />
          ) : error ? (
            <div className={styles.error}>{error}</div>
          ) : newsList.length > 0 ? (
            newsList.map((news) => (
              <div
                className={styles.tableRow}
                key={news.news_id}
                onClick={() => handleEditNews(news)}
              >
                <div className={styles.newsTitle}>{news.news_title}</div>
                <div className={styles.newsAuthor}>{news.news_source}</div>
                <div className={styles.newsDate}>
                  {format(new Date(news.news_pubdate), 'dd/MM/yyyy')}
                </div>
                <div className={styles.newsDescription}>
                  {news.news_description}
                </div>
              </div>
            ))
          ) : (
            <div className={styles.noNews}>No news available</div>
          )}
        </div>
      </div>
      {showModal && (
        <NewsModal
          news={selectedNews}
          onClose={handleModalClose}
          action={modalAction}
          isTechClubNews={
            selectedNews?.target_table === 'techclubnews' ||
            (!selectedNews && true)
          }
        />
      )}
    </div>
  );
};

export default NewsManagement;
