//File contains the code that is ran initially to create the Events table -- for reference only (Not in production)

import pool from "../Db/db_config";

const createEvent = async () => {
  try {
    await pool.connect();
    await pool.query(` CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

    await pool.query(
      `CREATE TABLE events (
            event_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            event_name VARCHAR(100) NOT NULL,
            event_details VARCHAR (250) NOT NULL,
            event_date DATE,
            event_createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
            
    `);

    console.log("Events Table Added")
    
  } catch (error) {
    console.log(error);
    console.error(error);
  }
};



