import pg from "pg";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

//ES6 equivalent to __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });
const { Pool } = pg;


const pool = new Pool({
  connectionString: `postgresql://webDb_owner:U2aJIxM9VzGW@ep-bitter-rice-a2b531cf.eu-central-1.aws.neon.tech/webDb?sslmode=require`,
  ssl: {
    rejectUnauthorized: false,
  },
});


export default pool;
