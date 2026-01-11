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

// PUT /rooms/:id
const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedRoom) return res.status(404).json({ message: "Salle non trouvée" });
    res.json(updatedRoom);
  } catch (err) {
    next(err);
  }
};

// DELETE /rooms/:id
const deleteRoom = async (req, res, next) => {
  try {
    const deletedRoom = await Room.findByIdAndDelete(req.params.id);
    if (!deletedRoom) return res.status(404).json({ message: "Salle non trouvée" });
    res.json({ message: "Salle supprimée avec succès" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllRooms,
  createRoom,
  updateRoom,
  deleteRoom,
};
