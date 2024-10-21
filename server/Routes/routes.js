import express from "express";
import { addUser, getRegisteredUsers } from "../Controllers/Users.js";

const router = express.Router();

//routes for adding and fetching event data
router.get("/:eventId", getRegisteredUsers);
router.post("/user", addUser); 

export default router;
