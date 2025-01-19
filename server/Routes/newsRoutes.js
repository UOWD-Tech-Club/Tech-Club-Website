import express from "express";
import { fetchDailyNews } from "../Controllers/dailyNews.js";

const router = express.Router();
router.get("/dailynews", fetchDailyNews);

export default router;