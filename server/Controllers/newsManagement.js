import pool from "../Db/db_config.js";

export const createClubNews = async (req, res) => {
  const db = await pool.connect();
  try {
    const { newsTitle, author, dateTime, imageUrl, description, articleBody } =
      req.body;

    const retrievedArticle = await db.query(
      "SELECT * from techclubnews WHERE title = $1 AND author = $2",
      [newsTitle, author]
    );

    if (retrievedArticle.rows.length > 0) {
      return res.status(400).json({
        message: "News article with same title and author already existss",
      });
    }

    const newNewsArticle = await db.query(
      "INSERT INTO techclubnews (title, author, dateTime, imageUrl, description, article) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [newsTitle, author, dateTime, imageUrl, description, articleBody]
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
    const { newsTitle, author, dateTime, imageUrl, description, articleBody } =
      req.body;

    const updatedNewsArticle = await pool.query(
      "UPDATE techclubnews set title = $1, author = $2, dateTime = $3, imageUrl = $4, description = $5, article = $6 WHERE newsID = $7  RETURNING *",
      [newsTitle, author, dateTime, imageUrl, description, articleBody, newsID]
    );

    if (updatedNewsArticle.rowCount === 0) {
      return res.status(404).json({
        message: "News article doesnt exist",
      });
    }

    res.status(204);
  } catch (error) {
    console.log("Error updating news article", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteClubNews = async (req, res) => {
  try {
    const { newsID } = req.params;

    const deletedNewsArticle = await pool.query(
      "DELETE from techclubnews  WHERE newsID = $1 RETURNING *",
      [newsID]
    );

    if (deletedNewsArticle.rowCount === 0) {
      return res.status(404).json({
        message: "News article doesnt exist",
      });
    }

    res.status(204);
  } catch (error) {
    console.log("Error deleting news article", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
