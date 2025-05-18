import pool from "../Db/db_config.js";

export const createClubNews = async (req, res) => {
  const db = await pool.connect();
  try {
    const {
      newsSource,
      newsTitle,
      newsDescription,
      newsUrl,
      newsImg,
      newsPubdate,
      newsCategory,
    } = req.body;

    const retrievedArticle = await db.query(
      "SELECT * from techclubnews WHERE news_title = $1 AND news_source = $2",
      [newsTitle, newsSource]
    );

    if (retrievedArticle.rows.length > 0) {
      return res.status(400).json({
        message: "News article with same title and source already existss",
      });
    }

    const newNewsArticle = await db.query(
      "INSERT INTO techclubnews (news_source, news_title, news_description, news_url, news_img, news_pubdate, news_category) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [
        newsSource,
        newsTitle,
        newsDescription,
        newsUrl,
        newsImg,
        newsPubdate,
        newsCategory,
      ]
    );

    res.status(201).json({
      message: "News article created successfully",
      newsArticle: newNewsArticle.rows[0],
    });
  } catch (error) {
    console.log("Error creating news article", error.message);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    db.release();
  }
};

export const updateClubNews = async (req, res) => {
  try {
    const { newsID } = req.params;
    const {
      newsSource,
      newsTitle,
      newsDescription,
      newsUrl,
      newsImg,
      newsPubdate,
      newsCategory,
    } = req.body;

    const updatedNewsArticle = await pool.query(
      "UPDATE techclubnews set news_source = $1, news_title = $2, news_description = $3, news_url = $4, news_img = $5, news_pubdate = $6, news_category = $7 WHERE news_id = $8  RETURNING *",
      [
        newsSource,
        newsTitle,
        newsDescription,
        newsUrl,
        newsImg,
        newsPubdate,
        newsCategory,
        newsID,
      ]
    );

    if (updatedNewsArticle.rowCount === 0) {
      return res.status(404).json({
        message: "News article doesnt exist",
      });
    }

    res.status(204).send();
  } catch (error) {
    console.log("Error updating news article", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteClubNews = async (req, res) => {
  try {
    const { newsID } = req.params;

    const deletedNewsArticle = await pool.query(
      "DELETE from techclubnews WHERE news_id = $1 RETURNING *",
      [newsID]
    );

    if (deletedNewsArticle.rowCount === 0) {
      return res.status(404).json({
        message: "News article doesnt exist",
      });
    }

    res.status(204).send();
  } catch (error) {
    console.log("Error deleting news article", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
