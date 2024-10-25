import express from "express";
import { getEvents, registerUser } from "../Controllers/Events.js";
const router = express.Router();

// Route to fetch events
router.get("/events", getEvents);

// Route to register user
router.post("/register", registerUser);

export default router;
