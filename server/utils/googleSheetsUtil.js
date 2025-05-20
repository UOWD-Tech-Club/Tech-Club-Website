import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from '../Db/db_config.js';

// Get current directory path for reading credentials.json
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Google Sheets API setup
async function getAuthClient() {
  try {
    const credentials = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, '../credentials.json'))
    );
    
    const { client_email, private_key } = credentials;
    
    const auth = new google.auth.JWT({
      email: client_email,
      key: private_key,
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.file'
      ],
    });
    
    await auth.authorize();
    return auth;
  } catch (error) {
    console.error('Error getting auth client:', error.message);
    throw error;
  }
}

// Create a new spreadsheet for an event
export async function createEventSpreadsheet(eventId, eventTitle) {
  try {
    const auth = await getAuthClient();
    const sheets = google.sheets({ version: 'v4', auth });
    const drive = google.drive({ version: 'v3', auth });
    
    // Check if a spreadsheet already exists for this event
    const existingSheet = await pool.query(
      'SELECT google_sheet_id FROM event_sheets WHERE event_id = $1',
      [eventId]
    );
    
    if (existingSheet.rows.length > 0) {
      return existingSheet.rows[0].google_sheet_id;
    }
    
    // Create a new spreadsheet
    const response = await sheets.spreadsheets.create({
      resource: {
        properties: {
          title: `${eventTitle} - Registrations`,
        },
        sheets: [
          {
            properties: {
              title: 'Registrations',
              gridProperties: {
                rowCount: 1000,
                columnCount: 6,
              },
            },
          },
        ],
      },
    });
    
    const spreadsheetId = response.data.spreadsheetId;
    
    // Share the spreadsheet with your email
    // Replace YOUR_EMAIL_HERE with your actual Google email 
    const userEmail = 'tech.uowd@gmail.com';
    
    await drive.permissions.create({
      fileId: spreadsheetId,
      requestBody: {
        role: 'writer',
        type: 'user',
        emailAddress: userEmail,
      }
    });
    
    // Add headers to the sheet
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: 'Registrations!A1:F1',
      valueInputOption: 'RAW',
      resource: {
        values: [['Registration Date', 'Student ID', 'Name', 'Email', 'Phone', 'Degree']],
      },
    });
    
    // Save the spreadsheet ID to the database
    await pool.query(
      'INSERT INTO event_sheets (event_id, google_sheet_id) VALUES ($1, $2)',
      [eventId, spreadsheetId]
    );
    
    return spreadsheetId;
  } catch (error) {
    console.error('Error creating event spreadsheet:', error.message);
    throw error;
  }
}

// Get the spreadsheet ID for an event
export async function getEventSpreadsheetId(eventId, eventTitle) {
  try {
    // Check if a spreadsheet already exists for this event
    const existingSheet = await pool.query(
      'SELECT google_sheet_id FROM event_sheets WHERE event_id = $1',
      [eventId]
    );
    if (existingSheet.rows.length > 0) {
      return existingSheet.rows[0].google_sheet_id;
    }
    // If not, create a new spreadsheet
    return await createEventSpreadsheet(eventId, eventTitle);
  } catch (error) {
    console.error('Error getting event spreadsheet ID:', error.message);
    throw error;
  }
}

// Add a registration to the event's spreadsheet
export async function addRegistrationToSheet(eventId, eventTitle, registrationData) {
  try {
    // Get or create the spreadsheet for this event
    const spreadsheetId = await getEventSpreadsheetId(eventId, eventTitle);
    
    const auth = await getAuthClient();
    const sheets = google.sheets({ version: 'v4', auth });
    
    // Get current values to find next empty row
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Registrations!A:F',
    });
    
    const rows = response.data.values || [];
    const nextRow = rows.length + 1;
    
    // Add the new registration
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `Registrations!A${nextRow}:F${nextRow}`,
      valueInputOption: 'RAW',
      resource: {
        values: [[
          registrationData.registrationDate,
          registrationData.studentId,
          registrationData.name,
          registrationData.email,
          registrationData.phone,
          registrationData.degree
        ]],
      },
    });
    
    return true;
  } catch (error) {
    console.error('Error adding registration to sheet:', error.message);
    throw error;
  }
} 