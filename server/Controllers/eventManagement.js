import pool from "../Db/db_config.js";
import supabase from '../utils/supabaseClient.js';

export const createEvent = async (req, res) => {
  const { event_title, event_details, event_date, event_time, event_location } = req.body;

  let event_img_link = null;
  if (req.file) {
    const file = req.file;
    const fileExt = file.originalname.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;

    const { error } = await supabase.storage
      .from('events') // your bucket name
      .upload(`images/${fileName}`, file.buffer, {
        contentType: file.mimetype,
      });

    if (error) {
      return res.status(500).json({ message: 'Image upload failed', error });
    }

    const { data: publicUrl } = supabase
      .storage
      .from('events')
      .getPublicUrl(`images/${fileName}`);

    event_img_link = publicUrl.publicUrl;
  }

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

  const { event_title, event_details, event_date, event_time, event_location } = req.body;

  let event_img_link = null;
  if (req.file) {
    const file = req.file;
    const fileExt = file.originalname.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;

    const { error } = await supabase.storage
      .from('events') // your bucket name
      .upload(`images/${fileName}`, file.buffer, {
        contentType: file.mimetype,
      });
    if (error) {
      return res.status(500).json({ message: 'Image upload failed', error });
    }

    const { data: publicUrl } = supabase
      .storage
      .from('events')
      .getPublicUrl(`images/${fileName}`);

    event_img_link = publicUrl.publicUrl;
  }


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

export const getGoogleSheetByEventId = async (req, res) => {
  const { event_id } = req.params;

  try {
    const result = await pool.query(
      'SELECT google_sheet_id FROM event_sheets WHERE event_id = $1',
      [event_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Google Sheet not found for this event' });
    }

    
    const googleSheetId = result.rows[0].google_sheet_id;
    console.log(googleSheetId)
    const sheetUrl = `https://docs.google.com/spreadsheets/d/${googleSheetId}`;

    res.json({ sheetUrl });
  } catch (error) {
    console.error('Error fetching Google Sheet:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
