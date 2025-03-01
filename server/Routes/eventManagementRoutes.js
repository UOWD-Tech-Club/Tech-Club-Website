import express from "express";
// import { addUser, getRegisteredUsers, getUser } from "../Controllers/Users.js";
import { createEvent, getAllEventsWithAttendees, updateEvent, deleteEvent } from "../Controllers/Events.js";

const router = express.Router();

//routes for adding and fetching event data


router.get("/", getAllEventsWithAttendees);
router.post("/createEvent", createEvent);
router.put("/:event_id", updateEvent);
router.delete("/:event_id", deleteEvent);


export default router;
