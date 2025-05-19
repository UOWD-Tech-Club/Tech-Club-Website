import pool from "../Db/db_config.js";

export const createEvent = async (req, res) => {
  const { event_title, event_details, event_date, event_time, event_location, event_img_link } = req.body;

  const result = await pool.query(
    "INSERT INTO events (event_title, event_details, event_date, event_time, event_location, event_img_link) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [event_title, event_details, event_date, event_time, event_location, event_img_link]
  );

  res.status(201).json({
    message: "Event created successfully",
    event: result.rows[0],
  });
};

export const updateEvent = async (req, res) => {
  const { eventID } = req.params;

  const { event_title, event_details, event_date, event_time, event_location, event_img_link } = req.body;

  const result = await pool.query(
    "UPDATE events SET event_title = $1, event_details = $2, event_date = $3, event_time = $4, event_location = $5, event_img_link = $6 WHERE event_id = $7 RETURNING *",
    [event_title, event_details, event_date, event_time, event_location, event_img_link, eventID]
  );

  res.status(200).json({
    message: "Event updated successfully",
    event: result.rows[0],
  });
};

export const deleteEvent = async (req, res) => {
  const { eventID } = req.params;

  await pool.query("DELETE FROM events WHERE event_id = $1", [eventID]);

  res.status(200).json({ message: "Event deleted successfully" });
};
