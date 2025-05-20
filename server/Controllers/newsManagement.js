import pool from "../Db/db_config.js";
import supabase from '../utils/supabaseClient.js';


function getTableName(targetTable) {
  if (targetTable === 'dailynews') return 'dailynews';
  return 'techclubnews';
}

export const createClubNews = async (req, res) => {
  const db = await pool.connect();
  try {
    const {
      newsSource,
      newsTitle,
      newsDescription,
      newsUrl,
      newsPubdate,
      newsCategory,
      targetTable,
    } = req.body;
    const table = getTableName(targetTable);

    let newsImg = null;
    if (req.file) {
      const file = req.file;
      const fileExt = file.originalname.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;

      const { error } = await supabase.storage
        .from('news') // your bucket name
        .upload(`images/${fileName}`, file.buffer, {
          contentType: file.mimetype,
        });

      if (error) {
        return res.status(500).json({ message: 'Image upload failed', error });
      }

      const { data: publicUrl } = supabase
        .storage
        .from('news')
        .getPublicUrl(`images/${fileName}`);

        newsImg = publicUrl.publicUrl;
    }

    const retrievedArticle = await db.query(
      `SELECT * from ${table} WHERE news_title = $1 AND news_source = $2`,
      [newsTitle, newsSource]
    );

    if (retrievedArticle.rows.length > 0) {
      return res.status(400).json({
        message: "News article with same title and source already existss",
      });
    }

    let newNewsArticle;
    if (table === 'techclubnews') {
      newNewsArticle = await db.query(
        `INSERT INTO techclubnews (news_source, news_title, news_description, news_url, news_img, news_pubdate, news_category) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
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
    } else {
      newNewsArticle = await db.query(
        `INSERT INTO dailynews (news_source, news_title, news_description, news_url, news_img, news_pubdate) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [
          newsSource,
          newsTitle,
          newsDescription,
          newsUrl,
          newsImg,
          newsPubdate,
        ]
      );
    }

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
      newsPubdate,
      newsCategory,
      targetTable,
    } = req.body;
    const table = getTableName(targetTable);

    let newsImg = null;
    if (req.file) {
      const file = req.file;
      const fileExt = file.originalname.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;

      const { error } = await supabase.storage
        .from('news') // your bucket name
        .upload(`images/${fileName}`, file.buffer, {
          contentType: file.mimetype,
        });

      if (error) {
        return res.status(500).json({ message: 'Image upload failed', error });
      }

      const { data: publicUrl } = supabase
        .storage
        .from('news')
        .getPublicUrl(`images/${fileName}`);

        newsImg = publicUrl.publicUrl;
    }

    let updatedNewsArticle;
    if (table === 'techclubnews') {
      updatedNewsArticle = await pool.query(
        `UPDATE techclubnews set news_source = $1, news_title = $2, news_description = $3, news_url = $4, news_img = $5, news_pubdate = $6, news_category = $7 WHERE news_id = $8  RETURNING *`,
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
    } else {
      updatedNewsArticle = await pool.query(
        `UPDATE dailynews set news_source = $1, news_title = $2, news_description = $3, news_url = $4, news_img = $5, news_pubdate = $6 WHERE news_id = $7  RETURNING *`,
        [
          newsSource,
          newsTitle,
          newsDescription,
          newsUrl,
          newsImg,
          newsPubdate,
          newsID,
        ]
      );
    }

    if (updatedNewsArticle.rowCount === 0) {
      return res.status(404).json({
        message: "News article doesnt exist",
      });
    }

    res.status(200).json({ message: "News article updated successfully" });
  } catch (error) {
    console.log("Error updating news article", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteClubNews = async (req, res) => {
  try {
    const { newsID } = req.params;
    const { targetTable } = req.body;
    const table = getTableName(targetTable);

    const deletedNewsArticle = await pool.query(
      `DELETE from ${table} WHERE news_id = $1 RETURNING *`,
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
