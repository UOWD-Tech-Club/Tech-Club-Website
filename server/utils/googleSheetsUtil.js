import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory path for reading credentials.json
const __dirname = path.dirname(fileURLToPath(import.meta.url));


// Use a single master spreadsheet ID that will contain all event registrations
// You should create this spreadsheet manually and add its ID here
const MASTER_SPREADSHEET_ID = process.env.GOOGLE_SHEETS_ID;

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
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    
    await auth.authorize();
    return auth;
  } catch (error) {
    console.error('Error getting auth client:', error.message);
    throw error;
  }
}

// Make sure the event sheet exists within the master spreadsheet
export async function ensureEventSheetExists(eventTitle) {
  try {
    const auth = await getAuthClient();
    const sheets = google.sheets({ version: 'v4', auth });
    
    // Get all sheets in the spreadsheet
    const response = await sheets.spreadsheets.get({
      spreadsheetId: MASTER_SPREADSHEET_ID,
    });
    
    const sheetExists = response.data.sheets.some(
      sheet => sheet.properties.title === eventTitle
    );
    
    // If sheet doesn't exist, create it
    if (!sheetExists) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: MASTER_SPREADSHEET_ID,
        resource: {
          requests: [
            {
              addSheet: {
                properties: {
                  title: eventTitle,
                  gridProperties: {
                    rowCount: 1000,
                    columnCount: 5,
                  },
                },
              },
            },
          ],
        },
      });
      
      // Add headers to the new sheet
      await sheets.spreadsheets.values.update({
        spreadsheetId: MASTER_SPREADSHEET_ID,
        range: `${eventTitle}!A1:D1`,
        valueInputOption: 'RAW',
        resource: {
          values: [['Student ID', 'Name', 'Email', 'Registration Date']],
        },
      });
    }
    
    return eventTitle;
  } catch (error) {
    console.error('Error ensuring event sheet exists:', error.message);
    throw error;
  }
}

// Add a registration to the event sheet
export async function addRegistrationToSheet(eventTitle, registrationData) {
  try {
    // Make sure the sheet exists
    await ensureEventSheetExists(eventTitle);
    
    const auth = await getAuthClient();
    const sheets = google.sheets({ version: 'v4', auth });
    
    // Get current values to find next empty row
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: MASTER_SPREADSHEET_ID,
      range: `${eventTitle}!A:D`,
    });
    
    const rows = response.data.values || [];
    const nextRow = rows.length + 1;
    
    // Add the new registration
    await sheets.spreadsheets.values.update({
      spreadsheetId: MASTER_SPREADSHEET_ID,
      range: `${eventTitle}!A${nextRow}:D${nextRow}`,
      valueInputOption: 'RAW',
      resource: {
        values: [[
          registrationData.studentId,
          registrationData.name,
          registrationData.email,
          registrationData.registrationDate
        ]],
      },
    });
    
    return true;
  } catch (error) {
    console.error('Error adding registration to sheet:', error.message);
    throw error;
  }
} 