//this file contains the code to fetch the daily news, delete old and update news

import pool from "../Db/db_config.js";
import dailyNewsInstance from "../utils/dailyNews.js";

export const refreshDailyNews = async () => {
  const db = await pool.connect();
  try {
    await db.query(`DELETE FROM dailynews;`);
    console.log("rows deleted");

    const result = db.query(`SELECT * FROM dailynews;`);

    console.log(result.rows);
    const res = await dailyNewsInstance.get("/top-headlines", {
      params: {
        category: "technology",
        language: "en",
      },
    });

    //setting the news here
    console.log(res.data.articles);
    const newDailyNews = res.data.articles;
    const insertQuery = `
    INSERT INTO dailynews (news_source, news_title ,news_description, news_url, news_img, news_pubdate)
    VALUES ($1, $2, $3, $4, $5, $6)
    `;

    //checking if the articles do not have a Null Value
    const validArticles = newDailyNews.filter((article) => {
      return article.title && article.description && article.urlToImage;
    });

    if (validArticles.length === 0) {
      console.log("No valid Articles Found.");
      return;
    }

    const newsPromise = validArticles.map((article) => {
      return pool.query(insertQuery, [
        article.source.name,
        article.title,
        article.description,
        article.url,
        article.urlToImage,
        article.publishedAt,
      ]);
    });

    await Promise.all(newsPromise);
    console.log("Daily news updated successfully!");
  } catch (error) {
    console.error("Error Updating News " + error);
  } finally {
    db.release();
  }
};

export const fetchDailyNews = async (req, res) => {
  const db = await pool.connect();
  try {
    //Getting daily news through this
    const result = await db.query(`
        SELECT * FROM dailynews ORDER BY news_pubdate;
    `);

    const news = result.rows;

    if (news.length === 0) {
      return res.status(404).json({
        message: "No news articles Found",
      });
    }

    return res.status(200).json({
      message: "Daily News Fetched",
      news: news,
    });
  } catch (err) {
    console.log("Error Fetching Daily News ", err.message);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  } finally {
    db.release();
  }
};
