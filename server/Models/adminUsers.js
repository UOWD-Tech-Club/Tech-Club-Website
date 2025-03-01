//Models/adminUsers.js
// table is already created in the database 

import pool from "../Db/db_config";

const createAdminUsersTable = async () => {
    const db = await pool.connect();
    try {
      await db.query(
        `CREATE TABLE IF NOT EXISTS admin_users (
          admin_id SERIAL PRIMARY KEY,
          email TEXT NOT NULL UNIQUE,
          password TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`
      );
  
      console.log("Admin Users Table Added");
    } catch (error) {
      console.error(error);
    } finally {
      db.release();
    }
};

createAdminUsersTable();
