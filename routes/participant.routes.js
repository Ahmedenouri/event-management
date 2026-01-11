const express = require("express");
const router = express.Router();

const {
  getAllParticipants,
  createParticipant,
  updateParticipant,
  deleteParticipant,
} = require("../controllers/participant.controller");
const validateRequest = require("../middleware/validateRequest");

// GET /participants
router.get("/", getAllParticipants);
// POST /participants
router.post("/", createParticipant);
// PUT /participants/:id
router.put("/:id", updateParticipant);
// DELETE /participants/:id
router.delete("/:id", deleteParticipant);

// POST /participants
router.post("/", validateRequest(["name", "email"]), createParticipant);


module.exports = router;
