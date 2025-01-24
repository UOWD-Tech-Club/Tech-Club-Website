import PageLayout from '../layout/PageLayout';
import styles from './NewsPage.module.css';
import newsletterBg from '../assets/newsletter-bg.png';
import { format } from 'date-fns';

function NewsPage() {
  // replace with backend data
  const newsItems = [...Array(6)].map((_, i) => ({
    id: i + 1,
    title: `A Very Interesting Title For Some Very Interesting News ${i + 1}`,
    category: 'Tech Club',
    author: 'Jeff',
    date: new Date(),
    image: newsletterBg,
    excerpt:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean purus tortor, auctor in tempus nec, congue in odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec ullamcorper tellus. ',
  }));

  const latestNews = {
    id: 0,
    title: 'Headline of the Latest News',
    category: 'Tech Club',
    author: 'Jeff',
    date: new Date(),
    image: newsletterBg,
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean purus tortor, auctor in tempus nec, congue in odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec ullamcorper tellus. ',
  };

  return (
    <PageLayout>
      <div className={styles.newsContainer}>
        <div className={styles.newsHeader}>
          <h3>Filter : </h3>
          <div className={styles.filterOptions}>
            <button className={styles.filterButton}>Tech Club</button>
            <button className={styles.filterButton}>Daily News</button>
          </div>
        </div>

        <div className={styles.featuredNews}>
          <div className={styles.imageWrapper}>
            <img
              src={latestNews.image}
              alt={latestNews.title}
              className={styles.featuredImage}
            />
          </div>
          <div className={styles.featuredContent}>
            <span className={styles.tag}>{latestNews.category}</span>
            <h2 className={styles.featuredTitle}>{latestNews.title}</h2>
            <p className={styles.featuredExcerpt}>{latestNews.content}</p>
            <div className={styles.meta}>
              <span className={styles.date}>
                {format(latestNews.date, 'd MMMM, yyyy')}
              </span>
              <span className={styles.author}>• by {latestNews.author}</span>
            </div>
          </div>
        </div>

        <h1 className={styles.sectionTitle}>Latest News</h1>

        <div className={styles.newsGrid}>
          {newsItems.map((news) => (
            <article key={news.id} className={styles.newsCard}>
              <div className={styles.imageWrapper}>
                <img
                  src={news.image}
                  alt={news.title}
                  className={styles.newsImage}
                />
                <span className={styles.readMore}>Read More</span>
              </div>
              <div className={styles.newsContent}>
                <span className={styles.tag}>{news.category}</span>
                <h3 className={styles.newsTitle}>{news.title}</h3>
                <p className={styles.newsExcerpt}>{news.excerpt}</p>
                <div className={styles.meta}>
                  <span className={styles.date}>
                    {format(news.date, 'd MMMM, yyyy')}
                  </span>
                  <span className={styles.author}>• by {news.author}</span>
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
