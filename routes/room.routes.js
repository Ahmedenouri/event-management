const express = require("express");
const router = express.Router();

const {
  getAllRooms,
  createRoom,
  updateRoom,
  deleteRoom
} = require("../controllers/room.controller");

// GET /rooms
router.get("/", getAllRooms);
// POST /rooms
router.post("/", createRoom);
// PUT /rooms/:id
router.put("/:id", updateRoom);
// DELETE /rooms/:id
router.delete("/:id", deleteRoom);


module.exports = router;
