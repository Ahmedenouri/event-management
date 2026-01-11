const express = require("express");
const router = express.Router();

const {
  getAllRooms,
  createRoom,
} = require("../controllers/room.controller");

// GET /rooms
router.get("/", getAllRooms);

// POST /rooms
router.post("/", createRoom);

module.exports = router;
