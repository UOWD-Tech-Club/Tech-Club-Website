import express from "express";
import {
  createEvent,
  updateEvent,
  deleteEvent,
} from "../Controllers/eventManagement.js";

import multer from 'multer';
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/admin/events', upload.single('event_img'), createEvent);
router.put('/admin/events/:eventID', upload.single('event_img'), updateEvent);
router.delete("/admin/events/:eventID", deleteEvent);

export default router;

