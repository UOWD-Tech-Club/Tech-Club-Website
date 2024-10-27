//File contains the code that is ran initially to create the eventRegistration table -- for reference only (Not in production)

import pool from "../Db/db_config.js";

const eventRegistration = async () => {
  try {
    await pool.connect();
    await pool.query(` CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

    await pool.query(
      `CREATE TABLE eventRegistration (
            registration_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            event_id UUID NOT NULL,
            user_studentId INT NOT NULL,
            registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (event_id) REFERENCES events(event_id) ON DELETE CASCADE,
            FOREIGN KEY (user_studentId) REFERENCES users(user_studentId) ON DELETE CASCADE
            );
            
    `
    );

    console.log("Registration Table Added");
  } catch (error) {
    console.log(error);
    console.error(error);
  }
};


eventRegistration()