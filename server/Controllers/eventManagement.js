import pool from "../Db/db_config.js";

export const createEvent = async (req, res) => {
  const { eventName, eventDescription, eventDate, eventLocation } = req.body;

  const result = await pool.query(
    "INSERT INTO events (eventName, eventDescription, eventDate, eventLocation) VALUES ($1, $2, $3, $4) RETURNING *",
    [eventName, eventDescription, eventDate, eventLocation]
  );

  res.status(201).json({
    message: "Event created successfully",
    event: result.rows[0],
  });
};

export const updateEvent = async (req, res) => {
  const { eventID } = req.params;

  const { eventName, eventDescription, eventDate, eventLocation } = req.body;

  const result = await pool.query(
    "UPDATE events SET eventName = $1, eventDescription = $2, eventDate = $3, eventLocation = $4 WHERE eventID = $5 RETURNING *",
    [eventName, eventDescription, eventDate, eventLocation, eventID]
  );

  res.status(200).json({
    message: "Event updated successfully",
    event: result.rows[0],
  });
};

export const deleteEvent = async (req, res) => {
  const { eventID } = req.params;

  await pool.query("DELETE FROM events WHERE eventID = $1", [eventID]);

  res.status(200).json({ message: "Event deleted successfully" });
};
