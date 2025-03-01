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
    const {q} = req.query; // Assuming search term is passed as a query parameter

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
  const { user_studentid, event_id } = req.body;

  if (!user_studentid || !event_id) {
    return res
      .status(400)
      .json({ message: "User Student ID and Event ID are required" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO eventRegistration (user_studentId, event_id) VALUES ($1, $2) RETURNING *",
      [user_studentid, event_id]
    );
    res
      .status(201)
      .json({ message: "User registered successfully", data: result.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// NEW FUNCTIONS

// 1. Create (Add) a new event
export const createEvent = async (req, res) => {
  const { event_title, event_time, event_date, event_location, event_img_link } = req.body;
  
  // Validate required fields
  if (!event_title || !event_time || !event_date || !event_location) {
    return res.status(400).json({ 
      message: "Missing required fields. Title, time, date and location are required" 
    });
  }

  const db = await pool.connect();
  try {
    const event_createdat = new Date(); // Current timestamp
    
    const result = await db.query(
      `INSERT INTO events 
      (event_title, event_time, event_date, event_location, event_createdat, event_img_link) 
      VALUES ($1, $2, $3, $4, $5, $6) 
      RETURNING *`,
      [event_title, event_time, event_date, event_location, event_createdat, event_img_link]
    );

    return res.status(201).json({
      message: "Event created successfully",
      event: result.rows[0]
    });
  } catch (err) {
    console.log("Error creating event:", err.message);
    return res.status(500).json({
      message: "Internal server error"
    });
  } finally {
    db.release();
  }
};

// 2. Read events with attendee counts
export const getAllEventsWithAttendees = async (req, res) => {
  const db = await pool.connect();
  try {
    // Query to get all events with attendee counts
    const result = await db.query(
      `SELECT e.event_id, e.event_title, e.event_location, e.event_time, e.event_date, 
      (SELECT COUNT(*) FROM eventRegistration WHERE event_id = e.event_id) AS attendees
      FROM events e
      ORDER BY e.event_date DESC`
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "No events found"
      });
    }

    return res.status(200).json({
      message: "Events retrieved successfully",
      events: result.rows
    });
  } catch (err) {
    console.log("Error fetching events with attendees:", err.message);
    return res.status(500).json({
      message: "Internal server error"
    });
  } finally {
    db.release();
  }
};

// 3. Update an existing event
export const updateEvent = async (req, res) => {
  const { event_id } = req.params;
  const { event_title, event_time, event_date, event_location, event_img_link } = req.body;
  
  if (!event_id) {
    return res.status(400).json({
      message: "Event ID is required"
    });
  }

  // Build dynamic query based on provided fields
  let updateFields = [];
  let params = [];
  let paramIndex = 1;

  if (event_title !== undefined) {
    updateFields.push(`event_title = $${paramIndex++}`);
    params.push(event_title);
  }
  
  if (event_time !== undefined) {
    updateFields.push(`event_time = $${paramIndex++}`);
    params.push(event_time);
  }
  
  if (event_date !== undefined) {
    updateFields.push(`event_date = $${paramIndex++}`);
    params.push(event_date);
  }
  
  if (event_location !== undefined) {
    updateFields.push(`event_location = $${paramIndex++}`);
    params.push(event_location);
  }
  
  if (event_img_link !== undefined) {
    updateFields.push(`event_img_link = $${paramIndex++}`);
    params.push(event_img_link);
  }

  // If no fields to update
  if (updateFields.length === 0) {
    return res.status(400).json({
      message: "No fields to update"
    });
  }

  // Add event_id as the last parameter
  params.push(event_id);

  const db = await pool.connect();
  try {
    const query = `
      UPDATE events 
      SET ${updateFields.join(', ')} 
      WHERE event_id = $${paramIndex} 
      RETURNING *
    `;

    const result = await db.query(query, params);

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    return res.status(200).json({
      message: "Event updated successfully",
      event: result.rows[0]
    });
  } catch (err) {
    console.log("Error updating event:", err.message);
    return res.status(500).json({
      message: "Internal server error"
    });
  } finally {
    db.release();
  }
};

// 4. Delete an event
export const deleteEvent = async (req, res) => {
  const { event_id } = req.params;
  
  if (!event_id) {
    return res.status(400).json({
      message: "Event ID is required"
    });
  }

  const db = await pool.connect();
  try {
    // First check if the event exists
    const checkResult = await db.query(
      "SELECT * FROM events WHERE event_id = $1",
      [event_id]
    );

    if (checkResult.rows.length === 0) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    // Delete event
    await db.query(
      "DELETE FROM events WHERE event_id = $1",
      [event_id]
    );

    return res.status(200).json({
      message: "Event deleted successfully"
    });
  } catch (err) {
    console.log("Error deleting event:", err.message);
    return res.status(500).json({
      message: "Internal server error"
    });
  } finally {
    db.release();
  }
};
