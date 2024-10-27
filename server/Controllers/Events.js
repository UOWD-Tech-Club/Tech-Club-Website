//The file will contain the server side logic and controlling for the events table
{
  /* 
Things to be included
    1. GET REQUEST to fetch events record from the DB. (DONE)
    2. POST REQUEST to add the registered users to the registration
    3. Handle empty list error, multiple server responses for incorrect request.
*/
}

import pool from "../Db/db_config.js";

export const getEvents = async (req, res) => {
  const db = await pool.connect();
  try {
    const result = await db.query(
      "SELECT * FROM events ORDER BY event_date DESC"
    );
    const events = result.rows;

    if (events.length === 0) {
      return res.status(404).json({
        message: "No events found",
      });
    }

    return res.status(200).json({
      message: "Events retrieved successfully",
      events: events,
    });
  } catch (err) {
    console.log("Error fetching events:", err.message);
    return res.status(500).json({
      message: "Internal server error",
    });
  } finally {
    db.release();
  }
};

export const searchEvents = async (req, res) => {
  const db = await pool.connect();
  try {
    const { q } = req.query; // Assuming search term is passed as a query parameter

    if (!q) {
      return res.status(400).json({
        message: "Search term is required",
      });
    }

    const result = await db.query(
      `SELECT * FROM events WHERE event_title LIKE $1 ORDER BY event_date DESC`,
      [`%${q}%`]
    );

    const events = result.rows;

    if (events.length === 0) {
      return res.status(404).json({
        message: "No events found matching the search term",
      });
    }

    return res.status(200).json({
      message: "Events retrieved successfully",
      events: events,
    });
  } catch (err) {
    console.log("Error searching for events:", err.message);
    return res.status(500).json({
      message: "Internal server error",
    });
  } finally {
    db.release();
  }
};

// Register users logic (POST request)
export const registerUser = async (req, res) => {
  const { user_studentId, event_id } = req.body;

  if (!user_studentId || !event_id) {
    return res
      .status(400)
      .json({ message: "User Student ID and Event ID are required" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO eventRegistration (user_studentId, event_id) VALUES ($1, $2) RETURNING *",
      [user_studentId, event_id]
    );
    res
      .status(201)
      .json({ message: "User registered successfully", data: result.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};
