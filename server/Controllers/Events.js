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

// Fetch events logic
async function getEvents(req, res) {
  try {
    const events = await pool.query(
      "SELECT * FROM events ORDER BY event_date DESC"
    );
    if (events.rows.length === 0) {
      return res.status(404).json({ message: "No events found" });
    }
    res.status(200).json(events.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
}

// Register users logic (POST request)
async function registerUser(req, res) {
  const { user_id, event_id } = req.body;
  
  if (!user_id || !event_id) {
    return res.status(400).json({ message: "User ID and Event ID are required" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO registrations (user_id, event_id) VALUES ($1, $2)",
      [user_id, event_id]
    );
    res.status(201).json({ message: "User registered successfully", data: result.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
}

export { getEvents, registerUser };
