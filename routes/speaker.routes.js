const express = require("express");
const router = express.Router();

const {
  getAllSpeakers,
  createSpeaker,
  updateSpeaker,
  deleteSpeaker
} = require("../controllers/speaker.controller");

// GET /speakers
router.get("/", getAllSpeakers);
// POST /speakers
router.post("/", createSpeaker);
// PUT /speakers/:id
router.put("/:id", updateSpeaker);
// DELETE /speakers/:id
router.delete("/:id", deleteSpeaker);


module.exports = router;
