import express from "express";
import {
  createEvent,
  updateEvent,
  deleteEvent,
} from "../Controllers/eventManagement.js";

const router = express.Router();

router.post("/admin/events", createEvent);
router.put("/admin/events/:eventID", updateEvent);
router.delete("/admin/events/:eventID", deleteEvent);

export default router;

