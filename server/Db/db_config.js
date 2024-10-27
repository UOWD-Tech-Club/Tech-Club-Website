
import pg from "pg";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';

//ES6 equivalent to __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });
const { Pool } = pg;


//if testing or developing on the local machine remove SSL, or else use the below code with SSL
// const pool = new Pool({
//   connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?sslmode=require`,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });
const pool = new Pool({
    connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
});

export default pool;

