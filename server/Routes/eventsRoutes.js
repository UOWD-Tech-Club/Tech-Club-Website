const express = require("express");
const { getEvents } = require("../Controllers/Events");
const router = express.Router();

// Route to fetch events
router.get("/events", getEvents);

module.exports = router;
