const Room = require("../models/Room");

// GET /rooms
const getAllRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find().populate("events");
    res.json(rooms);
  } catch (err) {
    next(err);
  }
};

// POST /rooms
const createRoom = async (req, res, next) => {
  try {
    const room = new Room(req.body);
    const savedRoom = await room.save();
    res.status(201).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllRooms,
  createRoom,
};
