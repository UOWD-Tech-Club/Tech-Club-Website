import express from "express";
import {
  createClubNews,
  updateClubNews,
  deleteClubNews,
} from "../Controllers/newsManagement";

const router = express.Router();

router.post("/admin/news", createClubNews);
router.put("/admin/news/:newsID", updateClubNews);
router.delete("/admin/news/:newsID", deleteClubNews);

export default router;

