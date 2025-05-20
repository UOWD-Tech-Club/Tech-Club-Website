import express from "express";
import {
  createClubNews,
  updateClubNews,
  deleteClubNews,
} from "../Controllers/newsManagement.js";
import multer from 'multer';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/admin/news", upload.single('newsImage'), createClubNews);
router.put("/admin/news/:newsID", upload.single('newsImage'), updateClubNews);
router.delete("/admin/news/:newsID", deleteClubNews);

export default router;

