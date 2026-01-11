const express = require("express");
const router = express.Router();

const {
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  getParticipantsCount,
  searchEvents
} = require("../controllers/event.controller");

// GET /events
router.get("/", getAllEvents);
// POST /events
router.post("/", createEvent);
// PUT /events/:id
router.put("/:id", updateEvent);
// DELETE /events/:id
router.delete("/:id", deleteEvent);
// GET /events/:id/participants-count
router.get("/:id/participants-count", getParticipantsCount);
// GET /events/search
router.get("/search", searchEvents);




module.exports = router;
