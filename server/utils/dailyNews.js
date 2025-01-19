import axios from 'axios';
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

//ES6 equivalent to __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });


//fetching the api key from the env
 
const dailyNewsInstance = axios.create({
  baseURL: 'https://newsapi.org/v2',
  headers:{
    Authorization: process.env.DAILY_NEWS_KEY,
  }
});

export default dailyNewsInstance;
