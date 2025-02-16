import express from "express";
import { fetchDailyNews } from "../Controllers/dailyNews.js";
import { fetchTechClubNews } from "../Controllers/techClubNews.js";

const router = express.Router();
router.get("/dailynews", fetchDailyNews);
router.get("/techClubNews", fetchTechClubNews)

export default router;