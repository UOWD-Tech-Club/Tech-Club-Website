import PageLayout from '../layout/PageLayout';
import styles from './NewsPage.module.css';
import { format } from 'date-fns';
import { useState, useEffect } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

function NewsPage() {
  const [newsItems, setNewsItems] = useState([]);
  const [filter, setFilter] = useState('techClubNews');
  const [latestNews, setLatestNews] = useState([]); // Initialize as empty array instead of null
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const fetchNews = async () => {
    try {
      setIsLoading(true);

      const apiUrl =
        filter === 'dailyNews'
          ? 'https://tech-club-website.onrender.com/news/dailynews'
          : 'https://tech-club-website.onrender.com/news/techClubNews';

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      // Safely parse JSON or handle invalid response
      const safeParseJSON = async (res, label) => {
        const text = await res.text();
        try {
          return JSON.parse(text);
        } catch (err) {
          console.log('error:', err);
          throw new Error(
            `${label} returned invalid JSON or HTML: ${text.slice(0, 100)}`,
          );
        }
      };

      let data = { news: [] };

      if (response.ok) {
        data = await safeParseJSON(response, filter);
      } else if (response.status === 404) {
        console.warn(`${filter} returned 404 - No news found.`);
        data.news = [];
      } else {
        throw new Error(
          `${filter} request failed with status ${response.status}`,
        );
      }

      const allNews = data.news;

      if (allNews && allNews.length > 0) {
        setLatestNews(allNews[0]);
        setNewsItems(allNews.slice(1));
      } else {
        setLatestNews();
        setNewsItems([]);
      }
    } catch (error) {
      console.error('Error fetching news:', error.message);
      setLatestNews();
      setNewsItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [filter]); // Add filter as dependency

  const handleArticleClick = (article, filter) => {
    // if (filter === 'techClubNews') {
    //   navigate(`/news/${article.news_id}`, { state: { article } });
    // } else {
    //   window.open(article.news_url, '_blank');
    // }
    console.log(filter);
    if (article.news_url) {
      window.open(article.news_url, '_blank');
    }
  };

  return (
    <PageLayout>
      <div className={styles.newsContainer}>
        <div className={styles.newsHeader}>
          <h3>Filter : </h3>
          <div className={styles.filterOptions}>
            <button
              className={`${styles.filterButton} ${filter === 'techClubNews' && styles.active} `}
              onClick={() => setFilter('techClubNews')}
            >
              Tech Club
            </button>
            <button
              className={`${styles.filterButton} ${filter === 'dailyNews' && styles.active}`}
              onClick={() => setFilter('dailyNews')}
            >
              Daily News
            </button>
          </div>
        </div>
        {isLoading ? (
          <SkeletonTheme baseColor="#434343" highlightColor="#686868">
            <div className={styles.skeletonWrapper}>
              <Skeleton
                height={400}
                width={600}
                borderRadius="25px"
                inline={true}
              />
              <div className={styles.skeletonTextContainer}>
                <Skeleton count={3} height={30} />
              </div>
            </div>
          </SkeletonTheme>
        ) : latestNews ? (
          <>
            {/* Featured News Section */}
            <a
              key={latestNews.news_id}
              className={styles.featuredNews}
              onClick={() => handleArticleClick(latestNews, filter)}
            >
              <div className={styles.imageWrapper}>
                <img
                  src={latestNews.news_img}
                  alt={latestNews.news_title}
                  className={styles.featuredImage}
                />
                <div
                  className={styles.readMore}
                  onClick={() => handleArticleClick(latestNews, filter)}
                >
                  Read More
                </div>
              </div>
              <div className={styles.featuredContent}>
                <span className={styles.tag}>
                  {latestNews.news_category ||
                    (filter === 'dailyNews' && 'Daily News')}
                </span>
                <h2 className={styles.featuredTitle}>
                  {latestNews.news_title}
                </h2>
                <p className={styles.featuredExcerpt}>
                  {latestNews.news_description}
                </p>
                <div className={styles.meta}>
                  <span className={styles.date}>
                    {new Date(latestNews.news_pubdate).toLocaleDateString()}
                  </span>
                  <span className={styles.author}>
                    • by {latestNews.news_source}
                  </span>
                </div>
              </div>
            </a>

            {/* Latest News Section */}
            {newsItems.length > 0 ? (
              <>
                <h1 className={styles.sectionTitle}>Latest News</h1>
                <div className={styles.newsGrid}>
                  {newsItems.map((news) => (
                    <a
                      key={news.news_id}
                      className={styles.newsCard}
                      onClick={() => handleArticleClick(news, filter)}
                    >
                      <div className={styles.imageWrapper}>
                        <img
                          src={news.news_img}
                          alt={news.news_title}
                          className={styles.newsImage}
                        />
                        <div
                          className={styles.readMore}
                          onClick={() => handleArticleClick(news, filter)}
                        >
                          Read More
                        </div>
                      </div>
                      <div className={styles.newsContent}>
                        <span className={styles.tag}>
                          {news.news_category ||
                            (filter === 'dailyNews' && 'Daily News')}
                        </span>
                        <h3 className={styles.newsTitle}>{news.news_title}</h3>
                        <p className={styles.newsExcerpt}>
                          {news.news_description}
                        </p>
                        <div className={styles.meta}>
                          <span className={styles.date}>
                            {format(
                              new Date(news.news_pubdate),
                              'd MMMM, yyyy',
                            )}
                          </span>
                          <span className={styles.author}>
                            • by {news.news_source}
                          </span>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </>
            ) : null}
          </>
        ) : (
          <div className={styles.noNewsContainer}>
            <h2>No News Available</h2>
            <p>
              There are currently no news articles available for this category.
            </p>
          </div>
        )}
      </div>
    </PageLayout>
  );
}

export default NewsPage;
