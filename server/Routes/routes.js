import express from "express";
import {
  getEvents,
  searchEvents,
  registerUser,
} from "../Controllers/Events.js";

const router = express.Router();

router.get("/", getEvents);
router.get("/search", searchEvents);

router.post("/register", registerUser);

export default router;
