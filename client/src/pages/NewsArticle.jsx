import { format } from 'date-fns';
import styles from './NewsArticle.module.css';
import newsletterBg from '../assets/newsletter-bg.png';
import PageLayout from '../layout/PageLayout';

function NewsArticle() {
  // Sample article data - replace with actual data
  const article = {
    title: 'A Very Interesting Title For Some Very Interesting News',
    author: 'Jeff',
    date: new Date(),
    image: newsletterBg,
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean purus tortor, auctor in tempus nec, congue in odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec ullamcorper tellus. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    
    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean purus tortor, auctor in tempus nec, congue in odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec ullamcorper tellus. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    
    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean purus tortor, auctor in tempus nec, congue in odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec ullamcorper tellus. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    
    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`,
  };

  return (
    <PageLayout>
      <div className={styles.articleContainer}>
        <div className={styles.heroImage}>
          <img src={article.image} alt={article.title} />
          <div className={styles.gradient}></div>
        </div>

        <div className={styles.content}>
          <h1>{article.title}</h1>

          <div className={styles.meta}>
            <span className={styles.date}>
              {format(article.date, 'd MMMM, yyyy')}
            </span>
            <span className={styles.author}>• by {article.author}</span>
          </div>

          <div className={styles.articleText}>
            {article.content.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default NewsArticle;
