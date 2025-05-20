import pool from "../Db/db_config.js";

const createEventSheet = async () => {
  try {
    await pool.connect();
    await pool.query(` CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

    await pool.query(
      `CREATE TABLE event_sheets (
            sheet_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            event_id UUID NOT NULL,
            google_sheet_id VARCHAR(100) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (event_id) REFERENCES events(event_id) ON DELETE CASCADE
            );
      `
    );

    console.log("Event Sheets Table Added");
  } catch (error) {
    console.log(error);
    console.error(error);
  }
};

createEventSheet(); 