const express = require("express");
const router = express.Router();

const {
  getAllSpeakers,
  createSpeaker,
} = require("../controllers/speaker.controller");

// GET /speakers
router.get("/", getAllSpeakers);

// POST /speakers
router.post("/", createSpeaker);

module.exports = router;
