const express = require("express");
const router = express.Router();

const {
  getAllParticipants,
  createParticipant,
  updateParticipant,
  deleteParticipant,
} = require("../controllers/participant.controller");

// GET /participants
router.get("/", getAllParticipants);
// POST /participants
router.post("/", createParticipant);
// PUT /participants/:id
router.put("/:id", updateParticipant);
// DELETE /participants/:id
router.delete("/:id", deleteParticipant);


module.exports = router;
