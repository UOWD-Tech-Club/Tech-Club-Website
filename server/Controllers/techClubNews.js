import pool from "../Db/db_config.js";
import dailyNewsInstance from "../utils/dailyNews.js";

export const fetchTechClubNews = async (req, res) => {
    const db = await pool.connect();
    try {
      // Getting tech club news
      const result = await db.query(`
          SELECT * FROM techclubnews ORDER BY news_pubdate DESC;
      `);
  
      const news = result.rows;
  
      if (news.length === 0) {
        return res.status(404).json({
          message: "No tech club news articles found",
        });
      }
  
      return res.status(200).json({
        message: "Tech Club News Fetched",
        news: news,
      });
    } catch (err) {
      console.log("Error Fetching Tech Club News ", err.message);
      return res.status(500).json({
        message: "Internal Server Error",
      });
    } finally {
      db.release();
    }
  };
  
