//The file will contain the server side logic and controlling for the events table
{
  /* 
Things to be included
    1. GET REQUEST to fetch events record from the DB. (DONE)
    2. POST REQUEST to add the registered users to the registration
    3. Handle empty list error, multiple server responses for incorrect request.
*/
}

import pool from "../Db/db_config";

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

module.exports = {
  getEvents,
};
