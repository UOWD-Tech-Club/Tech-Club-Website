import express from "express";
import { addUser, getRegisteredUsers } from "../Controllers/Users.js";
import {
  getEvents,
  searchEvents,
  registerUser,
} from "../Controllers/Events.js";

const router = express.Router();

//routes for adding and fetching event data
router.get("users/:eventId", getRegisteredUsers);
router.post("/user", addUser);

router.get("/", getEvents);
router.get("/search", searchEvents);

router.post("/register", registerUser);

export default router;
