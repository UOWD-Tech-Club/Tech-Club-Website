

//File contains the code that is ran initially to create the Users table -- for reference (Not in production)

import pool from "../db/config_db.js";

const createUserTable = async () => {
    try {
      await pool.connect();
      await pool.query(
        `CREATE TABLE users (
              user_studentId UUID PRIMARY KEY,
              user_name VARCHAR(100) NOT NULL,
              user_studentEmail VARCHAR (100) NOT NULL,
              user_addedOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP
              );
              
      `);
  
      console.log("Users Table Added")
      
    } catch (error) {
      console.log(error);
      console.error(error);
    }
  };
  