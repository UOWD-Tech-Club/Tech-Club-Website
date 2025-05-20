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
import { addRegistrationToSheet } from "../utils/googleSheetsUtil.js";

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
  const db = await pool.connect();

  if (!user_studentid || !event_id) {
    return res
      .status(400)
      .json({ message: "User Student ID and Event ID are required" });
  }

  try {
    // 1. Insert into eventRegistration
    const registrationResult = await db.query(
      "INSERT INTO eventRegistration (user_studentId, event_id) VALUES ($1, $2) RETURNING *",
      [user_studentid, event_id]
    );

    // 2. Get event details
    const eventResult = await db.query(
      "SELECT event_title FROM events WHERE event_id = $1",
      [event_id]
    );

    // 3. Get user details
    const userResult = await db.query(
      "SELECT user_name, user_studentEmail, user_phone, user_degree FROM users WHERE user_studentId = $1",
      [user_studentid]
    );

    const eventTitle = eventResult.rows[0].event_title;
    const userName = userResult.rows[0].user_name;
    const userEmail = userResult.rows[0].user_studentemail;
    const userPhone = userResult.rows[0].user_phone;
    const userDegree = userResult.rows[0].user_degree;
    const registrationDate = registrationResult.rows[0].registration_date;
    
    // Format date to DD-MM-YYYY
    const formattedDate = new Date(registrationDate).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    
    // 4. Export to Google Sheets
    try {
      await addRegistrationToSheet(event_id, eventTitle, {
        studentId: user_studentid,
        name: userName,
        email: userEmail,
        phone: userPhone,
        degree: userDegree,
        registrationDate: formattedDate
      });
    } catch (sheetError) {
      console.error("Error exporting to Google Sheets:", sheetError.message);
      // Continue with the registration even if Google Sheets export fails
    }

    res.status(201).json({ 
      message: "User registered successfully",
      data: registrationResult.rows[0]
    });
  } catch (err) {
    console.error("Error registering user:", err.message);
    res.status(500).json({ message: "Server error" });
  } finally {
    db.release();
  }
};

// Export all registrations for a specific event to Google Sheets
// For Admin
export const exportEventRegistrationsToSheet = async (req, res) => {
  const { event_id } = req.params;
  const db = await pool.connect();
  
  if (!event_id) {
    return res.status(400).json({ message: "Event ID is required" });
  }
  
  try {
    // 1. Get event details
    const eventResult = await db.query(
      "SELECT event_title FROM events WHERE event_id = $1",
      [event_id]
    );
    
    if (eventResult.rows.length === 0) {
      return res.status(404).json({ message: "Event not found" });
    }
    
    const eventTitle = eventResult.rows[0].event_title;
    
    // 2. Get all registrations for this event with user details
    const registrationsResult = await db.query(
      `SELECT er.registration_id, er.user_studentId, er.registration_date, 
              u.user_name, u.user_studentEmail, u.user_phone, u.user_degree
       FROM eventRegistration er
       JOIN users u ON er.user_studentId = u.user_studentId
       WHERE er.event_id = $1
       ORDER BY er.registration_date ASC`,
      [event_id]
    );
    
    const registrations = registrationsResult.rows;
    
    if (registrations.length === 0) {
      return res.status(404).json({ message: "No registrations found for this event" });
    }
    
    // 3. Add all registrations to the Google Sheet
    let successCount = 0;
    
    for (const registration of registrations) {
      try {
        // Format date to DD-MM-YYYY
        const formattedDate = new Date(registration.registration_date).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });
        
        await addRegistrationToSheet(event_id, eventTitle, {
          studentId: registration.user_studentid,
          name: registration.user_name,
          email: registration.user_studentemail,
          phone: registration.user_phone,
          degree: registration.user_degree,
          registrationDate: formattedDate
        });
        successCount++;
      } catch (error) {
        console.error(`Error adding registration ${registration.registration_id} to sheet:`, error.message);
      }
    }
    
    res.status(200).json({ 
      message: `Successfully exported ${successCount} out of ${registrations.length} registrations to Google Sheets`
    });
  } catch (err) {
    console.error("Error exporting registrations:", err.message);
    res.status(500).json({ message: "Server error" });
  } finally {
    db.release();
  }
};
